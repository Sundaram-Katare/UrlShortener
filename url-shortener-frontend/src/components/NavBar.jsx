import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.error("Logged Out");
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white text-black px-6 py-3 flex justify-between items-center shadow">
      <Link to="/" className="text-xl font-bold">
        <div className="flex justify-center">
           <h1 className="text-5xl font-extrabold bg-black text-transparent bg-clip-text bg-gradient-to-r from-black to-purple-800">Nano<span className="text-yellow-500">Link</span></h1>
        </div>
      </Link>

      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="bg-black px-2 py-1 border rounded-lg text-xl text-white hover:bg-purple-600">Login</Link>
            <Link to="/register" className="bg-black px-2 py-1 border rounded-lg text-xl text-white hover:bg-purple-600">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="bg-black hover:bg-green-500 text-white hover:text-black px-3 py-1 rounded">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
