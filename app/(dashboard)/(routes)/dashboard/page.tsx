"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div>
      <div className=" mb-8 space-y-4">
        <h2 className=" text-2xl md:text-4xl font-bold text-center">
          Explore The Power of AI
        </h2>
        <p className=" text-muted-foreground font-light text-sm md:text-lg text-center">
          Chat With AI
        </p>
      </div>
      <div className=" px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w8 h-8", tool.color)} />
              </div>
              <div className=" font-semibold">{tool.label}</div>
              <ArrowRight className="w-5 h-5" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
