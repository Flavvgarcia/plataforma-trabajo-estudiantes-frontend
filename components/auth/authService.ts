export type UserRole = "estudiante" | "empresa";

export interface LoginPayload {
  role: UserRole;
  email: string;
  password: string;
}

export interface RegisterPayload {
  role: UserRole;
  fullName: string;
  companyName?: string;
  email: string;
  password: string;
}

export const HOME_ROUTE = "/";

/**
 * Base URL configurada por entorno según la guía del equipo.
 * Cuando el backend esté activo, reemplazar los flujos locales por fetch(`${AUTH_API_URL}/...`).
 */
export const AUTH_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function submitLogin(payload: LoginPayload): Promise<void> {
  void payload;
}

export async function submitRegister(payload: RegisterPayload): Promise<void> {
  void payload;
}
