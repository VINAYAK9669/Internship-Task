import React from "react";
import { FcEmptyTrash } from "react-icons/fc";

function NoTasks() {
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-center gap-2">
      <FcEmptyTrash className="w-[3rem] h-[3rem]" />
      <p className="font-bold text-slate-400">No Tasks</p>
    </div>
  );
}

export default NoTasks;
