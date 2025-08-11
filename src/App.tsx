import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";

function App() {
  // Pega o token do localStorage (se existir)
  const token = localStorage.getItem("token");
  // isLoggedIn é true se houver token, false caso contrário
  const isLoggedIn = !!token;

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota raiz "/" — redireciona direto para o dashboard, 
            independente de estar logado ou não */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Rota login — 
            Mesmo que o usuário não esteja logado, vamos deixar o acesso
            ao login opcional, mas não será redirecionado automaticamente para cá */}
        <Route
          path="/login"
          element={
            // Comentado para permitir acessar login sem redirecionar
            // isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />
            <Login />
          }
        />

        {/* Rota dashboard — 
            Aqui não fazemos checagem de token, 
            para permitir acesso direto ao dashboard mesmo sem login */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
          // Se quiser, pode remover a checagem de isLoggedIn para abrir sempre
          // element={isLoggedIn ? <Dashboard /> : <Dashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
