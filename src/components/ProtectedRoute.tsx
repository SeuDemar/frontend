import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "../services/authService";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const valid = await validateToken();
      setIsValid(valid);
      setLoading(false);
    }
    checkAuth();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return isValid ? children : <Navigate to="/login" replace />;
}
