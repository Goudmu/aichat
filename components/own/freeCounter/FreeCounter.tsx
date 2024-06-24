"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MAX_FREE_COUNTS } from "@/constants";
import { useProModal } from "@/hooks/use-pro-modal";
import { Zap } from "lucide-react";
import React, { useEffect, useState } from "react";

interface FreeCounterProps {
  apiLimitCount: number | undefined;
}

const FreeCounter = ({ apiLimitCount = 0 }: FreeCounterProps) => {
  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return;
  }

  return (
    <div className="px-3">
      <Card className=" bg-white/10 border-0">
        <CardContent className=" py-6">
          <div className=" text-center text-sm text-white mb-4 space-y-4">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free AI Generations
            </p>
            <Progress
              className=" h-3"
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button
            onClick={proModal.onOpen}
            className=" w-full"
            variant="upgrade"
          >
            Upgrade
            <Zap className=" w-4 h-4 fill-white ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
