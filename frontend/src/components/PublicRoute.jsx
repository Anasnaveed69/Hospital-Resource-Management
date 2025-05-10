import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
}

export default PublicRoute;
