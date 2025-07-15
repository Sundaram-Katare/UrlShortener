import React from "react";

const NavBar = () => {
  return (
    <>
     <nav className="flex flex-row justify-between px-5 py-2 bg-white shadow-black shadow-sm">
        <div className="flex justify-center">
           <h1 className="text-5xl font-extrabold bg-black text-transparent bg-clip-text bg-gradient-to-r from-black to-purple-800">Nano<span className="text-yellow-500">Link</span></h1>
        </div>

        <div className="flex justify-center">
           <button className="bg-gradient-to-r from-blue-800 to-purple-600 text-xl px-4 py-1 border rounded-xl text-white font-bold">Login</button>
        </div>
     </nav>
    </>
  )
}

export default NavBar;