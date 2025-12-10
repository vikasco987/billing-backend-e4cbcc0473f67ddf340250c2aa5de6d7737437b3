"use client";
import { setActive } from "@clerk/nextjs";

export default function LoginAsUserButton({ clerkId }) {
  async function handleLogin() {
    const res = await fetch("/api/admin/impersonate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clerkId }),
    });

    const { sessionToken } = await res.json();

    await setActive({ session: sessionToken });
    window.location.href = "/dashboard";
  }

  return (
    <button onClick={handleLogin}>
      Login as User
    </button>
  );
}
