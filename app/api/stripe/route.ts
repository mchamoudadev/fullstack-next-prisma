import { CartItem } from '@/hooks/useCart';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16"
})


export async function POST(request: NextRequest) {


    if (request.method === "POST") {

        console.log("webhooks: POST request")
        const _raw = await request.text();

        const signature = request.headers.get('stripe-signature') as string;


        let event;


        try {

            event = stripe.webhooks.constructEvent(
                _raw,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET_KEY as string
            )

            switch (event.type) {

                case "checkout.session.completed":

                    const chargeSucceeded = event.data.object

                    if (event.data.object.metadata) {
                        const cartItems: CartItem[] = JSON.parse(event.data.object.metadata?.cartItems)

                        const userEmail = event.data.object.metadata.userEmail;

                        const totalPrice = cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);

                        const userInfo = await prisma?.user.findUnique({ where: { email: userEmail } })


                        const order = await prisma?.order.create({
                            data: {
                                userId: userInfo?.id as string,
                                total: totalPrice,
                                status: "paid",
                                items: {
                                    create: cartItems.map((item) => ({
                                        productId: item.id,
                                        price: item.price,
                                        quantity: item.quantity
                                    }))

                                }
                            }
                        });
                    }

                    break;
            }

            return NextResponse.json({ ok: true }, { status: 200 });

        } catch (error) {

            return NextResponse.json("error", { status: 400 });

        }







    }



}