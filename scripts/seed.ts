
 // scripts/seed.ts (example)
import prisma from "@/utils/prismaClient";

async function main() {
  const category = await prisma.category.create({
    data: { name: "Beverages" },
  });

  console.log("✅ New Category ID:", category.id);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
