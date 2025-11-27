import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // params may be a Promise in Next.js App Router
    const { id: restoreId } = await params;

    // 1) find deleted snapshot
    const entry = await prisma.deleteHistory.findUnique({
      where: { id: restoreId },
    });

    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    const snap: any = entry.snapshot;

    // 2) Restore Bill
    const restoredBill = await prisma.bill.create({
      data: {
        // if snap.id exists (you stored id previously), Prisma + Mongo will accept it
        id: snap.id,
        userId: snap.userId,
        clerkUserId: snap.clerkUserId ?? null,
        customerId: snap.customerId ?? null,
        total: snap.total ?? 0,
        discount: snap.discount ?? null,
        gst: snap.gst ?? null,
        grandTotal: snap.grandTotal ?? null,
        paymentStatus: snap.paymentStatus ?? null,
        paymentMode: snap.paymentMode ?? null,
        notes: snap.notes ?? null,
        dueDate: snap.dueDate ? new Date(snap.dueDate) : null,
        holdBy: snap.holdBy ?? null,
        holdAt: snap.holdAt ? new Date(snap.holdAt) : null,
        resumedAt: snap.resumedAt ? new Date(snap.resumedAt) : null,
        isHeld: snap.isHeld ?? false,
        companyName: snap.companyName ?? null,
        companyAddress: snap.companyAddress ?? null,
        companyPhone: snap.companyPhone ?? null,
        contactPerson: snap.contactPerson ?? null,
        logoUrl: snap.logoUrl ?? null,
        signatureUrl: snap.signatureUrl ?? null,
        websiteUrl: snap.websiteUrl ?? null,
        // createdAt: snap.createdAt ? new Date(snap.createdAt) : undefined, // optional: set if you want to restore original timestamp
      },
    });

    // 3) Restore BillProduct entries (if any)
    if (Array.isArray(snap.products) && snap.products.length > 0) {
      const productsData = snap.products.map((p: any) => ({
        id: p.id,
        billId: snap.id,
        productId: p.productId,
        productName: p.productName ?? p.name ?? null,
        quantity: p.quantity ?? 0,
        price: p.price ?? 0,
        discount: p.discount ?? null,
        gst: p.gst ?? null,
        total: p.total ?? null,
      }));

      // createMany is faster; if your Mongo + Prisma supports it use this:
      await prisma.billProduct.createMany({
        data: productsData,
        skipDuplicates: true,
      });

      // If createMany causes issues on your platform, use a loop:
      // for (const p of productsData) {
      //   await prisma.billProduct.create({ data: p });
      // }
    }

    // 4) Restore payments (if any)
    if (Array.isArray(snap.payments) && snap.payments.length > 0) {
      const paymentsData = snap.payments.map((p: any) => ({
        id: p.id,
        billId: snap.id,
        amount: p.amount ?? 0,
        mode: p.mode ?? null,
        paidAt: p.paidAt ? new Date(p.paidAt) : new Date(),
      }));

      await prisma.payment.createMany({
        data: paymentsData,
        skipDuplicates: true,
      });

      // or fallback to single creates if needed:
      // for (const pay of paymentsData) {
      //   await prisma.payment.create({ data: pay });
      // }
    }

    // 5) Cleanup: delete the DeleteHistory entry
    await prisma.deleteHistory.delete({
      where: { id: restoreId },
    });

    return NextResponse.json({
      success: true,
      message: "Bill restored successfully",
      restoredBill,
    });
  } catch (err: any) {
    console.error("RESTORE ERROR →", err);
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
