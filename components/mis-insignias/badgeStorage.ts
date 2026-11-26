"use client";

import { useSyncExternalStore } from "react";

const changeEvent = "talented:profile-badge";

function getKey(id: string) {
  return `talented:profile-badge:${id}`;
}

function subscribe(onChange: () => void) {
  window.addEventListener(changeEvent, onChange);
  window.addEventListener("storage", onChange);

  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getServerSnapshot() {
  return false;
}

export function useProfileBadge(id: string) {
  return useSyncExternalStore(
    subscribe,
    () => {
      try {
        return window.localStorage.getItem(getKey(id)) === "1";
      } catch {
        return false;
      }
    },
    getServerSnapshot,
  );
}

export function addProfileBadge(id: string) {
  window.localStorage.setItem(getKey(id), "1");
  window.dispatchEvent(new Event(changeEvent));
}
