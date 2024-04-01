import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./components/slice/taskSlice";

export default configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
