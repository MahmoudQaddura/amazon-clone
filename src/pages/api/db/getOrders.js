import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const { email } = req.body;
  try {
    //find user
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // find all user's orders
    const user_orders = await prisma.order.findMany({
      where: {
        user_id: user.id,
      },
    });

    //find all the order-product records that belong to each user order
    let orders = [];
    await Promise.all(
      user_orders.map(async (order) => {
        try {
          let temp = await prisma.order_Product.findMany({
            where: {
              order_id: order.id,
            },
            include: {
              product: {
                select: {
                  name: true,
                  image: true,
                  price: true,
                },
              },
              order: {
                select: {
                  order_time: true,
                  total: true,
                },
              },
            },
          });

          orders.push(temp);
        } catch (err) {
          console.log(err);
        }
      })
    );
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
}
