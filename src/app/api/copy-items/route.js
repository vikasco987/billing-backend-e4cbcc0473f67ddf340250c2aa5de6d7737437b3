// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const { fromUserId, toUserId } = await req.json();

//   // 1. Get items from the source user
//   const sourceItems = await prisma.item.findMany({
//     where: { userId: fromUserId },
//   });

//   if (!sourceItems.length) {
//     return NextResponse.json({ message: "No items found to copy" });
//   }

//   // 2. Prepare data without IDs
//   const newItems = sourceItems.map(item => ({
//     name: item.name,
//     price: item.price,
//     description: item.description,
//     userId: toUserId,
//   }));

//   // 3. Bulk insert
//   await prisma.item.createMany({
//     data: newItems,
//   });

//   return NextResponse.json({ message: "Items copied successfully!" });
// // }
// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export function GET() {
//   return NextResponse.json({ message: "GET not allowed" }, { status: 405 });
// }

// export async function POST(req) {
//   try {
//     const { fromUserId, toUserId } = await req.json();

//     const sourceItems = await prisma.item.findMany({
//       where: { userId: fromUserId },
//       select: {
//         name: true,
//         price: true,
//         description: true,
//       }
//     });

//     if (!sourceItems.length) {
//       return NextResponse.json({ message: "No items found to copy" });
//     }

//     const newItems = sourceItems.map(item => ({
//       ...item,
//       userId: toUserId,
//     }));

//     await prisma.item.createMany({ data: newItems });

//     return NextResponse.json({ message: "Items copied successfully!" });

//   } catch (error) {
//     console.error("❌ ERROR:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Prevent GET from causing “immutable” error
export function GET() {
  return NextResponse.json(
    { message: "GET not allowed" },
    { status: 405 }
  );
}

export async function POST(req) {
  try {
    const { fromUserId, toUserId } = await req.json();

    const sourceItems = await prisma.item.findMany({
      where: { userId: fromUserId },
      select: { name: true, price: true, description: true }
    });

    if (!sourceItems.length) {
      return NextResponse.json({ message: "No items found" });
    }

    const newItems = sourceItems.map(item => ({
      ...item,
      userId: toUserId,
    }));

    await prisma.item.createMany({ data: newItems });

    return NextResponse.json({ message: "Items copied successfully!" });

  } catch (error) {
    console.error("❌ ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
