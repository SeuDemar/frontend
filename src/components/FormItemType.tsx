import { useState } from "react";
import { createItemType } from "../services/itemType";

export function FormItemType() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    try {
      await createItemType({ name });
      setMessage("Tipo de item criado com sucesso!");
      setName("");
    } catch (err) {
      console.error(err);
      setMessage("Erro ao criar tipo de item.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Tipo de Item</h2>
      <input
        type="text"
        placeholder="Nome do tipo"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {message && <p>{message}</p>}
    </form>
  );
}
