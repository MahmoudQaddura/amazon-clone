import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const name = req.body;
  try {
    const result = await prisma.product.findMany({
      where: { name: name.name },
    });

    res.json(result[0].id);
  } catch (error) {
    console.log(error.message);
    res.send();
  }
}
