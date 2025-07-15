import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useState } from 'react';

const colors = ['#13ca8dff', '#de2424ff'];

const Url = () => {
  // Mocked security score data
  const [data] = useState([
    { name: 'Safe', value: 60 },
    { name: 'Suspicious', value: 40 }
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto my-20 px-10 py-12 border rounded-2xl bg-gradient-to-r from-purple-600 to-purple-400 shadow-lg"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        🔗 Shorten a long link
      </h2>

      <form className="bg-black text-white p-6 rounded-xl space-y-4">
        <label className="block text-gray-100 font-medium text-lg">
          Paste your long link here
        </label>

        <input
          type="text"
          placeholder="https://example.com/long_url"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />

        <button
          type="submit"
          className="px-10 bg-gradient-to-r from-purple-800 to-purple-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Get Your Link For Free
        </button>
      </form>

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
