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
    await mongoose.connect(MONGO_IMG_URI, {
      dbName: "images",  // ✅ REAL DATABASE NAME
    } as any);

    console.log("✔ Connected to Images DB");
  } catch (err) {
    console.error("❌ Error connecting Images DB:", err);
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
    approved: Boolean,
    system_approved: Boolean,
    premium: Boolean,
    quality_score: Number,
    popularity_score: Number,
    likes: Number,
    category: String,
    sub_category: String,
    food_type: String,
  },
  {
    timestamps: true, // ✅ IMPORTANT (required for sorting)
  }
);

// Avoid recompiling model during hot reload
export const FoodImageModel =
  models.FoodImage || model("FoodImage", foodImageSchema);
