// import mongoose, { Schema, model, models } from "mongoose";

// const MONGO_IMG_URI = process.env.IMAGES_DB_URL;

// if (!MONGO_IMG_URI) {
//   throw new Error("❌ Missing IMAGES_DB_URL in .env");
// }

// export async function connectImagesDb() {
//   if (mongoose.connection.readyState === 1) {
//     console.log("✔ Images DB already connected");
//     return;
//   }

//   try {
//     await mongoose.connect(MONGO_IMG_URI, {
//       dbName: "images",
//     } as any);

//     console.log("✔ Connected to Images DB");
//   } catch (err) {
//     console.error("❌ Error connecting to Images DB:", err);
//     throw err;
//   }
// }

// /* ---------------------------------------
//    ⭐ Food Image Schema & Model Export
// --------------------------------------- */

// const foodImageSchema = new Schema({
//   title: String,
//   description: String,
//   image_url: String,
//   category: String,
//   sub_category: String,
//   food_type: String,
// });

// // Export the model (fixed)
// export const FoodImageModel =
//   models.FoodImage || model("FoodImage", foodImageSchema);






// import mongoose, { Schema, model, models } from "mongoose";

// const MONGO_IMG_URI = process.env.IMAGES_DB_URL;

// if (!MONGO_IMG_URI) {
//   throw new Error("❌ Missing IMAGES_DB_URL in .env");
// }

// export async function connectImagesDb() {
//   if (mongoose.connection.readyState === 1) {
//     console.log("✔ Images DB already connected");
//     return;
//   }

//   try {
//     await mongoose.connect(MONGO_IMG_URI);

//     console.log("✔ Connected to Images DB:", mongoose.connection.db.databaseName);

//   } catch (err) {
//     console.error("❌ Error connecting to Images DB:", err);
//     throw err;
//   }
// }

// /* ---------------------------------------
//    ⭐ Food Image Schema & Model Export
// --------------------------------------- */
// const foodImageSchema = new Schema({
//   title: String,
//   description: String,
//   image_url: String,
//   approved: Boolean,
//   category: String,
//   sub_category: String,
//   food_type: String,
//   premium: Boolean,
//   quality_score: Number,
//   popularity_score: Number,
//   likes: Number,
//   downloads: Number,
//   source: String,
// }, { timestamps: true });

// export const FoodImageModel =
//   models.FoodImage || model("FoodImage", foodImageSchema);














import mongoose, { Schema, model, models } from "mongoose";

const MONGO_IMG_URI = process.env.IMAGES_DB_URL;

if (!MONGO_IMG_URI) {
  throw new Error("❌ Missing IMAGES_DB_URL in .env");
}

export async function connectImagesDb() {
  if (mongoose.connection.readyState === 1) {
    console.log("✔ Images DB already connected");
    return;
  }

  try {
    await mongoose.connect(IMAGES_DB_URL, {  //IMAGES_DB_URL
      dbName: "image", // 👈 FIXED (your real database)
    } as any);

    console.log("✔ Connected to Images DB");
  } catch (err) {
    console.error("❌ Error connecting to Images DB:", err);
    throw err;
  }
}

/* ---------------------------------------
   ⭐ Food Image Schema & Model Export
--------------------------------------- */

const foodImageSchema = new Schema(
  {
    title: String,
    description: String,
    image_url: String,
    category: String,
    sub_category: String,
    food_type: String,
  },
  { collection: "image" } // 👈 FIXED (your real collection name)
);

export const FoodImageModel =
  models.FoodImage || model("FoodImage", foodImageSchema);
