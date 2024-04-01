import React from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";

import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Form from "./components/Form";
import Delete from "./utils/Delete";

const App = () => {
  const { createFormStatus, editFormStatus, currentDeleteStatus } = useSelector(
    (state) => state.tasks
  );
  return (
    <div className=" min-h-[100dvh] w-[100dvw] bg-gradient-to-r from-pink-200 to-blue-200  ">
      <div className="flex flex-col w-[95dvw] sm:w-[90dvw] m-auto gap-8">
        <NavBar />
        <Main />
        {createFormStatus && <Form type="create" />}
        {editFormStatus && <Form type="edit" />}
        {currentDeleteStatus && <Delete />}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            success: {
              duration: 1500,
            },
            error: {
              duration: 2000,
            },
            style: {
              fontSize: "16px",
              width: `320px`,
              padding: "16px 24px",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </div>
    </div>
  );
};

export default App;
