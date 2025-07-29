import { api } from "./api";

export interface ItemType {
  id: string;
  name: string;
  createdAt: string;
}

export async function getItemTypes(): Promise<ItemType[]> {
  const response = await api.get("/item-types");
  return response.data;
}

export async function getItemType(id: string): Promise<ItemType> {
  const response = await api.get(`/item-types/${id}`);
  return response.data;
}

export async function createItemType(data: { name: string }) {
  return api.post("/item-types", data);
}

export async function updateItemType(id: string, data: { name: string }) {
  return api.patch(`/item-types/${id}`, data);
}

export async function deleteItemType(id: string) {
  return api.delete(`/item-types/${id}`);
}
