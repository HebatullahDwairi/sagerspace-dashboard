import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ClipLoader } from "react-spinners";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) =>  {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="w-full h-screen flex justify-center items-center">
    <ClipLoader color="gray"/>
  </div>;

  return user ? children : <Navigate to="/login" replace />;
}


export default ProtectedRoute;