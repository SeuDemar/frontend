import { api } from "./api";

export async function createItemType(data: { name: string }) {
  return api.post("/item-types", data);
}
