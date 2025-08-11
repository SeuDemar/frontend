import { api } from "./api";

export interface LoginResponse {
  access_token: string;
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
}

export async function validateToken(): Promise<boolean> {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const response = await api.get("/auth/validate", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 200;
  } catch {
    return false;
  }
}
