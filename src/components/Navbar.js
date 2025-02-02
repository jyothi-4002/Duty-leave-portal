import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Duty Leave Portal</Link>
        <div>
          {user ? (
            <>
              <span className="mr-4">Hello, {user.displayName}</span>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition duration-300">Logout</button>
            </>
          ) : (
            <Link to="/login" className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition duration-300">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
