import { useState } from "react";
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, { email, password });
      toast.success("Registered");
      login(res.data.token, res.data.user); // If your backend sends token & user
      toast.success("Logged In");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };


  return (
    <>
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
            Create Your Account 🚀
          </h2>
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Create Account
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </>
  )
};
