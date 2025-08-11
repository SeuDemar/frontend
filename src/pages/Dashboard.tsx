import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import necessário para navegar
import { FormItemType } from "../components/FormItemType";
import { FormItem } from "../components/FormItem";
import { FormUser } from "../components/FormUser";
import { getItemTypes, type ItemType } from "../services/itemType";
import styles from "./Dashboard.module.css";

export function Dashboard() {
  const [itemTypes, setItemTypes] = useState<ItemType[]>([]);
  const navigate = useNavigate();

  async function fetchItemTypes() {
    const data = await getItemTypes();
    setItemTypes(data);
  }

  useEffect(() => {
    fetchItemTypes();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token"); // limpa token do localStorage
    navigate("/login"); // redireciona para login
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img
          src="https://placehold.co/100x100"
          alt="HC Lanches logo in blue and white colors with a sandwich and drink illustration"
          className={styles.logo}
        />
        <h1 className={styles.title}>Administração H.C Lanches</h1>

        {/* Botão logout */}
        <button
          className={styles.logoutButton}
          onClick={handleLogout}
          type="button"
          aria-label="Logout"
        >
          Logout
        </button>
      </header>

      <main className={styles.content}>
        <section className={`${styles.section} ${styles.card}`}>
          <h2 className={styles.sectionTitle}>Cadastrar Tipo de Item</h2>
          <FormItemType onCreated={fetchItemTypes} />
        </section>

        <div className={styles.divider}></div>

        <section className={`${styles.section} ${styles.card}`}>
          <h2 className={styles.sectionTitle}>Cadastrar Item</h2>
          <FormItem itemTypes={itemTypes} />
        </section>

        <div className={styles.divider}></div>

        <section className={`${styles.section} ${styles.card}`}>
          <h2 className={styles.sectionTitle}>Cadastrar Usuário</h2>
          <FormUser />
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} H.C Lanches - Todos os direitos
          reservados
        </p>
      </footer>
    </div>
  );
}
