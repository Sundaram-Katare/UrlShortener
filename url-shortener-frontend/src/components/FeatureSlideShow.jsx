import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiBodyHeight } from "react-icons/gi";
import { FaLock } from "react-icons/fa";
import { IoAnalyticsOutline } from "react-icons/io5";
import { MdHistoryToggleOff } from "react-icons/md";

const features = [
  {
    title: "Customizable URLs",
    description: "Create branded short links with custom slugs.",
    icon: <GiBodyHeight size={60} className="text-blue-600" />
  },
  {
    title: "Analytics Dashboard",
    description: "Track clicks, referrals, and user engagement.",
    icon: <IoAnalyticsOutline size={60} className="text-purple-600" />
  },
  {
    title: "Secure Redirection",
    description: "Protect users with SSL and malicious link detection.",
    icon: <FaLock size={60} className="text-green-600" />
  },
  {
    title: "History",
    description: "Login and Go to Dashboard towatch URLs history.",
    icon: <MdHistoryToggleOff  size={60} className="text-orange-600"/>,
  }
];

export default function FeatureSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="relative w-full min-h-[260px] sm:min-h-[300px] md:min-h-[340px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          className="absolute w-full h-full bg-gradient-to-r from-gray-200 via-white to-gray-200 shadow-xl rounded-xl p-6 sm:p-8 flex flex-col justify-center items-center text-center"
        >
          <div className="mb-6">{features[current].icon}</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-800">
            {features[current].title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-[90%] sm:max-w-[80%]">
            {features[current].description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
