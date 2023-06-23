import prisma from "../../../lib/prisma";

const { buffer } = require("micro");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];
    let event;
    //Verify EVENT origin as stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      console.log("webhook error: ", error.message);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    //handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const formatted_quantity = JSON.parse(session.metadata.quantity);
      const formatted_names = JSON.parse(session.metadata.product_names);
      
      const report = {
        shipping: session.shipping_cost.amount_total / 100,
        subtotal: session.amount_subtotal / 100,
        total: session.amount_total / 100,
        shipping_address: {
          city: session.shipping_details.address.city,
          country: session.shipping_details.address.country,
          line1: session.shipping_details.address.line1,
          line2: session.shipping_details.address.line2,
          postal_code: session.shipping_details.address.postal_code,
        },
        email: session.customer_details.email,
        name: session.customer_details.name,
        images: session.metadata.images,
        product_names: formatted_names,
        quantity: formatted_quantity,
      };
if(!report.shipping_address.line2){
  report.shipping_address.line2="N/A";
}
      await registerOrder(report);
      res.status(200).end;
    }
  }
}

async function registerOrder(report) {
  try {
    //get the products' ids
    const product = await prisma.product.findMany({
      where: { name: { in: report.product_names } },
      select: { id: true },
    });

    //get user id
    const user = await prisma.user.findUnique({
      where: { email: report.email },
    });

    //create a delivery record
    const delivery = await prisma.delivery.create({
      data: {
        country: report.shipping_address.country,
        city: report.shipping_address.city,
        line1: report.shipping_address.line1,
        line2: report.shipping_address.line2,
        postal_code: report.shipping_address.postal_code,
      },
    });

    //register one order-user in Order table
    const order = await prisma.order.create({
      data: {
        total: report.total,
        user: { connect: { id: user.id } },
        delivery: { connect: { id: delivery.id } },
      },
    });

    //register multiple order-product records
    product.map(async (prod, i) => {
      await prisma.order_Product.create({
        data: {
          order: { connect: { id: order.id } },
          quantity: report.quantity[i],
          product: {
            connect: { id: prod.id },
          },
        },
      });
    });
    return;
  } catch (error) {
    console.log(error);
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
