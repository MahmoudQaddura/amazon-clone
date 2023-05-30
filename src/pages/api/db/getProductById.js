import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const ID = req.body;
  try {
    const result = await prisma.product.findUnique({
      where: {
        id: ID.id,
      },
      include: {
        category: {
          select: {
            name: true,
            parent: {
              select: {
                name: true,
                parent: { select: { name: true } },
              },
            },
          },
        },
      },
    });
    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
}
