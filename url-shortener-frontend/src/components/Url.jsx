import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import  {useAuth} from '../context/AuthContext';

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const colors = ['#11b37dff', '#de2424ff'];

const Url = () => {
  // Mocked security score data
  const [data] = useState([
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
    if(!longUrl) return;

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/url/shorten`,
        { longUrl, length},
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );
      setShortUrl(res.data.shortUrl);
      setSecurityScore(res.data.securityScore);
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
       setLoading(false);
    }
  };

    const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto my-20 px-10 py-2 border rounded-2xl bg-gradient-to-r from-purple-600 to-purple-400 shadow-lg"
    >
      <h2 className="text-3xl text-white font-bold text-gray-800 mb-8">
        🔗 Shorten a long link
      </h2>

      <form className="bg-black text-white p-6 rounded-xl space-y-4">
        <label className="block text-gray-100 font-medium text-lg">
          Paste your long link here
        </label>

        <input
          type="text"
          placeholder="https://example.com/long_url"
          className="w-full text-black px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />

        <input
        type="number"
        placeholder="Short URL length (default 6)"
        className="w-full text-black px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
        min={4}
        max={10}
      />

        <button
          onClick={handleShorten}
          className="px-10 bg-gradient-to-r from-purple-800 to-purple-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
         {loading ? "Shortening" : "Get Your Link For Free"}
        </button>
      </form>

       {shortUrl && (
        <motion.div
          className="mt-6 p-4 bg-gray-100 rounded shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-lg font-medium">Short URL:</p>
          <p className="text-blue-600 break-all underline cursor-pointer" onClick={copyToClipboard}>
            {shortUrl}
          </p>

          {securityScore !== null && (
            <p className={`mt-2 text-sm ${securityScore < 40 ? "text-red-500" : "text-green-600"}`}>
              Security Score: {securityScore}%
            </p>
          )}
           <button
        onClick={() => window.location.href = shortUrl}
        className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
      >
        Visit Link
      </button>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row gap-20 mt-20 items-center justify-between">
        <div className="text-3xl font-semibold text-white">
          URL Security Score
        </div>
        <div>
          <PieChart width={300} height={300}>
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
      </div>
    </motion.div>
  );
};

export default Url;
