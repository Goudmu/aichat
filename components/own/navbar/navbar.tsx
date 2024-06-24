import { UserButton } from "@clerk/nextjs";
import React from "react";
import MobileSideBar from "../sidebar/mobile-sidebar";
import { getApiLimitCount } from "@/lib/apiLimit";

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  return (
    <div className=" flex items-center p-4">
      <MobileSideBar apiLimitCount={apiLimitCount} />
      <div className=" flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
