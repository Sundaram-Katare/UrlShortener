import React from "react";
import NavBar from "./NavBar";
import { motion } from 'framer-motion';
import FeatureSlideshow from "./FeatureSlideShow";
import Url from "./Url";

const Home = () => {
    return (
        <>
         <NavBar />
         <motion.div className="grid grid-cols-2 gap-20 ml-60 mr-40">
           <div className="mt-20">
            <h1 className="text-8xl font-extrabold text-black ">
                Short
                <br />
                <span className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-purple-500">
                    Your
                </span>
                <br />
                <span className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-purple-500">
                    Long URLs
                </span>
                <br />
                <span>in Seconds</span>
            </h1>

            <p className="text-xl mt-5 font-sans">Convert cluttered URLs into clean, custom links. Perfect for sharing on socials, 
               managing campaigns, and boosting engagement.</p>

               <button className="bg-gradient-to-r from-black to-gray-600 text-4xl mt-5 px-20 py-1 justify-center border rounded-xl text-white font-bold hover:bg-white">Start</button>
           </div>

           <div className="mt-20">
            <FeatureSlideshow />
           </div>
         </motion.div>
         <Url />
        </>
    )
};

export default Home;