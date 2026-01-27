import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
            return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
        }

        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Retrieve the session from Stripe
        const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

        if (checkoutSession.payment_status === "paid") {
            const userId = checkoutSession.metadata?.userId;

            if (userId) {
                const db = await getDatabase();
                const usersCollection = db.collection("users");

                await usersCollection.updateOne(
                    { _id: new ObjectId(userId) },
                    {
                        $set: {
                            isPurchased: true,
                            updatedAt: new Date(),
                        },
                    }
                );

                return NextResponse.json({ success: true });
            }
        }

        return NextResponse.json({
            success: false,
            status: checkoutSession.status,
            payment_status: checkoutSession.payment_status
        });
    } catch (error: any) {
        console.error("Payment Check Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
