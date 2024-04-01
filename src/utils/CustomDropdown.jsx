import React, { useState, useRef, useEffect } from "react";
import { TiArrowSortedDown } from "react-icons/ti";

function CustomDropDown({ options, selectedOption, setSelectedOption }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative inline-block text-left min-w-[130px] max-w-[300px]"
      ref={dropdownRef}
    >
      <div>
        <button
          type="button"
          className="flex justify-between gap-5 w-full rounded-md bg-gray_hard px-4 py-2 text-md font-medium shadow-sm focus:outline-none text-slate-400"
          onClick={handleToggleDropdown}
        >
          {selectedOption}
          <TiArrowSortedDown className=" h-[1.5rem] w-[1.5rem]" />
        </button>
      </div>
      {isOpen && (
        <div
          className="origin-bottom-left absolute right-0 mt-2 rounded-md shadow-lg bg-gray_hard ring-1 ring-black ring-opacity-5 focus:outline-none z-[1000] px-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {options.map((option, index) => (
              <div
                key={index}
                className="block px-4 py-2 text-sm text-gray-400 font-medium text-md hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                onClick={() => handleOptionClick(option)}
                role="menuitem"
              >
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomDropDown;
