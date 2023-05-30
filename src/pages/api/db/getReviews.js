import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const ID = req.body;
  try {
    const results = await prisma.review.findMany({
      where: { product_id: ID.id },
      include: { user: { select: { name: true } } },
    });
    res.json(results);
  } catch (error) {
    console.log(error.message);
    res.send();
  }
}
