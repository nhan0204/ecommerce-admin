import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { Product } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

interface CartItem {
  id: string;
  cart: number;
}

export async function OPTIONS() {
  return NextResponse.json({});
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { cart } = await req.json();

    if (!cart || cart.length === 0) {
      return new NextResponse("No items found in cart", { status: 400 });
    }

    const productIds = cart.map((item: CartItem) => item.id);

    const products: Product[] = await prismadb.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const checkoutProducts = products.map((product) => {
      const item: CartItem = cart.find(
        (item: CartItem) => item.id === product.id
      );

      if (!item) {
        throw new NextResponse("An unknown item was added to cart!", {
          status: 400,
        });
      }

      if (item.cart > product.quantity) {
        throw new NextResponse(
          `An invalid amount of ${product.name} was added to cart!`,
          {
            status: 400,
          }
        );
      }

      product.quantity -= item.cart;
      product.sale += item.cart;

      return {
        ...product,
        cart: item.cart,
      };
    });

    console.log("checkout list: ", checkoutProducts);

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    checkoutProducts.forEach((product) => {
      line_items.push({
        quantity: product.cart,
        price_data: {
          currency: "USD",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price.toNumber() * 100,
        },
      });
    });

    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        orderItems: {
          create: checkoutProducts.map((product) => ({
            product: {
              connect: {
                id: product.id,
              },
            },
            quantity: product.cart,
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
      cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[CART_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
