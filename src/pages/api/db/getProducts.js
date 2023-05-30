import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const results = await prisma.product.findMany({
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

    // const categories = results.map(result =>{
    //   categories.push({category:result.category.name,parent:result.category.parent.name});
    // });

    const products = [];
    results.map((result) => {
      const product = {
        id: result.id,
        name: result.name,
        description: result.description,
        image: result.image,
        quantity: result.quantity,
        price: result.price,
        category: result.category.parent.name,
      };
      products.push(product);
    });

    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.send();
  }
}
