import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

function StatsSection() {
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchCount = () => {
      axios.get(`${API_BASE}/url/count`)
        .then(res => setTotalCount(res.data.total))
        .catch(err => console.error("Failed to fetch count", err));
    };

    fetchCount();
    const interval = setInterval(fetchCount, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto px-4 py-6 sm:px-6 sm:py-8 bg-gradient-to-r from-green-300/30 to-blue-300/30 rounded-2xl shadow-md transform transition-transform hover:scale-105">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 text-center">
        Total URLs Shortened
      </h2>
      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mt-4 text-center">
        {totalCount}
      </p>
    </div>
  );
}

export default StatsSection;
