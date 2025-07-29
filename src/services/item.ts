import { api } from "./api";

export interface Item {
  id: string;
  name: string;
  price: number;
  itemTypeId: string;
  createdAt: string;
}

export async function getItems(): Promise<Item[]> {
  const response = await api.get("/items");
  return response.data;
}

export async function createItem(data: {
  name: string;
  price: number;
  itemTypeId: string;
}) {
  return api.post("/items", data);
}

export async function updateItem(
  id: string,
  data: { name: string; price: number; itemTypeId: string }
) {
  return api.patch(`/items/${id}`, data);
}

export async function deleteItem(id: string) {
  return api.delete(`/items/${id}`);
}
