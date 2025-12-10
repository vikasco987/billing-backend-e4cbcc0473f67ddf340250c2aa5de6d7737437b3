import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { clerkId } = await req.json();

    if (!clerkId) {
      return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
    }

    // Create a session for that user (admin login as user)
    const session = await clerkClient.sessions.createSession({
      userId: clerkId,
    });

    // Return sessionToken
    return NextResponse.json({
      sessionToken: session.sessionToken, // ✔ correct
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
