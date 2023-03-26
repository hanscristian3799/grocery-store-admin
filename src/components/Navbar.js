import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Tooltip from "./Tooltip";

const Navbar = () => {
  return (
    <div className="flex flex-row justify-between items-center p-3 px-8 bg-white shadow-md">
      <p className="text-lg font-bold text-[#159895]">GroceryStoreAdmin</p>
      <div>
        <Tooltip text='Hans Cristian'>
          <UserCircleIcon className="h-8 w-8 text-[#159895]" />
        </Tooltip>
      </div>
    </div>
  );
};

export default Navbar;
