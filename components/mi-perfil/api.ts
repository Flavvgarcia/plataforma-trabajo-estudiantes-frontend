import { INITIAL_PROFILE, StudentProfile } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchStudentProfile(): Promise<StudentProfile> {
  if (!API_BASE_URL) {
    return INITIAL_PROFILE;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/perfil`, {
      method: "GET",
      headers: { Accept: "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      return INITIAL_PROFILE;
    }

    const data = (await response.json()) as Partial<StudentProfile>;
    return {
      ...INITIAL_PROFILE,
      ...data,
      education: { ...INITIAL_PROFILE.education, ...data.education },
      experience: { ...INITIAL_PROFILE.experience, ...data.experience },
      privacy: { ...INITIAL_PROFILE.privacy, ...data.privacy },
      skills: Array.isArray(data.skills) ? data.skills : INITIAL_PROFILE.skills,
      languages: Array.isArray(data.languages)
        ? data.languages
        : INITIAL_PROFILE.languages,
    };
  } catch {
    return INITIAL_PROFILE;
  }
}

export async function saveStudentProfile(
  profile: StudentProfile
): Promise<{ ok: boolean; synced: boolean }> {
  if (!API_BASE_URL) {
    return { ok: true, synced: false };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/perfil`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      return { ok: true, synced: false };
    }

    return { ok: true, synced: true };
  } catch {
    return { ok: true, synced: false };
  }
}

export async function uploadStudentCv(file: File): Promise<{
  ok: boolean;
  synced: boolean;
  fileName: string;
  extracted?: Partial<StudentProfile>;
}> {
  if (!API_BASE_URL) {
    return { ok: true, synced: false, fileName: file.name };
  }

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/perfil/cv`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!response.ok) {
      return { ok: true, synced: false, fileName: file.name };
    }

    const extracted = (await response.json()) as Partial<StudentProfile>;
    return {
      ok: true,
      synced: true,
      fileName: file.name,
      extracted,
    };
  } catch {
    return { ok: true, synced: false, fileName: file.name };
  }
}

export async function reportAiExtractionError(
  details: string
): Promise<{ ok: boolean; synced: boolean }> {
  if (!API_BASE_URL) {
    return { ok: true, synced: false };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/perfil/reportar-error`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        section: "mi-perfil",
        details,
      }),
    });

    if (!response.ok) {
      return { ok: true, synced: false };
    }

    return { ok: true, synced: true };
  } catch {
    return { ok: true, synced: false };
  }
}
