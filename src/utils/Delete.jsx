import React, { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  getCurrentTaskDetails,
  mutateData,
  setCurrentSelectedId,
  setIsDeleteSelected,
} from "../components/slice/taskSlice";
import toast from "react-hot-toast";

function Delete() {
  // Redux disptach and useSelector
  const dispatch = useDispatch();
  const { currentTask, currentSelectedId } = useSelector(
    (state) => state.tasks
  );
  console.log(currentTask);
  // Close a delete form
  function closeForm() {
    dispatch(setIsDeleteSelected());
  }
  // Close handle
  function handleDelete() {
    const id = currentSelectedId;

    if (currentTask[0].status === "Completed") {
      // Show an error toast if the task is already completed
      toast.error("Cannot delete a completed task");
      dispatch(setIsDeleteSelected());
    } else {
      // If the task is not completed, proceed with deletion
      dispatch(deleteTask(id)); // Delete the task with given id
      // Reset current task details any task is deleted
      dispatch(setCurrentSelectedId("")); // Reset current selected task id

      toast.success(`${currentTask[0].title} Deleted Successfully`);
      dispatch(getCurrentTaskDetails()); // Reset current task details
      dispatch(setIsDeleteSelected());
      dispatch(mutateData()); // Update data after deletion [help to filter the data into their respecitve column]
    }
  }
  return (
    <div className="fixed bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-[100vw] min-h-[100vh] flex justify-center items-center  z-1000 bg-gray_opacity z-[1000]">
      <div className="w-[360px]  border flex flex-col ">
        <h1 className="text-center bg-white py-2 w-full flex items-center justify-between px-4 font-semibold ">
          <span>Delete</span>{" "}
          <span className="border rounded-full p-1 cursor-pointer">
            <HiMiniXMark
              className="stroke-1 cursor-pointer"
              onClick={() => {
                closeForm();
              }}
            />
          </span>
        </h1>
        <div className="flex  flex-col  gap-3 pt-5 bg-gradient-to-r from-pink-200 to-blue-200 px-5">
          <h3>Do you wish to delete the Task?</h3>
          <div className="flex justify-between items-center gap-5 w-full   py-3">
            <h3 className="font-semibold">{currentTask[0].title}</h3>
            <button
              className="bg-blue-800 p-2 px-3 text-white font-medium rounded-md"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delete;
