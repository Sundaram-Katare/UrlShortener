import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiBodyHeight } from "react-icons/gi";
import { FaLock } from "react-icons/fa";
import { IoAnalyticsOutline } from "react-icons/io5";

const features = [
  {
    title: "Customizable URLs",
    description: "Create branded short links with custom slugs.",
    icon: <GiBodyHeight size={80} color="blue"/>
  },
  {
    title: "Analytics Dashboard",
    description: "Track clicks, referrals, and user engagement.",
    icon: <IoAnalyticsOutline size={80}/>
  },
  {
    title: "Secure Redirection",
    description: "Protect users with SSL and malicious link detection.",
    icon: <FaLock size={80}/>
  }
];

export default function FeatureSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % features.length);
    }, 3000); // Change every 3s
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="relative w-full h-64">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          className="absolute w-full h-full bg-gradient-to-r from-gray-500/30 via-white to-gray-500/30 shadow-lg rounded-xl p-6"
        >
          <p className="flex justify-center mb-10">{features[current].icon}</p>
          <h2 className="text-4xl font-semibold mb-2">{features[current].title}</h2>
          <p className="text-lg text-gray-600">{features[current].description}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}