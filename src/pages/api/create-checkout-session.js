const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export default async (req, res) => {
  const { items, email } = req.body;

  const transformedItems = items.map((item) => ({
    //stripe expects the item objects in a specific format
    quantity: 1, //to be implemented later
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100, //stripe needs it in subcurrency (cents)
      product_data: {
        description: item.description,
        name: item.title,
        images: [item.image], //stripe expects an array of images
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    line_items: transformedItems,
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    customer_email: email,
    shipping_options: [{ shipping_rate: "shr_1N7LzkLseLovm7bCPcfGZesf" }],
    shipping_address_collection: {
      allowed_countries: ["GB", "US"],
    },
    metadata: {
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
