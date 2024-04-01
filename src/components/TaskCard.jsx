// TaskCard component displays a task card and handles rendering when there are no tasks.

import React, { useState } from "react";
import NoTasks from "../utils/NoTasks";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import {
  getCurrentTaskDetails,
  setCurrentSelectedId,
  setIsDeleteSelected,
  toggleEditFormStatus,
} from "./slice/taskSlice";

function TaskCard({ task }) {
  const dispatch = useDispatch();
  // State to manage whether to show edit options
  const [showEditOptions, setShowEditOption] = useState(false);

  // Calculate the length of task object to determine if there are tasks or not
  const taskLength = Object.keys(task).length;

  // If there are no tasks, render NoTasks component
  if (taskLength === 0) {
    return <NoTasks />;
  }

  // Function to handle showing/hiding edit options
  function handleEditOption(id) {
    dispatch(setCurrentSelectedId(id)); // Set the current selected task id
    dispatch(getCurrentTaskDetails()); // Fetch details of the current task
    setShowEditOption(!showEditOptions); // Toggle show/hide of edit options
  }

  // Function to handle task deletion
  function closeForm() {
    dispatch(setIsDeleteSelected());
    //
  }

  return (
    <div className="w-full flex flex-col bg-gray_hard p-2 gap-3 rounded-sm">
      {/* Task title and priority */}
      <div className="flex  justify-between items-end border-b-2 pb-1">
        <h2 className="font-medium">{task.title}</h2>
        <p className="p-1 bg-blue-900 text-white text-[0.8rem] font-medium">
          {task.priority}
        </p>
      </div>
      {/* Task description */}
      <p className="text-sm">{task.description}</p>
      <div className="flex  justify-between">
        {/* Task assignee */}
        <h3 className="font-medium">{task.assignee}</h3>
        <div className="relative">
          {/* Edit options */}
          <HiEllipsisVertical
            className="text-white stroke-[1.5px] bg-blue-900 text-xl cursor-pointer"
            onClick={() => handleEditOption(task.id)}
          />
          {showEditOptions && (
            <div className="absolute top-[100%] right-0 flex flex-col bg-white p-2 gap-1 border-1 border-slate-500 ">
              {/* Edit option */}
              <p
                className="border-b-2 w-full hover:bg-slate-200 cursor-pointer"
                onClick={() => (
                  dispatch(toggleEditFormStatus()), setShowEditOption(false)
                )}
              >
                Edit
              </p>
              {/* Delete option */}
              <p
                className=" w-full hover:bg-slate-200 cursor-pointer"
                onClick={() => (closeForm(), setShowEditOption(false))}
              >
                Delete
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Task status */}
      <button className="w-[120px] bg-blue-900 text-white font-medium p-1 rounded-md mt-1">
        {task.status}
      </button>
    </div>
  );
}

export default TaskCard;
