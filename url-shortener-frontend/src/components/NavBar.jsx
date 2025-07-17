import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // install lucide-react or use any icon

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    toast.error("Logged Out");
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-black text-black px-6 py-3 shadow">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          <h1 className="text-3xl md:text-5xl font-extrabold bg-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white">
            Nano<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-purple-500">Link</span>
          </h1>
        </Link>

        {/* Hamburger icon on mobile */}
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} color="white"/>}
        </button>

        {/* Links on desktop */}
        <div className="hidden md:flex space-x-4 items-center">
          {!user ? (
            <>
              <Link
                to="/login"
                className="bg-gradient-to-r from-purple-800 to-purple-500 px-4 py-2 shadow-lg rounded-3xl text-xl text-white hover:bg-black"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-black px-4 py-2 shadow-lg rounded-3xl text-xl text-white hover:bg-purple-500"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="bg-black hover:bg-green-500 text-white hover:text-black px-3 py-1 rounded"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Links on mobile when menu is open */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col space-y-3">
          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-black px-2 py-1 border rounded-lg text-white hover:bg-purple-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-black px-2 py-1 border rounded-lg text-white hover:bg-purple-600"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="bg-black hover:bg-green-500 text-white hover:text-black px-3 py-1 rounded"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
