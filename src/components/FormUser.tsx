import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  type User,
} from "../services/user";
import styles from "./Base.module.css"; // Importando o CSS base

export function FormUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function loadUsers() {
    const data = await getUsers();
    setUsers(data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    try {
      if (editingId) {
        await updateUser(editingId, { name, email });
        setMessage("Usuário atualizado com sucesso!");
        setEditingId(null);
      } else {
        await createUser({ name, email, password });
        setMessage("Usuário criado com sucesso!");
      }

      setName("");
      setEmail("");
      setPassword("");
      loadUsers();
    } catch {
      setMessage("Erro ao salvar usuário.");
    }
  }

  function handleEdit(user: User) {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
    setPassword("");
    setMessage("");
  }

  async function handleDelete(id: string) {
    if (!confirm("Deseja mesmo excluir este usuário?")) return;
    try {
      await deleteUser(id);
      setMessage("Usuário excluído com sucesso!");
      loadUsers();
    } catch {
      setMessage("Erro ao excluir usuário.");
    }
  }

  return (
    <div className={styles.container}>
      <h2>{editingId ? "Editar Usuário" : "Cadastrar Usuário"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {!editingId && (
          <input
            className={styles.input}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        )}
        <button className={styles.button} type="submit">
          {editingId ? "Atualizar" : "Cadastrar"}
        </button>
        {editingId && (
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              setEditingId(null);
              setName("");
              setEmail("");
              setPassword("");
              setMessage("");
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      {message && <p className={styles.message}>{message}</p>}

      <h3>Usuários Cadastrados</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}){" "}
            <button className={styles.button} onClick={() => handleEdit(user)}>
              Editar
            </button>
            <button
              className={styles.button}
              onClick={() => handleDelete(user.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
