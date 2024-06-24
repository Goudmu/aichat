"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";

interface MobileSideBarProps {
  apiLimitCount: number | undefined;
}

const MobileSideBar = ({ apiLimitCount = 0 }: MobileSideBarProps) => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className=" md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
