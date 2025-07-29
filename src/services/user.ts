import { api } from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export async function getUsers(): Promise<User[]> {
  const response = await api.get("/users");
  return response.data;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  return api.post("/users", data);
}

export async function updateUser(
  id: string,
  data: { name: string; email: string }
) {
  return api.patch(`/users/${id}`, data);
}

export async function deleteUser(id: string) {
  return api.delete(`/users/${id}`);
}
