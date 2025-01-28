import React, { useEffect } from "react";

export interface FilterButtonProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton = ({ name, isActive, onClick }: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm ${
        isActive
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {name}
    </button>
  );
};

export default FilterButton;
