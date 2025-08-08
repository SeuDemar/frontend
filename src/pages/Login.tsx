import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService"; // caminho correto para o serviço
import styles from "./Login.module.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.access_token);
      setMessage("Login realizado com sucesso!");
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message || "Erro no login. Tente novamente.");
      } else {
        setMessage("Erro no login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
          disabled={loading}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
