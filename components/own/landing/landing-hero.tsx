"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import Typewriter from "typewriter-effect";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className=" text-white font-bold py-36 text-center space-y-5">
      <div className=" text-4xl sm:text-5xl md:text-6xl space-y-5 font-extrabold">
        <h1>The Best AI for Convorsation and Code Generation</h1>
        <div className=" text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
          <Typewriter
            options={{
              strings: ["Chat Bot ???", "Code Generation ???"],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className=" text-sm md:text-xl font-light text-zinc-400">
        AI powered By Chat GPT
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="upgrade"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Start Generation For Free
          </Button>
        </Link>
      </div>
      <div className=" text-zinc-400 text-xs md:text-sm font-normal">
        No Credit Card Required
      </div>
    </div>
  );
};

export default LandingHero;
