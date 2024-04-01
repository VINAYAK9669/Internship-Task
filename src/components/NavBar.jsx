import React from "react";
import { FaUser } from "react-icons/fa";

function NavBar() {
  return (
    <header>
      <nav className="flex justify-between items-center h-[10vh] w-full px-[1rem]  ">
        <h1 className="font-bold cursor-pointer text-xl">TASK BOARD</h1>
        <div className="p-4  cursor-pointer border-2 border-slate-50 rounded-full">
          <FaUser className="h-[25px] w-[25px]" />
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
