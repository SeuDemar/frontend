import { useEffect, useState } from "react";
import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
  type Item,
} from "../services/item";
import type { ItemType } from "../services/itemType";

type Props = {
  itemTypes: ItemType[];
};

export function FormItem({ itemTypes }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [itemTypeId, setItemTypeId] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function loadItems() {
    const data = await getItems();
    setItems(data);
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    try {
      if (editingId) {
        await updateItem(editingId, { name, price, itemTypeId });
        setMessage("Item atualizado com sucesso!");
        setEditingId(null);
      } else {
        await createItem({ name, price, itemTypeId });
        setMessage("Item criado com sucesso!");
      }
      setName("");
      setPrice(0);
      setItemTypeId("");
      loadItems();
    } catch {
      setMessage("Erro ao salvar item.");
    }
  }

  function handleEdit(item: Item) {
    setEditingId(item.id);
    setName(item.name);
    setPrice(item.price);
    setItemTypeId(item.itemTypeId);
    setMessage("");
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este item?")) return;
    try {
      await deleteItem(id);
      setMessage("Item excluído com sucesso!");
      loadItems();
    } catch {
      setMessage("Erro ao excluir item.");
    }
  }

  return (
    <div>
      <h2>{editingId ? "Editar Item" : "Cadastrar Item"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
        />
        <select
          value={itemTypeId}
          onChange={(e) => setItemTypeId(e.target.value)}
          required
        >
          <option value="">Selecione o tipo</option>
          {itemTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <button type="submit">{editingId ? "Atualizar" : "Cadastrar"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setName("");
              setPrice(0);
              setItemTypeId("");
              setMessage("");
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      {message && <p>{message}</p>}

      <h3>Itens Cadastrados</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - R$ {item.price.toFixed(2)} - tipo:{" "}
            {itemTypes.find((t) => t.id === item.itemTypeId)?.name || "?"}{" "}
            <button onClick={() => handleEdit(item)}>Editar</button>
            <button onClick={() => handleDelete(item.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
