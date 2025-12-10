// "use client";

// export default function AdminUsersPage() {

//   async function loginAsUser(clerkId: string) {
//     try {
//       const res = await fetch("/api/admin/impersonate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ clerkId }),
//       });

//       const data = await res.json();

//       if (!data.token) {
//         alert("Failed to generate impersonation token");
//         return;
//       }

//       // 🔥 Clerk Client method to login using token
//       // @ts-ignore
//       await window.Clerk?.client?.loginWithToken(data.token);

//       // Refresh to apply session
//       window.location.href = "/";
//     } catch (e) {
//       console.error("Error:", e);
//     }
//   }

//   return (
//     <div>
//       <h1>Admin Users Page</h1>

//       <button
//         onClick={() => loginAsUser("user_36EsI8gKyUZ3b5SvrGL6lDuJ1sN")}
//         style={{ padding: 10, background: "green", color: "white" }}
//       >
//         Login as Ram Yadav
//       </button>
//     </div>
//   );
// }


// "use client";

// export default function AdminUsersPage() {
//   async function loginAsUser(clerkId: string) {
//     try {
//       const res = await fetch("/api/admin/impersonate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ clerkId }),
//       });

//       const data = await res.json();

//       if (!data.signInLink) {
//         alert("Failed to get sign-in link");
//         return;
//       }

//       // Redirect to sign-in link
//       window.location.href = data.signInLink;
//     } catch (e) {
//       console.error("Error:", e);
//     }
//   }

//   return (
//     <div>
//       <h1>Admin Users Page</h1>
//       <button
//         onClick={() => loginAsUser("user_36EsI8gKyUZ3b5SvrGL6lDuJ1sN")}
//         style={{ padding: 10, background: "green", color: "white" }}
//       >
//         Login as Ram Yadav
//       </button>
//     </div>
//   );
// // }

// "use client";

// export default function AdminUsersPage() {
//   async function loginAsUser(clerkId: string) {
//     try {
//       const res = await fetch("/api/admin/impersonate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ clerkId }),
//       });

//       const data = await res.json();

//       if (!data.sessionToken) {
//         alert("Failed to get session token");
//         return;
//       }

//       // Redirect to Clerk sign-in page using session token
//       window.location.href = `/sign-in?session=${data.sessionToken}`;
//     } catch (e) {
//       console.error("Error:", e);
//     }
//   }

//   return (
//     <div>
//       <h1>Admin Users Page</h1>
//       <button
//         onClick={() => loginAsUser("user_36EsI8gKyUZ3b5SvrGL6lDuJ1sN")}
//         style={{ padding: 10, background: "green", color: "white" }}
//       >
//         Login as Ram Yadav
//       </button>
//     </div>
//   );
// }




// import { NextResponse } from "next/server";
// import { createClerkClient } from "@clerk/backend";

// const clerk = createClerkClient({
//   secretKey: process.env.CLERK_SECRET_KEY!,
// });

// export async function POST(req: Request) {
//   try {
//     const { clerkId } = await req.json();

//     console.log("➡️ /api/admin/impersonate HIT");
//     console.log("➡️ clerkId:", clerkId);

//     if (!clerkId) {
//       return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
//     }

//     // ✅ Generate a sign-in token for the user
//     const { token } = await clerk.users.createSignInToken(clerkId);

//     if (!token) {
//       return NextResponse.json(
//         { error: "Failed to generate sign-in token" },
//         { status: 500 }
//       );
//     }

//     console.log("✔️ Sign-in token created:", token);

//     return NextResponse.json({
//       sessionToken: token,
//     });
//   } catch (error: any) {
//     console.error("🔥 ERROR impersonating:", error);
//     return NextResponse.json(
//       { error: error.message || "Server error" },
//       { status: 500 }
//     );
//   }
// }

// "use client"; // ✔ Must be at the top

// import React from "react";

// export default function AdminUsersPage() {
//   async function loginAsUser(clerkId: string) {
//     try {
//       const res = await fetch("/api/admin/impersonate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ clerkId }),
//       });

//       const data = await res.json();

//       if (!data.sessionToken) {
//         alert("Failed to get session token");
//         return;
//       }

//       // Redirect to Clerk sign-in page with token
//       window.location.href = `/sign-in?session=${data.sessionToken}`;
//     } catch (e) {
//       console.error("Error:", e);
//     }
//   }

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Admin Users Page</h1>
//       <button
//         onClick={() => loginAsUser("user_36EsI8gKyUZ3b5SvrGL6lDuJ1sN")}
//         style={{ padding: 10, background: "green", color: "white", border: "none", borderRadius: 5 }}
//       >
//         Login as Ram Yadav
//       </button>
//     </div>
//   );
// }


// "use client";

// import React from "react";

// export default function AdminUsersPage() {
//   async function loginAsUser(clerkId: string) {
//     try {
//       const res = await fetch("/api/admin/impersonate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ clerkId }),
//       });

//       const data = await res.json();

//       if (!data.sessionToken) {
//         alert("Failed to get session token");
//         return;
//       }

//       // Redirect to Clerk sign-in with token
//       window.location.href = `/sign-in?session=${data.sessionToken}`;
//     } catch (e) {
//       console.error("Error:", e);
//     }
//   }

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Admin Users Page</h1>
//       <button
//         onClick={() => loginAsUser("user_36EsI8gKyUZ3b5SvrGL6lDuJ1sN")}
//         style={{ padding: 10, background: "green", color: "white", borderRadius: 5 }}
//       >
//         Login as Ram Yadav
//       </button>
//     </div>
//   );
// };

// "use client";

// export default function AdminUsersPage() {
//   async function loginAsUser(clerkId: string) {
//     try {
//       const res = await fetch("/api/admin/impersonate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ clerkId }),
//       });

//       const data = await res.json();

//       if (!data.sessionToken) {
//         alert("Failed to get session token");
//         return;
//       }

//       // Redirect to Clerk sign-in with session token
//       window.location.href = `/sign-in?session=${data.sessionToken}`;
//     } catch (e) {
//       console.error("Error:", e);
//     }
//   }

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Admin Users Page</h1>
//       <button
//         onClick={() => loginAsUser("user_36EsI8gKyUZ3b5SvrGL6lDuJ1sN")}
//         style={{ padding: 10, background: "green", color: "white", borderRadius: 5 }}
//       >
//         Login as Ram Yadav
//       </button>
//     </div>
//   );
// }

// "use client";

// export default function AdminUsersPage() {
//   async function loginAsUser(clerkId: string) {
//     try {
//       const res = await fetch("/api/admin/impersonate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ clerkId }),
//       });

//       const data = await res.json();

//       if (!data.userToken) {
//         alert("Failed to get impersonation token");
//         return;
//       }

//       // ✅ Redirect user to Clerk sign-in with token
//       window.location.href = `/sign-in?userToken=${data.userToken}`;
//     } catch (e) {
//       console.error("Error:", e);
//     }
//   }

//   return (
//     <div>
//       <h1>Admin Users Page</h1>
//       <button
//         onClick={() => loginAsUser("user_36EsI8gKyUZ3b5SvrGL6lDuJ1sN")}
//         style={{ padding: 10, background: "green", color: "white" }}
//       >
//         Login as Ram Yadav
//       </button>
//     </div>
//   );
// }







"use client";

export default function AdminUsersPage() {
  async function loginAsUser(clerkId: string) {
    try {
      const res = await fetch("/api/admin/impersonate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkId }),
      });

      const data = await res.json();

      if (!data.userToken) {
        alert("Failed to get impersonation token: " + data.error);
        return;
      }

      // Clerk expects:  /sign-in#token=VALUE
      window.location.href = `/sign-in#token=${data.userToken}`;
    } catch (e) {
      console.error("Error:", e);
    }
  }

  return (
    <div>
      <h1>Admin Users Page</h1>

      <button
        onClick={() => loginAsUser("user_36EsI8gKyUZ3b5SvrGL6lDuJ1sN")}
        style={{ padding: 10, background: "green", color: "white" }}
      >
        Login as Ram Yadav
      </button>
    </div>
  );
}
