import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { useSelector } from "react-redux";
import { colors } from "./helper";

function StatusCard({ taskName }) {
  const { pending, progress, completed, deployed, deferred } = useSelector(
    (state) => state.tasks.status
  );
  const [currentTasks, setCurrentTasks] = useState([]);

  const [bg_color, setBgColor] = useState("");
  const { bg_pending, bg_progress, bg_completed, bg_deployed, bg_deffered } =
    colors;

  function currentTaskFn() {
    switch (taskName) {
      case "Assign":
        setCurrentTasks(pending);
        setBgColor(bg_pending);
        break;
      case "In Progress":
        setCurrentTasks(progress);
        setBgColor(bg_progress);
        break;
      case "Completed":
        setCurrentTasks(completed);
        setBgColor(bg_completed);
        break;
      case "Deployed":
        setCurrentTasks(deployed);
        setBgColor(bg_deployed);
        break;
      case "Deferred":
        setCurrentTasks(deferred);
        setBgColor(bg_deffered);
        break;
      default:
        setCurrentTasks([]);
        break;
    }
  }

  useEffect(() => {
    currentTaskFn();
  }, [taskName, pending, progress, completed, deployed, deferred]);

  return (
    <div className="w-full sm:max-w-[320px] border items-center h-[60vh]  bg-white">
      <h1
        className="w-full text-center p-2 text-white font-medium"
        style={{ background: `${bg_color}` }}
      >
        {taskName === "Assign" ? "Pending" : taskName}
      </h1>

      <div className="relative flex flex-col justify-start p-3 items-center gap-3 overflow-y-auto no-scrollbar  h-[90%]">
        {currentTasks.length > 0 ? (
          currentTasks.map((task, index) => (
            <TaskCard task={task} key={index} />
          ))
        ) : (
          <TaskCard task={currentTasks} />
        )}
      </div>
    </div>
  );
}

export default StatusCard;
