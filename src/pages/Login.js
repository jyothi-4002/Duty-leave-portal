import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Login</h2>
        <button onClick={login} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Login with Google</button>
      </div>
    </div>
  );
};

export default Login;
