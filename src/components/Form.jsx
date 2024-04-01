// Import statements for React and related libraries
import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiMiniXMark } from "react-icons/hi2";

// Importing helper function
import { generateRandomId } from "../utils/helper";

// Importing Redux hooks and actions
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  editTask,
  mutateData,
  toggleCreateFormStatus,
  toggleEditFormStatus,
} from "./slice/taskSlice";

// Component for creating or editing a task
function CreateForm({ type }) {
  // Redux state and dispatch function
  const { currentSelectedId, currentTask } = useSelector(
    (state) => state.tasks
  );
  const dispatch = useDispatch();

  // Extracting selected task data for form fields if type is "edit"
  const title =
    type === "edit" && currentTask.length > 0 ? currentTask[0]?.title : "";
  const description =
    type === "edit" && currentTask.length > 0
      ? currentTask[0]?.description
      : "";
  const id =
    type === "edit" && currentTask.length > 0
      ? currentTask[0]?.id
      : generateRandomId();
  const priority =
    type === "edit" && currentTask.length > 0 ? currentTask[0]?.priority : "P0";
  const startDate =
    type === "edit" && currentTask.length > 0
      ? new Date(currentTask[0]?.startDate)
      : new Date();
  const status =
    type === "edit" && currentTask.length > 0
      ? currentTask[0]?.status
      : "Assign";
  const team =
    type === "edit" && currentTask.length > 0 ? currentTask[0]?.team : "";
  const assignee =
    type === "edit" && currentTask.length > 0 ? currentTask[0]?.assignee : "";

  // Form control using react-hook-form
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title,
      description,
      startDate,
      team,
      assignee,
      priority,
      status,
    },
  });

  // Effect to display form errors
  useEffect(() => {
    if (type === "edit") return;
    // Check if there are any errors in the form state
    if (Object.keys(errors).length > 0) {
      for (const key in errors) {
        toast.error(errors[key].message);
      }
    }
    // Dispatching only when there are no errors
    dispatch(mutateData());
  }, [Object.keys(errors).length === 0]);

  // Function to handle form submission
  const onSubmit = (data) => {
    data.startDate = data.startDate.toISOString();

    if (type === "edit") {
      dispatch(editTask(JSON.stringify(data)));
      dispatch(toggleEditFormStatus());
    } else if (type === "create") {
      dispatch(createTask(JSON.stringify(data)));
    }

    toast.success("Task Created");
    reset();
    dispatch(mutateData());
  };

  // Function to handle form errors
  function handleFormError() {
    if (type !== "edit") {
      for (const key in errors) {
        toast.error(errors[key].message);
      }
    }
  }
  // close the form once clicked on icon to remove
  function closeForm() {
    if (type === "edit") {
      // close the edit form
      dispatch(toggleEditFormStatus());
    } else {
      // close the create form
      dispatch(toggleCreateFormStatus());
    }
  }
  // Function to reset the form
  const onReset = () => {
    reset();
  };

  const statusValue = watch("status"); // watch it, if status changed to "completed" then we need end date

  const HEADER =
    (type === "create" && "Create Task") || (type === "edit" && "Edit Task");

  const isDisble = type === "edit" && currentSelectedId === currentTask[0]?.id;

  return (
    <div className="fixed bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-[100vw] min-h-[100vh] flex justify-center items-center  z-1000 bg-gray_opacity z-[1000]">
      <div className="w-[360px]  border flex flex-col ">
        <h1 className="text-center bg-white py-2 w-full flex items-center justify-between px-4 font-semibold ">
          <span>{HEADER}</span>{" "}
          <span className="border rounded-full p-1 cursor-pointer">
            <HiMiniXMark
              className="stroke-1 cursor-pointer"
              onClick={() => {
                closeForm();
              }}
            />
          </span>
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex  flex-col items-center justify-between gap-3 pt-5 bg-gradient-to-r from-pink-200 to-blue-200"
        >
          <div className="form">
            <label htmlFor="title">Title :</label>
            <input
              type="text"
              {...register("title", {
                required: {
                  value: type === "create" ? true : false,

                  minLength: 3,
                  message: "Required Title",
                },
              })}
              defaultValue={type === "edit" ? currentTask[0]?.title : ""}
              id="title"
              aria-invalid={errors.title ? "true" : "false"}
              className="form-input"
              disabled={isDisble}
            />
          </div>

          <div className="form">
            <label htmlFor="description">Description</label>
            <textarea
              rows="2"
              type="text"
              {...register("description", {
                required: {
                  value: type === "create" ? true : false,
                  minLength: 3,
                  message: "Required Description",
                },
              })}
              id="description"
              aria-invalid={errors.description ? "true" : "false"}
              className=" resize-none outline-none bg-gray_hard"
              defaultValue={type === "edit" ? currentTask[0]?.description : ""}
              disabled={isDisble}
            />
          </div>

          <div className="form">
            <label htmlFor="team">Team</label>
            <input
              type="text"
              {...register("team", {
                required: {
                  value: type === "create" ? true : false,
                  defaultValue: type === "edit" ? currentTask[0]?.team : "",
                  minLength: 3,
                  message: "Required Team Name",
                },
              })}
              id="team"
              className="form-input"
              defaultValue={type === "edit" ? currentTask[0]?.team : ""}
              disabled={isDisble}
            />
          </div>

          <div className="form">
            <label htmlFor="assignee">Assignee</label>
            <input
              type="text"
              {...register("assignee", {
                required: {
                  value: type === "create" ? true : false,
                  defaultValue: type === "edit" ? currentTask[0]?.assignee : "",
                  minLength: 3,
                  message: "Required Assignee Name",
                },
              })}
              id="assignee"
              className="form-input"
              defaultValue={type === "edit" ? currentTask[0]?.assignee : ""}
              disabled={isDisble}
            />
          </div>

          <div className="flex w-full px-2 gap-2 justify-between mt-2">
            <div className="flex gap-2 items-center">
              <label>Priority</label>
              <select
                {...register("priority", {
                  required: {
                    value: false,
                    defaultValue: priority,
                  },
                })}
                className="w-[60px] p-1 form-input"
              >
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
            </div>
            <div className="flex justify-between items-center gap-2">
              <label>Status</label>
              <select
                {...register("status", {
                  required: {
                    value: false,
                    defaultValue: "Assign",
                  },
                })}
                className="w-[130px] p-1 form-input"
              >
                {type === "create" ? ( // Check if type is "create"
                  <option value="Assign">Assign</option>
                ) : (
                  // Render all options if type is not "create"
                  <>
                    <option value="Assign">Assign</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Deployed">Deployed</option>
                    <option value="Deferred">Deferred</option>
                  </>
                )}
              </select>
            </div>
          </div>
          {/* Conditionally render endDate field based on status */}
          {statusValue === "Completed" && (
            <div className="flex w-full mt-2 p-1 items-center gap-2">
              <label htmlFor="endDate">End Date</label>
              <Controller
                name="endDate"
                control={control}
                defaultValue={new Date()}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="yyyy-MM-dd"
                    className="w-[120px] pl-2 py-1"
                  />
                )}
              />
            </div>
          )}

          <div className="hidden">
            <Controller
              name="startDate"
              control={control}
              defaultValue={
                type === "edit" && currentTask.length > 0
                  ? new Date(currentTask[0]?.startDate)
                  : new Date()
              }
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="yyyy-MM-dd"
                />
              )}
            />

            <input type="hidden" {...register("id")} value={id} />
          </div>

          <div className="flex justify-end gap-5 w-full  px-5 bg-white py-3">
            <button
              type="submit"
              onClick={handleFormError}
              className="bg-blue-800 p-2 px-3 text-white font-medium rounded-md"
            >
              {type === "edit" ? "Edit" : "Submit"}
            </button>
            <button
              type="reset"
              onClick={onReset}
              className="bg-slate-400 p-2 px-3 text-white font-medium rounded-md"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateForm;
