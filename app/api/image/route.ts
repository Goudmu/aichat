import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.PUBLIC_OPENAI_API_KEY,
  baseURL: "https://api.pawan.krd/gpt-3.5-unfiltered/v1",
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompts are null", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount are null", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resolution are null", { status: 400 });
    }

    const res = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    return NextResponse.json(res.data[0].url);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
