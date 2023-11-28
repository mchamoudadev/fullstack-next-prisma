import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "../../auth/[...nextauth]/authOptions";

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16"
})


export async function POST(request: NextRequest) {

    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, { status: 401 });


    const body = await request.json();

    // console.log(body)

    try {

        const lineItems = await Promise.all(
            body.cartItems.map(async (item: any) => {

                const product = await prisma?.product.findUnique({ where: { id: item.id } });

                // console.log(product)
                const unitAmount = product?.price as number * 100;

                // console.log("unitAmount", unitAmount)

                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product?.name,
                            images: [product?.thumbnail]
                        },
                        unit_amount: unitAmount
                    },
                    quantity: item.quantity
                }
            })
        )


        const stripeSession = await stripe.checkout.sessions.create({
            metadata: {
                userEmail: session.user?.email as string,
                cartItems: JSON.stringify(body.cartItems)
            },
            customer_email: session.user?.email as string,
            line_items: lineItems,
            mode: "payment",
            success_url: process.env.NODE_ENV === "production" ? "https://websitename/success" : "http://localhost:3000/success",
            cancel_url: process.env.NODE_ENV === "production" ? "https://websitename/cancel" : "http://localhost:3000/cancel"
        })

        return NextResponse.json(stripeSession, { status: 200 })

    } catch (error) {
        console.log("error: ", error)
        return NextResponse.json("error", { status: 400 })
    }


}