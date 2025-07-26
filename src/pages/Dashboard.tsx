import { FormItemType } from "../components/FormItemType";
import { FormItem } from "../components/FormItem";
import { FormUser } from "../components/FormUser";

export function Dashboard() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Painel de Administração</h1>

      <section>
        <FormItemType />
        {/* Lista de tipos de item com filtro aqui */}
      </section>

      <hr />

      <section>
        <FormItem />
        {/* Lista de itens com filtro aqui */}
      </section>

      <hr />

      <section>
        <FormUser />
        {/* Lista de usuários com filtro aqui */}
      </section>
    </div>
  );
}
