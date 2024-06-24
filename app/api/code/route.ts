import { checkApiLimit, increateApiLimit } from "@/lib/apiLimit";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.PUBLIC_OPENAI_API_KEY,
  baseURL: "https://api.pawan.krd/gpt-3.5-unfiltered/v1",
});

const instructionMessage: ChatCompletionMessageParam = {
  role: "system",
  content:
    "You are a code generation. You have to answer only in markdown code snippets. Use code comments for explanations",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Messages are null", { status: 400 });
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse("Free trial has expired", { status: 403 });
    }

    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    await increateApiLimit();

    return NextResponse.json(res.choices[0].message);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
