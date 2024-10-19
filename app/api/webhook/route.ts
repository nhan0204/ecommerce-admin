import { prismadb } from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new NextResponse(`Webhook Error: ${error}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents
    .filter((component) => component !== null)
    .join(", ");

  if (event.type === "checkout.session.completed") {
    const order = await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
      },
      include: {
        orderItems: true,
      },
    });

    console.log('Order updated');

    const productIds = order.orderItems.map((orderItem) => orderItem.productId);

    const updatedProducts = new Map(
      order.orderItems.map((orderItem) => [
        orderItem.productId,
        orderItem.quantity,
      ])
    );

    const products = await prismadb.product.findMany({
      where: { id: { in: productIds } },
    });

    const data = products.map((product) => {
      const sale = updatedProducts.get(product.id);

      if (product.quantity < sale!) {
        throw new NextResponse("Invalid order", { status: 400 });
      }

      return {
        ...product,
        sale: sale,
        quantity: product.quantity - sale!,
        isArchived: product.quantity === 0,
      };
    });

    console.log(data);

    // await prismadb.product.updateMany({
    //   where: {
    //     id: {
    //       in: [...productIds],
    //     },
    //   },
    //   data: {...data},
    // });
  }

  return new NextResponse(null, {status: 200})
}