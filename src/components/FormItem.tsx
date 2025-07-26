import { useState } from "react";
import { createItem } from "../services/item";

export function FormItem() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [itemTypeId, setItemTypeId] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    try {
      await createItem({ name, price: parseFloat(price), itemTypeId });
      setMessage("Item criado com sucesso!");
      setName("");
      setPrice("");
      setItemTypeId("");
    } catch (err) {
      console.error(err);
      setMessage("Erro ao criar item.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Item</h2>

      <input
        type="text"
        placeholder="Nome do item"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Preço"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="ID do Tipo de Item"
        value={itemTypeId}
        onChange={(e) => setItemTypeId(e.target.value)}
        required
      />

      <button type="submit">Cadastrar</button>

      {message && <p>{message}</p>}
    </form>
  );
}
