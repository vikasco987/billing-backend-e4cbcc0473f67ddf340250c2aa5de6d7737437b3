"use client";

import { setActive } from "@clerk/nextjs";

export async function loginAsUser(clerkId: string) {
  const res = await fetch("/api/admin/impersonate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clerkId }),
  });

  const { sessionToken } = await res.json();

  await setActive({ session: sessionToken });
  window.location.href = "/dashboard";
}
