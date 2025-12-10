// import { NextResponse } from "next/server";
// import { Clerk } from "@clerk/backend";

// const clerk = Clerk({
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

//     // 👇 This WORKS — backend SDK supports sessions.create()
//     const session = await clerk.sessions.create({
//       userId: clerkId,
//     });

//     console.log("✔️ Session created:", session);
//     console.log("sesion created:", session);
    
//     const ses

//     return NextResponse.json({
//       sessionToken: session.token,
//     });
//   } catch (error: any) {
//     console.error("🔥 ERROR:", error);
//     return NextResponse.json(
//       { error: error.message || "Server error" },
//       { status: 500 }
//     );
//   }
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
//       return NextResponse.json(
//         { error: "Missing clerkId" },
//         { status: 400 }
//       );
//     }

//     // ⭐ WORKING IMPERSONATION TOKEN API
//     const token = await clerk.userTokens.issue({
//       userId: clerkId,
//       sessionDuration: 3600, // 1 hour
//     });

//     console.log("✔️ Impersonation token created");

//     return NextResponse.json({
//       token: token.token, // return the actual usable string
//     });

//   } catch (error: any) {
//     console.error("🔥 ERROR impersonating:", error);
//     return NextResponse.json(
//       { error: error.message || "Server error" },
//       { status: 500 }
//     );
//   }
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

//     // ✅ Create a new session for the target user
//     const session = await clerk.sessions.create({
//       userId: clerkId,
//       sessionDurationMinutes: 60, // 1 hour session
//     });

//     console.log("✔️ Session created:", session);

//     return NextResponse.json({
//       sessionToken: session.id, // send session id to frontend
//     });
//   } catch (error: any) {
//     console.error("🔥 ERROR impersonating:", error);
//     return NextResponse.json(
//       { error: error.message || "Server error" },
//       { status: 500 }
//     );
//   }
// // }

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

//     // ✅ Create a user token for impersonation
//     const token = await clerk.userTokens.issue({
//       userId: clerkId,
//       sessionDurationMinutes: 60, // 1 hour
//     });

//     console.log("✔️ Impersonation token created");

//     return NextResponse.json({
//       sessionToken: token.token, // return token for frontend login
//     });
//   } catch (error: any) {
//     console.error("🔥 ERROR impersonating:", error);
//     return NextResponse.json(
//       { error: error.message || "Server error" },
//       { status: 500 }
//     );
//   }
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

//     // ✅ Generate a Sign-in token (impersonation)
//     const tokenData = await clerk.users.createSignInToken(clerkId);

//     console.log("✔️ Sign-in token created:", tokenData);

//     return NextResponse.json({
//       sessionToken: tokenData.token, // use this in frontend redirect
//     });

//   } catch (error: any) {
//     console.error("🔥 ERROR impersonating:", error);
//     return NextResponse.json(
//       { error: error.message || "Server error" },
//       { status: 500 }
//     );
// //   }


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

//     // ✅ Issue a user token for impersonation (1 hour)
//     const token = await clerk.userTokens.issue({
//       userId: clerkId,
//       sessionDurationMinutes: 60, // 1 hour
//     });

//     console.log("✔️ Impersonation token created:", token.token);

//     return NextResponse.json({
//       sessionToken: token.token, // Frontend me redirect me use karenge
//     });

//   } catch (error: any) {
//     console.error("🔥 ERROR impersonating:", error);
//     return NextResponse.json(
//       { error: error.message || "Server error" },
//       { status: 500 }
//     );
//   }
// }

// // File: src/app/api/admin/impersonate/route.ts

// import { NextResponse } from "next/server";
// import { createClerkClient } from "@clerk/backend";

// // ✅ Initialize Clerk client with secret key
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

//     // ✅ Generate impersonation token (1-hour session)
//     const { token } = await clerk.users.createToken({
//       userId: clerkId,
//       sessionDurationMinutes: 60, // 1 hour
//     });

//     console.log("✔️ Impersonation token created:", token);

//     // ✅ Return token to frontend
//     return NextResponse.json({
//       userToken: token, // frontend me /sign-in?userToken=token ke liye use
//     });

//   } catch (error: any) {
//     console.error("🔥 ERROR impersonating:", error);
//     return NextResponse.json(
//       { error: error.message || "Server error" },
//       { status: 500 }
//     );
//   }
// // }

// import { NextResponse } from "next/server";
// import Clerk from "@clerk/backend"; // default import, no createClerkClient

// // Initialize Clerk with your secret key
// const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY! });

// export async function POST(req: Request) {
//   try {
//     const { clerkId } = await req.json();

//     if (!clerkId) {
//       return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
//     }

//     console.log("➡️ /api/admin/impersonate HIT");
//     console.log("➡️ clerkId:", clerkId);

//     // ✅ Generate a sign-in token for impersonation
//     const { token } = await clerk.users.createSignInToken({
//       userId: clerkId,
//       expiresInSeconds: 3600, // 1 hour
//     });

//     console.log("✔️ Sign-in token created:", token);

//     return NextResponse.json({
//       sessionToken: token, // send this to frontend for redirect
//     });
//   } catch (error: any) {
//     console.error("🔥 ERROR impersonating:", error);
//     return NextResponse.json(
//       { error: error.message || "Server error" },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";
// import Clerk from "@clerk/backend"; // default import, no createClerkClient

// // Initialize Clerk with your secret key
// const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY! });

// export async function POST(req: Request) {
//   try {
//     const { clerkId } = await req.json();

//     if (!clerkId) {
//       return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
//     }

//     console.log("➡️ /api/admin/impersonate HIT");
//     console.log("➡️ clerkId:", clerkId);

//     // ✅ Generate a sign-in token for impersonation
//     const { token } = await clerk.users.createSignInToken({
//       userId: clerkId,
//       expiresInSeconds: 3600, // 1 hour
//     });

//     console.log("✔️ Sign-in token created:", token);

//     return NextResponse.json({
//       sessionToken: token, // send this to frontend for redirect
//     }); 
//   } catch (error: any) {
//     console.error("🔥 ERROR impersonating:", error);
//     return NextResponse.json(
//       { error: error.message || "Server error" },
//       { status: 500 }NZ
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import Clerk from "@clerk/backend"; // default import

// const clerk = new Clerk({
//   secretKey: process.env.CLERK_SECRET_KEY!,
// });

// export async function POST(req: Request) {
//   try {
//     const { clerkId } = await req.json();

//     if (!clerkId) {
//       return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
//     }

//     // Generate sign-in token for impersonation
//     const { token } = await clerk.users.createSignInToken({
//       userId: clerkId,
//       expiresInSeconds: 3600, // 1 hour
//     });

//     return NextResponse.json({
//       sessionToken: token,
//     });
//   } catch (error: any) {
//     console.error("ERROR impersonating:", error);
//     return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
//   }
// }





// import { NextResponse } from "next/server";
// import { createClerkClient } from "@clerk/backend";

// const clerk = createClerkClient({
//   secretKey: process.env.CLERK_SECRET_KEY!,
// });

// export async function POST(req: Request) {
//   try {
//     const { clerkId } = await req.json();

//     if (!clerkId) {
//       return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
//     }

//     // Generate sign-in token for impersonation
//     const tokenResponse = await clerk.signInTokens.createSignInToken({
//       userId: clerkId,
//       expiresInSeconds: 3600, // 1 hour session
//     });

//     return NextResponse.json({
//       token: tokenResponse.token,
//     });
//   } catch (error: any) {
//     console.error("ERROR impersonating:", error);
//     return NextResponse.json(
//       { error: error.message || "Server error" },
//       { status: 500 }
//     );
//   }
// }










// import { NextResponse } from "next/server";
// import { createClerkClient } from "@clerk/backend";

// const clerk = createClerkClient({
//   secretKey: process.env.CLERK_SECRET_KEY!,
// });

// export async function POST(req: Request) {
//   try {
//     const { clerkId } = await req.json();

//     if (!clerkId) {
//       return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
//     }

//     // Generate sign-in token
//     const token = await clerk.signInTokens.createSignInToken({
//       userId: clerkId,
//       expiresInSeconds: 3600,
//     });

//     return NextResponse.json({
//       token: token.token,
//     });
//   } catch (error: any) {
//     console.error("ERROR impersonating:", error);
//     return NextResponse.json(
//       { error: error.message || "Server error" },
//       { status: 500 }
//     );
//   }
// }







// import { NextResponse } from "next/server";
// import { createClerkClient } from "@clerk/backend";

// const clerk = createClerkClient({
//   secretKey: process.env.CLERK_SECRET_KEY!,
// });

// export async function POST(req: Request) {
//   try {
//     const { clerkId } = await req.json();

//     if (!clerkId) {
//       return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
//     }

//     // Generate Sign-In Token
//     const tokenData = await clerk.signInTokens.createSignInToken({
//       userId: clerkId,
//       expiresInSeconds: 3600, // optional
//     });

//     return NextResponse.json({
//       token: tokenData.token,
//     });

//   } catch (error: any) {
//     console.error("ERROR impersonating:", error);
//     return NextResponse.json(
//       { error: error.message || "Server error" },
//       { status: 500 }
//     );
//   }
// }







// import { NextResponse } from "next/server";
// import { createClerkClient } from "@clerk/backend";

// const clerk = createClerkClient({
//   secretKey: process.env.CLERK_SECRET_KEY!,
// });

// export async function POST(req: Request) {
//   try {
//     const { userId } = await req.json();

//     // Example: get user info
//     const user = await clerk.users.getUser(userId);

//     return NextResponse.json({ success: true, user });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }
// }





// import { NextResponse } from "next/server";
// import { createClerkClient } from "@clerk/backend";

// const clerk = createClerkClient({
//   secretKey: process.env.CLERK_SECRET_KEY!,
// });

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     console.log("Request Body:", body);

//     const { userId } = body;

//     if (!userId) {
//       return NextResponse.json(
//         { error: "Missing userId" },
//         { status: 400 }
//       );
//     }

//     // Example impersonation (or whatever you are doing)
//     const session = await clerk.sessions.create({
//       userId,
//     });

//     return NextResponse.json({ success: true, session });
//   } catch (error: any) {
//     console.error("IMPERSONATE ERROR:", error);
//     return NextResponse.json(
//       { error: error.message || "Unknown server error" },
//       { status: 500 }
//     );
//   }
// }






// import { NextResponse } from "next/server";
// import { createClerkClient } from "@clerk/backend";

// const clerk = createClerkClient({
//   secretKey: process.env.CLERK_SECRET_KEY!,
// });

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     console.log("Request Body:", body);

//     // 👇 clerkId ko accept karo
//     const { clerkId } = body;

//     if (!clerkId) {
//       return NextResponse.json(
//         { error: "Missing clerkId" },
//         { status: 400 }
//       );
//     }

//     // 👇 clerkId hi userId hai Clerk me
//     const session = await clerk.sessions.create({
//       userId: clerkId,
//     });

//     return NextResponse.json({ success: true, session });
//   } catch (error: any) {
//     console.error("IMPERSONATE ERROR:", error);
//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }
// }









import { NextResponse } from "next/server";
import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request Body:", body);

    const { clerkId } = body;

    if (!clerkId) {
      return NextResponse.json(
        { error: "Missing clerkId" },
        { status: 400 }
      );
    }

    // ✅ Only valid method for impersonation
    const { token } = await clerk.signInTokens.createSignInToken({
      userId: clerkId,
      expiresInSeconds: 3600,
    });

    return NextResponse.json({
      success: true,
      token,
    });
  } catch (error: any) {
    console.error("IMPERSONATE ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
