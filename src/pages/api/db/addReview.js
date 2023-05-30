import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const { userName, review, product_id } = req.body;
    let { rating } = req.body;
    rating = Number(rating);
    if (0 > rating || rating > 5) {
      res.status(500).end("invalid Rating");
    }

    const user_id = await prisma.user.findMany({
      where: { name: userName },
      select: { id: true },
    });

    await prisma.review.create({
      data: {
        review: review,
        rating: rating,
        user: { connect: { id: user_id[0].id } },
        product: { connect: { id: product_id } },
      },
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200).end("Review Submited");
}
