// import { NextRequest, NextResponse } from "next/server";
// import * as XLSX from "xlsx";
// import { PrismaClient } from "@prisma/client";
// import { connectImagesDb, FoodImageModel } from "@/lib/imagesDb";

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//   console.log("🔥 API HIT — Upload Excel");

//   try {
//     // Ensure MongoDB connected
//     await connectImagesDb();

//     const form = await req.formData();
//     const file = form.get("file") as File;

//     if (!file) {
//       console.log("❌ No file received");
//       return NextResponse.json(
//         { error: "No file uploaded" },
//         { status: 400 }
//       );
//     }

//     console.log("📄 File received:", file.name);

//     // Convert Excel to buffer
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     console.log("📄 Reading Excel...");
//     const workbook = XLSX.read(buffer, { type: "buffer" });
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     let rows: any[] = XLSX.utils.sheet_to_json(sheet);

//     console.log(`📊 Raw Excel rows:`, rows);

//     // 🔥 Normalize headers (IMPORTANT)
//     rows = rows.map((row: any) => {
//       const normalized: any = {};
//       Object.keys(row).forEach((key) => {
//         const cleanKey = key.trim().toLowerCase(); // remove spaces + lowercase
//         normalized[cleanKey] = row[key];
//       });
//       return normalized;
//     });

//     console.log("🟦 Normalized Excel rows:", rows);

//     let insertedItems = [];

//     for (const row of rows) {
//       try {
//         if (!row.name && !row.price && !row.category) {
//           console.log("⚠️ Empty row skipped:", row);
//           continue;
//         }

//         const name = row.name?.toString().trim();
//         const price = Number(row.price);
//         const category = row.category?.toString().trim();

//         if (!name || isNaN(price)) {
//           console.log("⚠️ Skipping invalid row:", row);
//           continue;
//         }

//         console.log(`🔍 Searching image for: ${name}`);

//         // Find matching image in MongoDB
//         const imageDoc = await FoodImageModel.findOne({
//           title: { $regex: new RegExp("^" + name + "$", "i") },
//         });

//         if (!imageDoc) {
//           console.log(`⚠️ No image found for "${name}"`);
//         }

//         // Insert into Prisma DB
//         const newItem = await prisma.items.create({
//           data: {
//             name,
//             price,
//             category,
//             imageUrl: imageDoc?.image_url || null,
//             description: imageDoc?.description || null,
//           },
//         });

//         insertedItems.push(newItem);
//         console.log(`✅ Inserted: ${name}`);

//       } catch (err: any) {
//         console.error("❌ Row Insert Error:", {
//           row,
//           message: err.message,
//           stack: err.stack,
//         });
//       }
//     }

//     console.log("🎉 FINAL INSERTED COUNT:", insertedItems.length);

//     return NextResponse.json({
//       message: "Excel uploaded successfully",
//       inserted: insertedItems.length,
//       items: insertedItems,
//     });

//   } catch (err: any) {
//     console.error("💥 FATAL SERVER ERROR:", {
//       message: err.message,
//       stack: err.stack,
//     });

//     return NextResponse.json(
//       { error: "Internal server error", details: err.message },
//       { status: 500 }
//     );
//   }
// }













// import { NextRequest, NextResponse } from "next/server";
// import * as XLSX from "xlsx";
// import { PrismaClient } from "@prisma/client";
// import { connectImagesDb, FoodImageModel } from "@/lib/imagesDb";

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//   console.log("🔥 API HIT — Upload Excel");

//   try {
//     // CONNECT MONGO DB (Images Database)
//     await connectImagesDb();

//     const form = await req.formData();
//     const file = form.get("file") as File;

//     if (!file) {
//       console.log("❌ No file received");
//       return NextResponse.json(
//         { error: "No file uploaded" },
//         { status: 400 }
//       );
//     }

//     console.log("📄 File received:", file.name);

//     // Convert Excel file
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     console.log("📄 Reading Excel...");
//     const workbook = XLSX.read(buffer, { type: "buffer" });
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     let rows: any[] = XLSX.utils.sheet_to_json(sheet);

//     console.log(`📊 Total rows in Excel: ${rows.length}`);

//     let inserted = 0;
//     let errorRows: any[] = [];

//     for (let row of rows) {
//       if (!row || !row.name) {
//         console.log("⚠️ Skipping empty row");
//         continue;
//       }

//       const name = row.name?.trim();
//       const price = Number(row.price) || 0;
//       const category = row.category?.trim() || "Uncategorized";

//       console.log(`\n🔍 Searching image for: ${name}`);

//       // FIND IMAGE FROM MONGO
//       let imageDoc = null;
//       try {
//         imageDoc = await FoodImageModel.findOne({
//           title: { $regex: new RegExp(name, "i") }
//         });
//       } catch (err) {
//         console.error("❌ MongoDB search error:", err);
//       }

//       const imageUrl = imageDoc?.image_url || "/no-image.png";

//       if (!imageDoc) {
//         console.log(`⚠️ No image found for "${name}"`);
//       } else {
//         console.log(`✅ Image found: ${imageUrl}`);
//       }

//       // INSERT INTO PRISMA
//       try {
//         const created = await prisma.item.create({
//           data: {
//             name: name,
//             price: price,
//             mrp: price,
//             sellingPrice: price,
//             purchasePrice: price,

//             category: category,

//             imageUrl: imageUrl,
//             gallery: [],

//             // DEFAULTS TO PREVENT ERRORS
//             unit: "Piece",
//             clerkId: "DEFAULT_CLERK",
//             categoryId: "000000000000000000000000",
//             userId: "000000000000000000000001",
//           },
//         });

//         inserted++;
//         console.log(`✅ Inserted item: ${created.name}`);
//       } catch (err: any) {
//         console.log("❌ Row Insert Error:", {
//           row,
//           error: err.message,
//         });
//         errorRows.push({ row, error: err.message });
//       }
//     }

//     return NextResponse.json({
//       message: "Excel processed",
//       total: rows.length,
//       inserted,
//       failed: errorRows.length,
//       errorRows,
//     });
//   } catch (err: any) {
//     console.error("💥 FATAL ERROR:", err);
//     return NextResponse.json(
//       { error: "Server error", details: err.message },
//       { status: 500 }
//     );
//   }
// }





// import { NextRequest, NextResponse } from "next/server";
// import * as XLSX from "xlsx";
// import { PrismaClient } from "@prisma/client";
// import { connectImagesDb, FoodImageModel } from "@/lib/imagesDb";

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//   console.log("🔥 Excel API HIT");

//   try {
//     await connectImagesDb();

//     const form = await req.formData();
//     const file = form.get("file") as File;

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const workbook = XLSX.read(buffer, { type: "buffer" });
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     let rows: any[] = XLSX.utils.sheet_to_json(sheet);

//     console.log("📄 Rows:", rows.length);

//     let inserted = 0;
//     let failed = 0;
//     let errorRows: any[] = [];

//     for (let row of rows) {
//       try {
//         if (!row.name || !row.price || !row.category) {
//           console.log("⚠️ Skipping invalid row:", row);
//           failed++;
//           errorRows.push({ row, error: "Missing required fields" });
//           continue;
//         }

//         // ---------------------------------------------------
//         // 1️⃣ Find or Create Category
//         // ---------------------------------------------------
//         const categoryName = String(row.category).trim();

//         let category = await prisma.category.findFirst({
//           where: { name: categoryName },
//         });

//         if (!category) {
//           console.log("➕ Creating new Category:", categoryName);

//           category = await prisma.category.create({
//             data: { name: categoryName },
//           });
//         }

//         // ---------------------------------------------------
//         // 2️⃣ Find Image in MongoDB
//         // ---------------------------------------------------
//         console.log("🔍 Searching image for:", row.name);

//         const img = await FoodImageModel.findOne({
//           title: { $regex: new RegExp(row.name, "i") },
//         });

//         const imageUrl = img ? img.image_url : "/no-image.png";

//         if (!img) console.log("⚠️ No image found for", row.name);

//         // ---------------------------------------------------
//         // 3️⃣ Create Item in Prisma (THE FIX)
//         // ---------------------------------------------------
//         const createdItem = await prisma.item.create({
//           data: {
//             name: row.name,
//             price: Number(row.price),
//             mrp: Number(row.price),
//             sellingPrice: Number(row.price),
//             purchasePrice: Number(row.price),

//             // ⭐ FIXED RELATION — THIS WAS BREAKING YOUR UPLOAD
//             category: {
//               connect: { id: category.id },
//             },

//             imageUrl,
//             gallery: [imageUrl],
//           },
//         });

//         console.log("✅ Inserted:", createdItem.name);
//         inserted++;
//       } catch (err: any) {
//         console.log("❌ Insert Error:", err.message);
//         failed++;
//         errorRows.push({ row, error: err.message });
//       }
//     }

//     return NextResponse.json({
//       message: "Excel processed",
//       total: rows.length,
//       inserted,
//       failed,
//       errorRows,
//     });
//   } catch (err) {
//     console.error("❌ Fatal Error:", err);
//     return NextResponse.json(
//       { error: "Server error", details: String(err) },
//       { status: 500 }
//     );
//   }
// }













// // src/app/api/upload-excel/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import * as XLSX from "xlsx";
// import { PrismaClient } from "@prisma/client";
// import { connectImagesDb, FoodImageModel } from "@/lib/imagesDb";

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//   console.log("🔥 Excel API HIT");

//   try {
//     // connect to MongoDB
//     await connectImagesDb();

//     const form = await req.formData();
//     const file = form.get("file") as File;

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     console.log("📄 File:", file.name);

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const workbook = XLSX.read(buffer, { type: "buffer" });
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     let rows: any[] = XLSX.utils.sheet_to_json(sheet);

//     console.log("📄 Total Rows:", rows.length);

//     let inserted = 0;
//     let failed = 0;
//     let errorRows: any[] = [];

//     for (const row of rows) {
//       try {
//         // REQUIRED FIELDS
//         if (!row.name || !row.category || !row.price) {
//           failed++;
//           errorRows.push({ row, error: "Missing required fields" });
//           continue;
//         }

//         // --------------------------------------
//         // 1️⃣ Find or Create Category
//         // --------------------------------------
//         let category = await prisma.category.findFirst({
//           where: { name: row.category },
//         });

//         if (!category) {
//           category = await prisma.category.create({
//             data: { name: row.category },
//           });

//           console.log("📁 Created Category:", category.name);
//         }

//         // --------------------------------------
//         // 2️⃣ Find Image in MongoDB (Optional)
//         // --------------------------------------
//         let imageUrl = null;

//         const imgDoc = await FoodImageModel.findOne({
//           name: { $regex: new RegExp(`^${row.name}$`, "i") },
//         });

//         if (imgDoc) {
//           imageUrl = imgDoc.url;
//           console.log("🖼 Image Found:", row.name);
//         } else {
//           console.log("⚠️ No Image Found:", row.name);
//         }

//         // --------------------------------------
//         // 3️⃣ Insert Item (MATCHES YOUR SCHEMA)
//         // --------------------------------------
//         const createdItem = await prisma.item.create({
//           data: {
//             name: row.name,
//             price: row.price,
//             mrp: row.price,
//             sellingPrice: row.price,
//             purchasePrice: row.price,

//             imageUrl: imageUrl || null,
//             gallery: imageUrl ? [imageUrl] : [],

//             // REQUIRED FIELDS FROM SCHEMA
//             categoryId: category.id,
//             userId: "677cdcb8dfc8dbd3a088a62e", // CHANGE TO YOUR USER
//             clerkId: "admin", // or dynamic

//             // OPTIONAL FIELDS DEFAULT
//             stock: 0,
//             currentStock: 0,
//             openingStock: 0,
//           },
//         });

//         console.log("✅ Inserted:", createdItem.name);
//         inserted++;
//       } catch (err: any) {
//         console.error("❌ Row Insert Error:", err);

//         failed++;
//         errorRows.push({
//           row,
//           error: err.message || JSON.stringify(err),
//         });
//       }
//     }

//     return NextResponse.json({
//       message: "Excel processed",
//       total: rows.length,
//       inserted,
//       failed,
//       errorRows,
//     });
//   } catch (error) {
//     console.error("❌ FATAL ERROR:", error);
//     return NextResponse.json(
//       { error: "Internal server error", details: `${error}` },
//       { status: 500 }
//     );
//   }
// }














// // src/app/api/upload-excel/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import * as XLSX from "xlsx";
// import { PrismaClient } from "@prisma/client";
// import { connectImagesDb, FoodImageModel } from "@/lib/imagesDb";

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//   console.log("🔥 Excel API HIT");

//   try {
//     // connect to MongoDB
//     await connectImagesDb();

//     const form = await req.formData();
//     const file = form.get("file") as File;

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     console.log("📄 File:", file.name);

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const workbook = XLSX.read(buffer, { type: "buffer" });
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     let rows: any[] = XLSX.utils.sheet_to_json(sheet);

//     console.log("📄 Total Rows:", rows.length);

//     let inserted = 0;
//     let failed = 0;
//     let errorRows: any[] = [];

//     for (const row of rows) {
//       try {
//         // REQUIRED FIELDS
//         if (!row.name || !row.category || !row.price) {
//           failed++;
//           errorRows.push({ row, error: "Missing required fields" });
//           continue;
//         }

//         // --------------------------------------
//         // 1️⃣ Find or Create Category
//         // --------------------------------------
//         let category = await prisma.category.findFirst({
//           where: { name: row.category },
//         });

//         if (!category) {
//           category = await prisma.category.create({
//             data: { name: row.category },
//           });

//           console.log("📁 Created Category:", category.name);
//         }

//         // --------------------------------------
//         // 2️⃣ Find Image in MongoDB (Optional)
//         // --------------------------------------
//         let imageUrl = null;

//         const imgDoc = await FoodImageModel.findOne({
//           name: { $regex: new RegExp(`^${row.name}$`, "i") },
//         });

//         if (imgDoc) {
//           imageUrl = imgDoc.url;
//           console.log("🖼 Image Found:", row.name);
//         } else {
//           console.log("⚠️ No Image Found:", row.name);
//         }

//         // --------------------------------------
//         // 3️⃣ Insert Item (MATCHES YOUR SCHEMA)
//         // --------------------------------------
//         const createdItem = await prisma.item.create({
//           data: {
//             name: row.name,
//             price: row.price,
//             mrp: row.price,
//             sellingPrice: row.price,
//             purchasePrice: row.price,

//             imageUrl: imageUrl || null,
//             gallery: imageUrl ? [imageUrl] : [],

//             // REQUIRED FIELDS FROM SCHEMA
//             categoryId: category.id,
//             userId: "677cdcb8dfc8dbd3a088a62e", // CHANGE TO YOUR USER
//             clerkId: "admin", // or dynamic

//             // OPTIONAL FIELDS DEFAULT
//             stock: 0,
//             currentStock: 0,
//             openingStock: 0,
//           },
//         });

//         console.log("✅ Inserted:", createdItem.name);
//         inserted++;
//       } catch (err: any) {
//         console.error("❌ Row Insert Error:", err);

//         failed++;
//         errorRows.push({
//           row,
//           error: err.message || JSON.stringify(err),
//         });
//       }
//     }

//     return NextResponse.json({
//       message: "Excel processed",
//       total: rows.length,
//       inserted,
//       failed,
//       errorRows,
//     });
//   } catch (error) {
//     console.error("❌ FATAL ERROR:", error);
//     return NextResponse.json(
//       { error: "Internal server error", details: `${error}` },
//       { status: 500 }
//     );
//   }
// }



































// // src/app/api/upload-excel/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import * as XLSX from "xlsx";
// import { PrismaClient } from "@prisma/client";
// import { connectImagesDb, FoodImageModel } from "@/lib/imagesDb";

// const prisma = new PrismaClient();

// // ---------------------------------------------------
// // 🔍 BEST IMAGE MATCH FUNCTION
// // ---------------------------------------------------
// function getBestImageMatch(foodName: string, images: any[]) {
//   if (!images || images.length === 0) return null;

//   const name = foodName.toLowerCase();

//   // Score images based on relevance
//   const scored = images.map((img) => {
//     const title = (img.title || "").toLowerCase();

//     let score = 0;
//     if (title === name) score = 100;               // Perfect match
//     else if (title.startsWith(name)) score = 90;   // Starts with
//     else if (title.includes(name)) score = 80;     // Contains word
//     else if (name.includes(title)) score = 70;     // Reversed contains

//     return { ...img, score };
//   });

//   // Get image with highest score
//   scored.sort((a, b) => b.score - a.score);

//   const best = scored[0];
//   return best.score >= 70 ? best : null; // Ignore weak matches
// }

// // ---------------------------------------------------
// // 📥 EXCEL IMPORT HANDLER
// // ---------------------------------------------------
// export async function POST(req: NextRequest) {
//   console.log("🔥 Excel API HIT");

//   try {
//     await connectImagesDb();

//     const form = await req.formData();
//     const file = form.get("file") as File;

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     console.log("📄 File received:", file.name);

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const workbook = XLSX.read(buffer, { type: "buffer" });
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     let rows: any[] = XLSX.utils.sheet_to_json(sheet);

//     console.log(`📊 Total Rows: ${rows.length}`);

//     let inserted = 0;
//     let failed = 0;
//     let errorRows: any[] = [];

//     for (const row of rows) {
//       try {
//         // Validate row
//         if (!row.name || !row.category || !row.price) {
//           failed++;
//           errorRows.push({ row, error: "Missing required fields" });
//           continue;
//         }

//         // ----------------------------------------
//         // 1️⃣ Find or create category
//         // ----------------------------------------
//         let category = await prisma.category.findFirst({
//           where: { name: row.category.trim() },
//         });

//         if (!category) {
//           category = await prisma.category.create({
//             data: { name: row.category.trim() },
//           });
//           console.log("🆕 Category Created:", category.name);
//         }

//         // ----------------------------------------
//         // 2️⃣ Find best matching image from Mongo
//         // ----------------------------------------
//         console.log("🔍 Searching image for:", row.name);

//         const allImages = await FoodImageModel.find({
//           title: { $regex: row.name, $options: "i" },
//         });

//         const bestImage = getBestImageMatch(row.name, allImages);

//         let finalImageUrl = null;

//         if (bestImage) {
//           finalImageUrl = bestImage.imageUrl;
//           console.log("🖼️ Best image match:", bestImage.title);
//         } else {
//           console.log("⚠️ No relevant image found");
//         }

//         // ----------------------------------------
//         // 3️⃣ Create Item  
//         // REQUIRED: categoryId, userId, clerkId
//         // ----------------------------------------
//         await prisma.item.create({
//           data: {
//             name: row.name,
//             price: Number(row.price),
//             mrp: Number(row.price),
//             sellingPrice: Number(row.price),
//             purchasePrice: Number(row.price),
//             description: "",
//             gst: 0,
//             discount: 0,
//             stock: 0,
//             openingStock: 0,
//             currentStock: 0,
//             reorderLevel: 0,
//             unit: "",
//             barcode: "",
//             brand: "",
//             model: "",
//             size: "",
//             color: "",
//             variants: [],

//             imageUrl: finalImageUrl,
//             gallery: finalImageUrl ? [finalImageUrl] : [],

//             categoryId: category.id,

//             // YOU MUST SET THESE ACCORDING TO YOUR APP LOGIC
//             userId: "679e70c50225d43ecfc08924",
//             clerkId: "system",
//           },
//         });

//         inserted++;
//       } catch (err: any) {
//         console.log("❌ Insert Error:", err);
//         failed++;
//         errorRows.push({ row, error: err.message });
//       }
//     }

//     return NextResponse.json({
//       message: "Excel processed",
//       total: rows.length,
//       inserted,
//       failed,
//       errorRows,
//     });
//   } catch (err: any) {
//     console.error("❌ Fatal Error:", err);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }




















// src/app/api/upload-excel/route.ts
import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { PrismaClient } from "@prisma/client";
import { connectImagesDb, FoodImageModel } from "@/lib/imagesDb";

const prisma = new PrismaClient();

// ---------------------------------------------------
// 🔍 BEST IMAGE MATCH FUNCTION
// ---------------------------------------------------
function getBestImageMatch(foodName: string, images: any[]) {
  if (!images || images.length === 0) return null;

  const name = foodName.toLowerCase();

  const scored = images.map((img) => {
    const title = (img.title || "").toLowerCase();

    let score = 0;
    if (title === name) score = 100;
    else if (title.startsWith(name)) score = 90;
    else if (title.includes(name)) score = 80;
    else if (name.includes(title)) score = 70;

    return { ...img, score };
  });

  const best = scored.sort((a, b) => b.score - a.score)[0];

  return best.score >= 70 ? best : null;
}

// ---------------------------------------------------
// 🔥 MAIN POST HANDLER
// ---------------------------------------------------
export async function POST(req: NextRequest) {
  console.log("🔥 Excel API HIT");

  try {
    await connectImagesDb();

    // ---------------------------------------------------
    // 1️⃣ Print 10 sample images for debugging
    // ---------------------------------------------------
    console.log("🟦 Checking first 10 images from MongoDB...");
    const sampleImages = await FoodImageModel.find().limit(10);

    if (!sampleImages.length) {
      console.log("❌ No images found in MongoDB IMAGE DB!");
    } else {
      console.log("✅ Found Images (10 max):");
      sampleImages.forEach((img, i) =>
        console.log(`${i + 1}. ${img.title} → ${img.url}`)
      );
    }

    // ---------------------------------------------------
    // 2️⃣ Read Excel file
    // ---------------------------------------------------
    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    console.log("📄 File received:", file.name);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const workbook = XLSX.read(buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    let rows: any[] = XLSX.utils.sheet_to_json(sheet);

    console.log("📊 Total Excel Rows:", rows.length);

    let inserted = 0;
    let failed = 0;
    const errorRows: any[] = [];

    // ---------------------------------------------------
    // 3️⃣ Process each Excel row
    // ---------------------------------------------------
    for (const row of rows) {
      try {
        if (!row.name || !row.category || !row.price) {
          failed++;
          errorRows.push({ row, error: "Missing required fields" });
          continue;
        }

        const name = String(row.name).trim();
        const categoryName = String(row.category).trim();
        const price = Number(row.price);

        // ---------------------------------------------------
        // CATEGORY CHECK/CREATION
        // ---------------------------------------------------
        let category = await prisma.category.findFirst({
          where: { name: categoryName },
        });

        if (!category) {
          category = await prisma.category.create({
            data: { name: categoryName },
          });
          console.log("➕ Category Created:", category.name);
        }

        // ---------------------------------------------------
        // IMAGE SEARCH
        // ---------------------------------------------------
        console.log(`🔍 Searching image for: ${name}`);

        const possibleImages = await FoodImageModel.find({
          title: { $regex: name, $options: "i" },
        });

        const bestMatch = getBestImageMatch(name, possibleImages);

        const imageUrl = bestMatch ? bestMatch.url : null;

        if (!imageUrl) console.log(`⚠️ No relevant image found for "${name}"`);
        else console.log(`🖼️ Best Match: ${imageUrl}`);

        // ---------------------------------------------------
        // INSERT ITEM
        // Prisma schema requires:
        // - categoryId
        // - userId
        // - clerkId
        // ---------------------------------------------------
        await prisma.item.create({
          data: {
            name,
            price,
            mrp: price,
            sellingPrice: price,
            purchasePrice: price,
            categoryId: category.id,
            imageUrl: imageUrl ?? "",
            gallery: [],
            userId: "679fa38a4db86dfc03328481", // FIXED
            clerkId: "system",
          },
        });

        inserted++;
      } catch (err: any) {
        failed++;
        errorRows.push({ row, error: err.message });
        console.log("❌ Insert Error:", err);
      }
    }

    return NextResponse.json({
      message: "Excel processed",
      total: rows.length,
      inserted,
      failed,
      errorRows,
    });
  } catch (err: any) {
    console.error("🔥 FATAL ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
