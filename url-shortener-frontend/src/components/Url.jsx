import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
const colors = ['#009a0a', '#fb1717ff'];

const Url = () => {
  const [data, setData] = useState([
    { name: 'Safe', value: 60 },
    { name: 'Suspicious', value: 40 }
  ]);

  const [longUrl, setLongUrl] = useState("");
  const [length, setLength] = useState(6);
  const [shortUrl, setShortUrl] = useState("");
  const [securityScore, setSecurityScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleShorten = async () => {
    if (!longUrl) return;

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/url/shorten`,
        { longUrl, length },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );
      const shortPath = new URL(res.data.shortUrl).pathname.split('/').pop();
      setShortUrl(`${API_BASE}/url/s/${shortPath}`);
      setSecurityScore(res.data.securityScore);
      toast.success(`Safe Percentage: ${res.data.securityScore}%`, {
        position: 'top-center',
        style: {
          fontSize: '1.25rem',
          background: '#000',
          color: '#fff',
          padding: '1rem 1.5rem',
          borderRadius: '0.75rem',
        },
      });
      setData([
        { name: 'Safe', value: res.data.securityScore },
        { name: 'Suspicious', value: 100 - res.data.securityScore }
      ])
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    try {
      window.location.href = shortUrl;
    } catch (err) {
      console.log("Redirect error:", err);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to Clipboard");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        id='url'
        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 md:px-10 py-16 bg-gradient-to-br from-black to-gray-800"
      >
        {/* Form Section */}
        <div className="p-6 sm:p-10 rounded-3xl bg-inherit">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            🔗 Shorten a Long URL Instantly
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleShorten();
            }}
            className="bg-white rounded-xl p-6 sm:p-8 space-y-6 shadow-md"
          >
            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Enter your long URL
              </label>
              <input
                type="text"
                placeholder="https://example.com/very/long/link"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 transition"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-2">
                Short URL Length (optional)
              </label>
              <input
                type="number"
                placeholder="Length (default 6)"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-800 transition"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                min={4}
                max={10}
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 font-semibold rounded-lg text-white bg-gradient-to-r from-purple-600 to-purple-500 hover:to-purple-700 transition"
            >
              {loading ? "Shortening..." : "Get Your Short Link"}
            </motion.button>
          </form>

          {shortUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 bg-white rounded-2xl shadow-xl p-6 space-y-4"
            >
              <h3 className="text-xl font-semibold text-gray-800">Your Short URL:</h3>
              <p
                className="text-blue-600 text-lg underline cursor-pointer break-all hover:text-blue-800 transition"
                onClick={copyToClipboard}
              >
                {shortUrl}
              </p>

              {securityScore !== null && (
                <p className={`text-sm ${securityScore < 40 ? "text-red-600" : "text-green-600"}`}>
                  Security Score: {securityScore}%
                </p>
              )}

              <button
                onClick={handleRedirect}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                Visit Link
              </button>
            </motion.div>
          )}
        </div>

        {/* Chart Section */}
        <div className="flex flex-col items-center justify-center space-y-8 mt-10 lg:mt-0">
          <div className="text-white text-3xl md:text-4xl font-semibold text-center">
            🛡️ URL Security Score
          </div>
          <PieChart width={250} height={250} className="mx-auto">
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </motion.div>

      <h2 className='text-md sm:text-lg text-white text-center py-4 bg-gradient-to-t from-black to-gray-800'>
        Made with ❤️ by Sundaram Katare
      </h2>
    </>
  );
};

export default Url;
