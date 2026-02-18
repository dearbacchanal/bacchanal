import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature") as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        console.error(`Webhook signature verification failed: ${error.message}`);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;
        const userId = session.metadata?.userId;
        const shippingDetails = session.shipping_details;

        console.log("Webhook: checkout.session.completed received");
        console.log("User ID:", userId);
        console.log("Shipping details:", shippingDetails);

        if (userId) {
            try {
                const db = await getDatabase();
                const usersCollection = db.collection("users");

                const result = await usersCollection.updateOne(
                    { _id: new ObjectId(userId) },
                    {
                        $set: {
                            isPurchased: true,
                            shippingDetails: shippingDetails,
                            updatedAt: new Date(),
                        },
                    }
                );

                console.log(`User ${userId} purchase status updated - matched: ${result.matchedCount}, modified: ${result.modifiedCount}`);

                if (result.matchedCount === 0) {
                    console.error(`WARNING: No user found with ID ${userId}`);
                }
            } catch (error) {
                console.error("Error updating user purchase status:", error);
                return NextResponse.json(
                    { error: "Internal server error" },
                    { status: 500 }
                );
            }
        }
    }

    return NextResponse.json({ received: true });
}
