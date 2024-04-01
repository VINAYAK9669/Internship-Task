import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [
      {
        title: "TASK-1",
        description: "Some other description",
        startDate: "2024-04-01T02:55:32.033Z",
        team: "EWRWER",
        assignee: "Assignee A",
        priority: "P0",
        status: "Assign",
        id: "oh89gp-523",
      },
      {
        title: "TASK-2",
        description: "Some other description",
        startDate: "2024-04-02T08:15:00.000Z",
        team: "Team X",
        assignee: "Assignee Y",
        priority: "P1",
        status: "In Progress",
        id: "abc123",
      },
      {
        title: "TASK-3",
        description: "Another description",
        startDate: "2024-04-03T10:30:00.000Z",
        team: "Team Y",
        assignee: "Assignee Z",
        priority: "P2",
        status: "Deployed",
        id: "def456",
      },
      {
        title: "TASK-4",
        description: "Description of task 4",
        startDate: "2024-04-04T12:45:00.000Z",
        team: "Team Z",
        assignee: "Assignee X",
        priority: "P0",
        status: "Assign",
        id: "ghi789",
      },
      {
        title: "TASK-5",
        description: "Description of task 5",
        startDate: "2024-04-05T15:00:00.000Z",
        team: "Team A",
        assignee: "Assignee B",
        priority: "P1",
        status: "In Progress",
        id: "jkl012",
      },
      {
        title: "TASK-6",
        description: "Description of task 6",
        startDate: "2024-04-06T18:15:00.000Z",
        team: "Team B",
        assignee: "Assignee C",
        priority: "P2",
        status: "Deferred",
        id: "mno345",
      },
      {
        title: "TASK-7",
        description: "Some other description",
        startDate: "2024-04-01T02:55:32.033Z",
        team: "EWRWER",
        assignee: "Assignee Z",
        priority: "P1",
        status: "Assign",
        id: "oh89gp-523",
      },
      {
        title: "TASK-8",
        description: "Description of task 6",
        startDate: "2024-04-06T18:15:00.000Z",
        team: "Team B",
        assignee: "Assignee C",
        priority: "P1",
        status: "Deferred",
        id: "mno34568",
      },
      {
        title: "TASK-9",
        description: "Description of task 6",
        startDate: "2024-04-06T18:15:00.000Z",
        team: "Team B",
        assignee: "Assignee H",
        priority: "P0",
        status: "Deferred",
        id: "mno34568kj",
      },
    ],
    status: {
      pending: [],
      progress: [],
      completed: [],
      deployed: [],
      deferred: [],
    },
    createFormStatus: false,
    editFormStatus: false,
    currentDeleteStatus: false,
    filterAssignee: "",
    filterPriority: "",
    filterStartDate: "",
    filterEndDate: "",
    currentTask: [],
    currentSelectedId: "",
    sortOption: "Priority HIGH to LOW",
  },
  reducers: {
    createTask: (state, action) => {
      // Parse the JSON string back into an object
      const newTask = JSON.parse(action.payload);

      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    },
    mutateData: (state) => {
      const {
        tasks,
        filterAssignee,
        filterPriority,
        filterStartDate,
        filterEndDate,
      } = state;

      let filteredTasks = tasks.filter((task) => {
        let meetsAssignee =
          !filterAssignee ||
          task.assignee.toLowerCase().includes(filterAssignee.toLowerCase());

        let meetsPriority = !filterPriority || task.priority === filterPriority;
        let taskStartDate = new Date(task.startDate);
        let taskEndDate = task.endDate ? new Date(task.endDate) : null;
        let filterStartDateObj = new Date(filterStartDate);
        let filterEndDateObj = filterEndDate ? new Date(filterEndDate) : null;

        let isAfterStartDate =
          !filterStartDate || taskStartDate >= filterStartDateObj;
        let isBeforeEndDate =
          !filterEndDate || !taskEndDate || taskEndDate <= filterEndDateObj;

        let isInDateRange = isAfterStartDate && isBeforeEndDate;

        return meetsAssignee && meetsPriority && isInDateRange;
      });

      // SORTING LOGIC
      switch (state.sortOption) {
        case "Priority HIGH to LOW":
          filteredTasks.sort((a, b) => a.priority.localeCompare(b.priority));
          break;
        case "Priority lOW to HIGH":
          filteredTasks.sort((a, b) => b.priority.localeCompare(a.priority));
          break;
        case "Date added (ascending)":
          filteredTasks.sort(
            (a, b) => new Date(a.startDate) - new Date(b.startDate)
          );
          break;
        case "Date added (descending)":
          filteredTasks.sort(
            (a, b) => new Date(b.startDate) - new Date(a.startDate)
          );
          break;
        default:
          break;
      }

      const { pending, progress, completed, deployed, deferred } =
        filteredTasks.reduce(
          (acc, task) => {
            switch (task.status) {
              case "Assign":
                acc.pending.push(task);
                break;
              case "In Progress":
                acc.progress.push(task);
                break;
              case "Completed":
                acc.completed.push(task);
                break;
              case "Deployed":
                acc.deployed.push(task);
                break;
              case "Deferred":
                acc.deferred.push(task);
                break;
              default:
                break;
            }
            return acc;
          },
          {
            pending: [],
            progress: [],
            completed: [],
            deployed: [],
            deferred: [],
          }
        );

      return {
        ...state,
        status: {
          pending,
          progress,
          completed,
          deployed,
          deferred,
        },
      };
    },

    toggleCreateFormStatus: (state) => {
      state.createFormStatus = !state.createFormStatus;
    },
    toggleEditFormStatus: (state) => {
      state.editFormStatus = !state.editFormStatus;
    },
    setIsDeleteSelected: (state) => {
      state.currentDeleteStatus = !state.currentDeleteStatus;
    },

    deleteTask: (state, action) => {
      const { tasks } = state;

      const filteredData = tasks.filter((task) => task.id !== action.payload);
      return {
        ...state,
        tasks: filteredData,
      };
    },
    setCurrentSelectedId: (state, action) => {
      state.currentSelectedId = action.payload;
    },
    getCurrentTaskDetails: (state) => {
      const { tasks } = state;
      const filteredData = tasks.filter(
        (task) => task.id === state.currentSelectedId
      );

      return {
        ...state,
        currentTask: filteredData,
      };
    },
    editTask: (state, action) => {
      const { tasks } = state;
      const newTask = JSON.parse(action.payload);
      const updatedTasks = tasks.map((task) => {
        if (task.id === state.currentSelectedId) {
          const updatedTask = {
            ...task,
            priority: newTask["priority"],
            status: newTask["status"],
          };
          if (newTask["status"] === "Completed") {
            updatedTask.endDate = newTask["endDate"];
          } else {
            // If status is not "Completed", remove endDate if it exists
            delete updatedTask.endDate;
          }
          return updatedTask;
        }
        return task;
      });
      return {
        ...state,
        tasks: updatedTasks,
      };
    },
    filterData: (state, action) => {
      const { filterEndDate, filterStartDate, filterPriority, filterAssignee } =
        action.payload[0]; // Assuming only one set of filters is provided
      // Update state with filter criteria
      return {
        ...state,
        filterEndDate: filterEndDate || "",
        filterStartDate: filterStartDate || "",
        filterPriority: filterPriority || "",
        filterAssignee: filterAssignee || "",
      };
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
  },
});

export const {
  createTask,
  mutateData,
  toggleCreateFormStatus,
  toggleEditFormStatus,
  deleteTask,
  getCurrentTaskDetails,
  setCurrentSelectedId,
  editTask,
  setIsDeleteSelected,
  filterData,
  setSortOption,
} = taskSlice.actions;

export default taskSlice.reducer;
