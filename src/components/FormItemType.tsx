import { useState, useEffect } from "react";
import type { ItemType } from "../services/itemType";
import {
  getItemTypes,
  createItemType,
  updateItemType,
  deleteItemType,
} from "../services/itemType";
import styles from "./Base.module.css"; // Importando o CSS base

interface FormItemTypeProps {
  onCreated?: () => void;
}

export function FormItemType({ onCreated }: FormItemTypeProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [itemTypes, setItemTypes] = useState<ItemType[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function loadItemTypes() {
    try {
      const data = await getItemTypes();
      setItemTypes(data);
      onCreated?.(); // Chama o callback se estiver presente
    } catch {
      setMessage("Erro ao carregar tipos de item.");
    }
  }

  useEffect(() => {
    loadItemTypes();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    try {
      if (editingId) {
        await updateItemType(editingId, { name });
        setMessage("Tipo de item atualizado com sucesso!");
        setEditingId(null);
      } else {
        await createItemType({ name });
        setMessage("Tipo de item criado com sucesso!");
      }
      setName("");
      await loadItemTypes(); // Atualiza local e notifica o pai
    } catch {
      setMessage("Erro ao salvar tipo de item.");
    }
  }

  async function handleEdit(id: string, currentName: string) {
    setEditingId(id);
    setName(currentName);
    setMessage("");
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja deletar este tipo?")) return;
    try {
      await deleteItemType(id);
      setMessage("Tipo de item removido com sucesso!");
      await loadItemTypes();
    } catch {
      setMessage("Erro ao deletar tipo de item.");
    }
  }

  return (
    <div className={styles.container}>
      <h2>{editingId ? "Editar Tipo de Item" : "Cadastrar Tipo de Item"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Nome do tipo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
              setMessage("");
            }}
          >
            Cancelar
          </button>
        )}
      </form>
      {message && <p className={styles.message}>{message}</p>}

      <h3>Tipos de Item Cadastrados</h3>
      <ul>
        {itemTypes.map(({ id, name }) => (
          <li key={id}>
            {name}{" "}
            <button
              className={styles.button}
              onClick={() => handleEdit(id, name)}
            >
              Editar
            </button>{" "}
            <button className={styles.button} onClick={() => handleDelete(id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
