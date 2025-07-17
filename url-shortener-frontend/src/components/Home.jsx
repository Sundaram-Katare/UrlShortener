import React from "react";
import NavBar from "./NavBar";
import { motion } from "framer-motion";
import FeatureSlideshow from "./FeatureSlideShow";
import Url from "./Url";

const Home = () => {
  return (
    <>
      <NavBar />
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 h-screen gap-10 px-6 md:px-16 lg:px-40 py-10 items-center"
      >
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black leading-tight">
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

          <p className="text-base sm:text-lg md:text-xl mt-4 font-sans text-gray-700">
            Convert cluttered URLs into clean, custom links. Perfect for sharing
            on socials, managing campaigns, and boosting engagement.
          </p>

          <a href="#url">
            <button className="bg-gradient-to-r from-black to-gray-700 text-white mt-6 px-8 py-2 text-lg sm:text-xl rounded-xl font-bold hover:bg-white hover:text-black transition duration-300">
              Start
            </button>
          </a>
        </div>

        <div className="flex justify-center mt-10 md:mt-0">
          <FeatureSlideshow />
        </div>
      </motion.div>
      <Url />
    </>
  );
};

export default Home;
