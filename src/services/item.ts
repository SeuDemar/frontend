import { api } from "./api";

export async function createItem(data: {
  name: string;
  price: number;
  itemTypeId: string;
}) {
  return api.post("/items", data);
}
