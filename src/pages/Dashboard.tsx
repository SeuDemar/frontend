import { useState, useEffect } from "react";
import { FormItemType } from "../components/FormItemType";
import { FormItem } from "../components/FormItem";
import { FormUser } from "../components/FormUser";
import { getItemTypes, type ItemType } from "../services/itemType";
import styles from "./Dashboard.module.css";

export function Dashboard() {
  const [itemTypes, setItemTypes] = useState<ItemType[]>([]);

  async function fetchItemTypes() {
    const data = await getItemTypes();
    setItemTypes(data);
  }

  useEffect(() => {
    fetchItemTypes();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Administração H.C Lanches</h1>

      <section className={styles.section}>
        <FormItemType onCreated={fetchItemTypes} />
      </section>

      <hr />

      <section className={styles.section}>
        <FormItem itemTypes={itemTypes} />
      </section>

      <hr />

      <section className={styles.section}>
        <FormUser />
      </section>
    </div>
  );
}
