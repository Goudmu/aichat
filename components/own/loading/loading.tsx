import Image from "next/image";
import React from "react";

export const LoadingComponent = () => {
  return (
    <div className=" h-full flex flex-col gap-y-4 items-center justify-center">
      <div className=" w-10 h-10 relative animate-spin">
        <Image alt="loading" fill src="/logo.png" />
      </div>
      <p>AI is thinking Now...</p>
    </div>
  );
};
