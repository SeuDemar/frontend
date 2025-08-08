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
