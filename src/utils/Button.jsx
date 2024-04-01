import React from "react";

function Button({ type, handleClick, children, width }) {
  return (
    <div>
      <button
        className={` bg-blue-600 py-2 px-2 text-slate-200 rounded-md inline-block`}
        style={{ width: `${width}` }}
        onClick={handleClick}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
