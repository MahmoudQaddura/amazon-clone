import { hash } from "bcrypt";
import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const { user } = req.body;
  if (!user) {
    res.status(406).end();
  }
  const password = await hash(user.password, 12);

  const emailExsists = await prisma.user.findUnique({
    where: { email: user.email },
  });
  if (emailExsists) {
    res.status(400).end("Email Already Exists!");
  }

  try {
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: password,
      },
    });
  } catch (error) {
    console.log(error);
  }

  res.end("User Created Successfully!");
}
