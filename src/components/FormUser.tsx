import { useState } from "react";
import { createUser } from "../services/user";

export function FormUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    try {
      await createUser({ name, email, password });
      setMessage("Usuário criado com sucesso!");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setMessage("Erro ao criar usuário.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Usuário</h2>

      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Cadastrar</button>

      {message && <p>{message}</p>}
    </form>
  );
}
