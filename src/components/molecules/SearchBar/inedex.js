import Button from "@/components/atoms/Button";
import Icons from "@/components/atoms/Icons";
import { useState } from "react";

const SearchBar = ({ handleSearchChange, handleSearchSubmit, search }) => {
  return (
    <form
      onSubmit={handleSearchSubmit}
      className="mt-2 md:mt-0 flex items-center space-x-2 w-full md:w-auto"
    >
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search students..."
        className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <Icons.Search />
      </button>
    </form>
  );
};

export default SearchBar;
