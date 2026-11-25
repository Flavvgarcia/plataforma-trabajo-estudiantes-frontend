"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AiAnalysisCard } from "./AiAnalysisCard";
import { AiNoticeBanner } from "./AiNoticeBanner";
import {
  fetchStudentProfile,
  reportAiExtractionError,
  saveStudentProfile,
  uploadStudentCv,
} from "./api";
import { CvDropzone } from "./CvDropzone";
import { ArrowLeftIcon } from "./icons";
import { PrivacySettingsCard } from "./PrivacySettingsCard";
import { ProfileDataCards } from "./ProfileDataCards";
import { Sidebar } from "./Sidebar";
import { INITIAL_PROFILE, PrivacyFieldKey, StudentProfile } from "./types";

export function MiPerfilView() {
  const [profile, setProfile] = useState<StudentProfile>(INITIAL_PROFILE);
  const [analysisProgress, setAnalysisProgress] = useState<number>(65);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchStudentProfile().then((loaded) => {
      if (active) {
        setProfile(loaded);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const updateProfile = (updater: (prev: StudentProfile) => StudentProfile) => {
    setProfile(updater);
    setIsDirty(true);
    setSaveMessage(null);
  };

  const handleCvSelected = async (file: File) => {
    setIsUploading(true);
    setSaveMessage(null);
    setAnalysisProgress(15);

    // Animación escalonada fluida para feedback visual realista
    await new Promise((resolve) => setTimeout(resolve, 300));
    setAnalysisProgress(45);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setAnalysisProgress(75);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setAnalysisProgress(90);

    const result = await uploadStudentCv(file);
    await new Promise((resolve) => setTimeout(resolve, 300));

    setAnalysisProgress(100);
    setIsUploading(false);
    setProfile((prev) => ({
      ...prev,
      ...result.extracted,
      education: { ...prev.education, ...result.extracted?.education },
      experience: { ...prev.experience, ...result.extracted?.experience },
      cvFileName: result.fileName,
    }));
    setIsDirty(true);
  };

  const handleRemoveCv = () => {
    setProfile((prev) => ({
      ...prev,
      cvFileName: undefined,
    }));
    setAnalysisProgress(65);
    setIsDirty(true);
    setSaveMessage(null);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setSaveMessage(null);
    const result = await saveStudentProfile(profile);
    setIsSaving(false);
    setIsDirty(false);
    setSaveMessage(
      result.synced
        ? "Perfil guardado correctamente."
        : "Cambios guardados localmente (sin conexión con el servidor)."
    );
  };

  const handleTogglePrivacy = (key: PrivacyFieldKey) => {
    updateProfile((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key],
      },
    }));
  };

  return (
    <div className="min-h-screen bg-[#F7F6FC] text-[#12122B] lg:flex">
      <Sidebar
        initials={profile.initials}
        fullName={profile.fullName}
        role={profile.role}
      />

      <main className="flex-1 min-w-0">
        <div className="mx-auto max-w-[1040px] px-4 py-4 lg:px-7 lg:py-6">
          {/* Mobile Header (< lg) */}
          <header className="lg:hidden mb-3.5">
            <div className="flex items-center gap-3 min-h-[44px]">
              <Link
                href="/vacantes"
                aria-label="Volver a vacantes"
                className="inline-flex items-center justify-center h-10 w-10 -ml-2 rounded-xl text-[#12122B] hover:bg-[#EEEDFC]"
              >
                <ArrowLeftIcon />
              </Link>
              <h1
                className="text-[18px] font-bold text-[#12122B]"
                style={{
                  fontFamily: "var(--font-talented-grotesk), sans-serif",
                }}
              >
                Tu perfil
              </h1>
            </div>

            <div className="mt-2 bg-white border border-[#E4E3F1] rounded-2xl px-3.5 py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="rounded-full bg-[#EEEDFC] px-2.5 py-1 text-[12px] font-bold text-[#2E2785] whitespace-nowrap">
                  Paso 2 de 9
                </span>
                <span className="text-[13px] text-[#4A4A68] truncate">
                  Perfil y CV
                </span>
              </div>
              <div className="w-[72px] h-2 rounded-full bg-[#EEEDFC] overflow-hidden shrink-0">
                <div
                  className="h-full bg-[#3730A3] rounded-full"
                  style={{ width: "22%" }}
                />
              </div>
            </div>
          </header>

          {/* Desktop Header (>= lg) */}
          <header className="hidden lg:flex items-center justify-between gap-4 mb-5">
            <h1
              className="text-[28px] font-bold text-[#12122B]"
              style={{ fontFamily: "var(--font-talented-grotesk), sans-serif" }}
            >
              Perfil y CV
            </h1>

            <div className="flex items-center gap-3">
              {saveMessage ? (
                <span
                  role="status"
                  className="text-[13px] font-medium text-[#15803D]"
                >
                  {saveMessage}
                </span>
              ) : null}
              {isDirty ? (
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleSaveProfile}
                  className="min-h-[44px] px-5 rounded-xl bg-[#3730A3] text-white text-[14px] font-bold hover:bg-[#2E2785] disabled:opacity-60 transition-colors cursor-pointer"
                >
                  {isSaving ? "Guardando…" : "Guardar cambios"}
                </button>
              ) : null}
            </div>
          </header>

          {/* Main Responsive Grid */}
          <div className="flex flex-col gap-3.5 lg:grid lg:grid-cols-2 lg:gap-x-5 lg:gap-y-4 lg:items-start">
            <div className="lg:col-start-1 lg:row-start-1">
              <CvDropzone
                onFileSelected={handleCvSelected}
                selectedFileName={profile.cvFileName}
                isUploading={isUploading}
                onRemoveFile={handleRemoveCv}
              />
            </div>

            <div className="lg:col-start-1 lg:row-start-2">
              <AiAnalysisCard
                progress={analysisProgress}
                fileName={profile.cvFileName}
              />
            </div>

            <div className="lg:col-start-1 lg:row-start-3">
              <AiNoticeBanner
                onReportError={async (details) => {
                  await reportAiExtractionError(details);
                }}
              />
            </div>

            <div className="lg:col-start-2 lg:row-start-1 lg:row-span-4">
              <h2
                className="lg:hidden text-[18.72px] font-bold text-[#12122B] mb-2.5 mt-1"
                style={{
                  fontFamily: "var(--font-talented-grotesk), sans-serif",
                }}
              >
                Revisa tus datos
              </h2>
              <ProfileDataCards
                education={profile.education}
                experience={profile.experience}
                skills={profile.skills}
                languages={profile.languages}
                onUpdateEducation={(education) =>
                  updateProfile((prev) => ({ ...prev, education }))
                }
                onUpdateExperience={(experience) =>
                  updateProfile((prev) => ({ ...prev, experience }))
                }
                onUpdateSkills={(skills) =>
                  updateProfile((prev) => ({ ...prev, skills }))
                }
                onUpdateLanguages={(languages) =>
                  updateProfile((prev) => ({ ...prev, languages }))
                }
              />
            </div>

            <div className="lg:col-start-1 lg:row-start-4">
              <label
                htmlFor="profile-notes"
                className="block text-[13px] font-bold text-[#12122B] mb-2"
              >
                Notas: proyectos o intereses
              </label>
              <textarea
                id="profile-notes"
                rows={3}
                value={profile.notes}
                onChange={(event) => {
                  const notes = event.target.value;
                  updateProfile((prev) => ({ ...prev, notes }));
                }}
                placeholder="Ej. Hackatón 2025, interés en datos"
                className="w-full min-h-[84px] rounded-2xl border border-[#E4E3F1] bg-white px-3.5 py-2.5 text-[15px] text-[#12122B] placeholder:text-[#6B6A8A] focus:outline-none focus:border-[#3730A3] resize-y"
              />
            </div>

            <div className="lg:col-span-2 lg:row-start-5 mt-1">
              <PrivacySettingsCard
                privacy={profile.privacy}
                onToggle={handleTogglePrivacy}
              />
            </div>
          </div>

          {/* Mobile Save Footer (< lg) */}
          <div className="lg:hidden mt-4 pb-6">
            {saveMessage ? (
              <p
                role="status"
                className="mb-2.5 text-center text-[13px] font-medium text-[#15803D]"
              >
                {saveMessage}
              </p>
            ) : null}
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSaveProfile}
              className="w-full min-h-[46px] rounded-xl bg-[#3730A3] text-white text-[15px] font-bold hover:bg-[#2E2785] disabled:opacity-60 transition-colors cursor-pointer"
            >
              {isSaving ? "Guardando…" : "Guardar perfil"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
