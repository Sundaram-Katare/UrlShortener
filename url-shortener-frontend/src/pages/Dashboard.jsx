import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import Navbar from "../components/NavBar";
import toast from "react-hot-toast";
import { FaHistory } from "react-icons/fa";

const API = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
const API_BASE = import.meta.env.VITE_CLIENT_BASE || "http://localhost:5000";

export default function Dashboard() {
  const { token } = useAuth();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrls = async () => {
    try {
      const res = await axios.get(`${API}/url/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUrls(res.data.urls);
    } catch (error) {
      console.error("Error fetching URLs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard", {
      duration: 3000,
      style: {
        background: '#002156',
        color: 'white',
        fontSize: '1.25rem',
        textAlign: 'center',
        padding: '1rem 2rem',
      },
      position: 'top-center',
    });
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 flex justify-center items-center gap-4 flex-wrap text-blue-900">
          <FaHistory size={28} /> Your Shortened URLs
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : urls.length === 0 ? (
          <p className="text-center text-gray-500">No URLs created yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {urls.map((url, i) => (
              <motion.div
                key={url._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white shadow-lg p-5 rounded-xl border border-gray-200 hover:shadow-xl transition-all"
              >
                <p className="text-gray-700 font-medium mb-2 break-words">
                  <span className="text-sm text-gray-500">Original:</span><br />
                  {url.long_url}
                </p>

                <div className="flex flex-wrap items-center justify-between mt-2 gap-2">
                  <a
                    href={`${API}/url/s/${url.short_id}`}
                    target="_blank"
                    className="text-blue-600 hover:underline break-all"
                  >
                    Short: {API}/url/s/{url.short_id}
                  </a>

                  <button
                    onClick={() => copyToClipboard(`${API}/url/s/${url.short_id}`)}
                    className="text-sm px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
                  >
                    Copy
                  </button>
                </div>

                <div className="text-sm text-gray-600 mt-3 flex justify-between flex-wrap">
                  <span>Clicks: {url.clicks}</span>
                  <span>
                    Created:{" "}
                    {new Date(url.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
