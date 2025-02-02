import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedEmail }) => {
  const { user } = useAuth();

  if (!user || user.email !== allowedEmail) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
