/* eslint-disable react/no-unknown-property */
import React, { useEffect, useLayoutEffect, useState } from "react";
import Button from "../utils/Button";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RiCalendarEventLine } from "react-icons/ri";
import CustomDropdown from "../utils/CustomDropdown";
import StatusCard from "../utils/StatusCard";
import { StausColumns, priorityOptions, sortOption } from "../utils/helper";
import { useDispatch } from "react-redux";
import {
  filterData,
  mutateData,
  setSortOption,
  toggleCreateFormStatus,
} from "./slice/taskSlice";

function Main() {
  //*--------> Filter States
  const [assigneeName, setAssigneeName] = useState("");
  const [selectedPriorityOption, setSelectedPriorityOption] = useState(
    priorityOptions[0]
  );

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  //*--------> Sort State
  const [selectedSortOption, setSelectedSortOption] = useState(sortOption[0]);

  // Dispatch Hook from Redux
  const disptach = useDispatch();

  useEffect(() => {
    disptach(
      filterData([
        {
          filterAssignee: assigneeName,
          filterPriority:
            selectedPriorityOption === "Priority" ? "" : selectedPriorityOption,
          filterStartDate: startDate ? startDate.toISOString() : "",
          filterEndDate: endDate ? endDate.toISOString() : "",
        },
      ])
    );
    disptach(setSortOption(selectedSortOption));
    disptach(mutateData()); // It will filter the data and assign them to their respective columnz
  }, [
    assigneeName,
    selectedPriorityOption,
    startDate,
    endDate,
    selectedSortOption,
  ]);

  return (
    <main className=" flex flex-col gap-10 border-2 border-gray_hard p-5 rounded-md ">
      <div className="flex flex-col md:flex-row justify-center sm:items-center sm:justify-between  min-h-[2rem] gap-y-5">
        <div className="flex flex-col xl:flex-row justify-start sm:justify-center gap-5 h-full">
          <h1 className="font-medium text-lg w-[5rem] flex justify-between items-center">
            <span>Filter By</span> <span>:</span>
          </h1>
          <div className="flex items-center gap-5">
            <input
              type="text"
              placeholder="Assignee Name"
              className="w-[10rem] sm:w-[15rem] h-[2rem] px-2 bg-gray_hard  text-gray-400 outline-none font-medium rounded-md py-[1.2rem]"
              value={assigneeName}
              onChange={(e) => setAssigneeName(e.target.value)}
            />
            <CustomDropdown
              options={priorityOptions}
              selectedOption={selectedPriorityOption}
              setSelectedOption={setSelectedPriorityOption}
              className="text-gray-200 h-full rounded-sm "
            />
          </div>
          <div className=" relative  flex items-center justify-between max-w-[300px]   bg-gray_hard px-2 gap-[-1rem] ">
            <div className="">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                className="origin-bottom-right w-[100px] outline-none cursor-pointer text-gray-400 font-medium bg-gray_hard  align-left  h-full py-2
              "
                placeholderText="DD/MM/YYY"
                popperPlacement="bottom-start"
              />
            </div>
            <span className="h-full font-bold text-xl flex items-center text-gray-400">
              &minus;
            </span>
            <div>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                className="w-[100px]  outline-none m-0 p-0 cursor-pointer bg-gray_hard text-gray-400 font-medium ml-2 h-full py-2"
                placeholderText="DD/MM/YYY"
              />
            </div>
            <RiCalendarEventLine className="h-full w-[1.1rem] text-gray-400 stroke-[0.5px]" />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button
            width={"15rem"}
            handleClick={() => {
              disptach(toggleCreateFormStatus());
            }}
          >
            Add New Task
          </Button>
        </div>
      </div>
      <div className="flex flex-col  sm:flex-row gap-5">
        <label className="font-medium text-lg w-[5rem] flex justify-between items-center">
          <span>Sort By</span> <span>:</span>
        </label>
        <CustomDropdown
          options={sortOption}
          selectedOption={selectedSortOption}
          setSelectedOption={setSelectedSortOption}
          className="text-gray-200 h-full rounded-sm "
          popperPlacement="bottom-start"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 justify-center w-full min-h-[60vh] ">
        {StausColumns.map((task, index) => (
          <StatusCard key={index} taskName={task} />
        ))}
      </div>
    </main>
  );
}

export default Main;
