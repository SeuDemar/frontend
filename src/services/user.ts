import { api } from "./api";

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  return api.post("/auth/register", data);
}
