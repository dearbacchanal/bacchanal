import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const user = session?.user;

        if (!user || !user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const priceId = process.env.STRIPE_PRICE_ID;
        if (!priceId) {
            return NextResponse.json({ error: "Stripe Price ID not configured" }, { status: 500 });
        }

        const checkoutSession = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            allow_promotion_codes: true,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            shipping_address_collection: {
                allowed_countries: ["US", "CA", "GB"], // Add more countries as needed
            },
            success_url: `${process.env.NEXTAUTH_URL}/book/payment-status?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/book/payment-status?canceled=true`,
            customer_email: user.email,
            metadata: {
                userId: user.id,
            },
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
