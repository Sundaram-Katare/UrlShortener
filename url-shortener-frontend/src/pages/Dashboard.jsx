import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import Navbar from "../components/NavBar";
import toast from "react-hot-toast";
import { FaHistory } from "react-icons/fa";

const API = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

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
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to load URLs");
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
        background: '#002156ff', // Tailwind's blue-500
        color: 'white',
        fontSize: '1.25rem', // Large text
        textAlign: 'center',
        padding: '1rem 2rem',
      },
      position: 'top-center', // Centered at the top
    });

  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 p-4 ">
        <h2 className="text-3xl font-bold text-center mb-6 flex"><FaHistory className="mr-10" /> Your Shortened URLs</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : urls.length === 0 ? (
          <p className="text-center text-gray-500">No URLs created yet.</p>
        ) : (
          <div className="space-y-4">
            {urls.map((url, i) => (
              <motion.div
                key={url.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white shadow-md p-4 rounded"
              >
                <p className="text-gray-700 font-medium break-all">
                  <span className="text-sm text-gray-500">Original:</span><br />
                  {url.long_url}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <a
                    href={`http://localhost:5000/s/${url.short_id}`}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    Short: http://localhost:5000/s/{url.short_id}
                  </a>
                  <button
                    onClick={() => copyToClipboard(`http://localhost:5000/s/${url.short_id}`)}
                    className="text-sm px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-900"
                  >
                    Copy
                  </button>
                </div>

                <div className="text-sm text-gray-600 mt-1 flex justify-between">
                  <span>Clicks: {url.clicks}</span>
                  <span>
                    Created: {new Date(url.created_at).toLocaleDateString("en-IN", {
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
