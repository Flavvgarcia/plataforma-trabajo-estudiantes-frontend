"use client";

import { useEffect, type RefObject } from "react";

type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export const AUTH_INPUT_CLASS =
  "h-[48px] w-full rounded-[10px] border border-[#6B6A8A] bg-white px-[14px] text-[15px] leading-[1.4] text-[#12122B] placeholder:text-[#6B6A8A] transition-[border-color,box-shadow,background-color] duration-150 focus-visible:border-[#3730A3] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#3730A3]/20 user-invalid:border-[#B42318] user-invalid:bg-[#FEF3F2] user-invalid:focus-visible:border-[#B42318] user-invalid:focus-visible:ring-[#B42318]/20 [&.user-invalid-fallback]:border-[#B42318] [&.user-invalid-fallback]:bg-[#FEF3F2] user-valid:border-[#15803D] [&.user-valid-fallback]:border-[#15803D]";

export const AUTH_ERROR_CLASS =
  "mt-1.5 hidden items-start gap-1.5 text-[13px] leading-[1.35] text-[#B42318] group-has-[input:user-invalid]:flex group-has-[input.user-invalid-fallback]:flex";

function spokenText(node: HTMLElement): string {
  const copy = node.cloneNode(true) as HTMLElement;
  copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
  copy.querySelectorAll('[role="img"][aria-label]').forEach((n) => {
    n.replaceWith(`${n.getAttribute("aria-label")}: `);
  });
  return (copy.textContent ?? "").replace(/\s+/g, " ").trim();
}

function linkError(el: FormControl, shown: boolean): void {
  const errorId = el.dataset.error;
  if (!errorId) return;
  const ids = (el.getAttribute("aria-describedby") ?? "")
    .split(/\s+/)
    .filter((id) => id && id !== errorId);
  if (shown) ids.push(errorId);
  if (ids.length > 0) {
    el.setAttribute("aria-describedby", ids.join(" "));
  } else {
    el.removeAttribute("aria-describedby");
  }
}

/**
 * Synchronizes programmatic ARIA error states (aria-invalid, aria-describedby,
 * and a single polite live region) with native CSS :user-invalid, plus a WeakMap
 * fallback for browsers that lack :user-invalid support.
 */
export function useAccessibleValidation(
  formRef: RefObject<HTMLFormElement | null>,
  announcerRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const supportsUserInvalid =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("selector(:user-invalid)");

    const flagged = new WeakSet<FormControl>();
    const announced = new WeakSet<FormControl>();
    const dirtyState = new WeakMap<
      FormControl,
      { hasInteracted: boolean; hasBlurred: boolean }
    >();

    let announceTimer: ReturnType<typeof setTimeout> | undefined;
    let announcedField: FormControl | undefined;

    const announceError = (el: FormControl) => {
      const announcer = announcerRef.current;
      const errorId = el.dataset.error;
      if (!announcer || !errorId) return;
      const errorEl = document.getElementById(errorId);
      if (!errorEl) return;

      const labelText = el.labels?.[0]
        ? `${spokenText(el.labels[0])}: `
        : "";
      clearTimeout(announceTimer);
      announcer.textContent = "";
      announcedField = el;
      announceTimer = setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = labelText + spokenText(errorEl);
        }
      }, 500);
    };

    const applyAriaState = (
      el: FormControl,
      invalid: boolean,
      announce: boolean,
    ) => {
      if (invalid) {
        if (announce && !announced.has(el)) {
          announceError(el);
          announced.add(el);
        }
        el.setAttribute("aria-invalid", "true");
        linkError(el, true);
        flagged.add(el);
      } else if (flagged.has(el) || el.getAttribute("aria-invalid") !== "true") {
        el.setAttribute("aria-invalid", "false");
        linkError(el, false);
        flagged.delete(el);
        announced.delete(el);
        if (announcedField === el) {
          clearTimeout(announceTimer);
          if (announcerRef.current) {
            announcerRef.current.textContent = "";
          }
        }
      }
    };

    const syncNative = (target: EventTarget | null, announce = false) => {
      if (!(target instanceof HTMLElement)) return;
      if (!target.matches("input, select, textarea")) return;
      const el = target as FormControl;
      applyAriaState(el, el.matches(":user-invalid"), announce);
    };

    const syncFallback = (el: FormControl, announce: boolean) => {
      const isValid = el.validity.valid;
      el.classList.toggle("user-invalid-fallback", !isValid);
      el.classList.toggle("user-valid-fallback", isValid);
      applyAriaState(el, !isValid, announce);
    };

    // Start every field explicitly at aria-invalid="false" so Firefox/Safari
    // do not announce empty required inputs as invalid on initial page load.
    form
      .querySelectorAll<FormControl>("input, select, textarea")
      .forEach((el) => {
        el.setAttribute("aria-invalid", "false");
        linkError(el, false);
      });

    const onBlur = (e: FocusEvent) => {
      if (supportsUserInvalid) {
        syncNative(e.target, true);
        return;
      }
      const el = e.target;
      if (
        !(
          el instanceof HTMLInputElement ||
          el instanceof HTMLSelectElement ||
          el instanceof HTMLTextAreaElement
        )
      ) {
        return;
      }
      const state = dirtyState.get(el) ?? {
        hasInteracted: false,
        hasBlurred: false,
      };
      state.hasBlurred = true;
      dirtyState.set(el, state);
      if (state.hasInteracted) {
        syncFallback(el, true);
      }
    };

    const onInput = (e: Event) => {
      if (supportsUserInvalid) {
        if (
          e.target instanceof HTMLElement &&
          e.target.hasAttribute("aria-invalid")
        ) {
          syncNative(e.target, false);
        }
        return;
      }
      const el = e.target;
      if (
        !(
          el instanceof HTMLInputElement ||
          el instanceof HTMLSelectElement ||
          el instanceof HTMLTextAreaElement
        )
      ) {
        return;
      }
      const state = dirtyState.get(el) ?? {
        hasInteracted: false,
        hasBlurred: false,
      };
      state.hasInteracted = true;
      dirtyState.set(el, state);
      if (state.hasBlurred) {
        syncFallback(el, false);
      }
    };

    const onChange = (e: Event) => {
      if (supportsUserInvalid) {
        syncNative(e.target, true);
      } else {
        onInput(e);
      }
    };

    const onInvalid = (e: Event) => {
      const el = e.target;
      if (
        !(
          el instanceof HTMLInputElement ||
          el instanceof HTMLSelectElement ||
          el instanceof HTMLTextAreaElement
        )
      ) {
        return;
      }
      announced.add(el);
      if (supportsUserInvalid) {
        syncNative(el, false);
      } else {
        dirtyState.set(el, { hasInteracted: true, hasBlurred: true });
        syncFallback(el, false);
      }
    };

    const onReset = () => {
      setTimeout(() => {
        form
          .querySelectorAll<FormControl>("input, select, textarea")
          .forEach((el) => {
            dirtyState.delete(el);
            el.classList.remove("user-invalid-fallback", "user-valid-fallback");
            applyAriaState(el, false, false);
          });
      });
    };

    form.addEventListener("blur", onBlur, true);
    form.addEventListener("input", onInput);
    form.addEventListener("change", onChange, true);
    form.addEventListener("invalid", onInvalid, true);
    form.addEventListener("reset", onReset, true);

    return () => {
      clearTimeout(announceTimer);
      form.removeEventListener("blur", onBlur, true);
      form.removeEventListener("input", onInput);
      form.removeEventListener("change", onChange, true);
      form.removeEventListener("invalid", onInvalid, true);
      form.removeEventListener("reset", onReset, true);
    };
  }, [formRef, announcerRef]);
}
