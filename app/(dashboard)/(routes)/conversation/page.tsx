"use client";
import React, { useState } from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Heading from "@/components/own/heading/heading";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare } from "lucide-react";
import axios from "axios";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { EmptyComponent } from "@/components/own/empty/empty";
import { LoadingComponent } from "@/components/own/loading/loading";
import { cn } from "@/lib/utils";

import UserAvatar from "@/components/own/avatar/user-avatar";
import BotAvatar from "@/components/own/avatar/bot-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import Typewriter from "typewriter-effect";

const ConversationPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const res = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((cur) => [...cur, userMessage, res.data]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status == 403) {
        proModal.onOpen();
      }
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Conversation Models"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className=" px-4 lg:px-8 ">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className=" col-span-12 lg:col-span-10">
                    <FormControl className=" m-0 p-0">
                      <Input
                        disabled={isLoading}
                        placeholder="Give me html, css, and javascript"
                        {...field}
                        className=" border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className=" col-span-12 md:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className=" space-y-4 mt-10">
          {isLoading && (
            <div className=" p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <LoadingComponent />
            </div>
          )}
          {messages.length == 0 && !isLoading && (
            <div>
              <EmptyComponent label="No Conversation Started" />
            </div>
          )}
          <div className=" flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => {
              if (message.content != undefined) {
                return (
                  <div
                    key={index}
                    className={cn(
                      "p-8 w-full flex items-start gap-x-8 rounded-lg",
                      message.role === "user"
                        ? "bg-white border border-black/10"
                        : "bg-muted"
                    )}
                  >
                    {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                    {message.role === "user" ? (
                      <p className=" text-sm">{String(message.content)}</p>
                    ) : (
                      <Typewriter
                        options={{
                          strings: String(message.content),
                          autoStart: true,
                          delay: 10,
                        }}
                      />
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
