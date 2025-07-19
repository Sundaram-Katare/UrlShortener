import React from "react";
import NavBar from "./NavBar";
import { motion } from "framer-motion";
import FeatureSlideshow from "./FeatureSlideShow";
import Url from "./Url";
import StatsSection from "./StatsSection";

const Home = () => {
  return (
    <>
      <NavBar />
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-screen gap-10 px-6 sm:px-10 md:px-16 lg:px-32 xl:px-40 py-10 items-center"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-black leading-tight">
            Short
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-purple-500">
              Your
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-purple-500">
              Long URLs
            </span>
            <br />
            <span>in Seconds</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg xl:text-xl mt-4 font-sans text-gray-700 max-w-xl">
            Convert cluttered URLs into clean, custom links. Perfect for sharing on socials,
            managing campaigns, and boosting engagement.
          </p>

          <div className="flex gap-6 sm:gap-10 mt-6">
            <a href="#url">
              <button className="bg-gradient-to-r from-black to-gray-700 text-white px-6 py-2 sm:px-8 sm:py-3 text-base sm:text-lg rounded-xl font-bold hover:bg-white hover:text-black transition duration-300">
                Start
              </button>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-10 justify-center mt-10 md:mt-0">
          <FeatureSlideshow />
          <StatsSection />
        </div>
      </motion.div>
      <Url />
    </>
  );
};

export default Home;
