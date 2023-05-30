import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../lib/prisma";
import { compare } from "bcrypt";
export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      secret: process.env.SECRET,
    }),
    CredentialsProvider({
      name: "",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) return null;

        const isPasswordValid = compare(credentials.password, user.password);

        if (!isPasswordValid) return null;

        return {
          id: user.id + "",
          name: user.name,
          email: user.email,
        };
      },
      callbacks: {
        async signIn({}) {
          return `${process.env.HOST}/`;
        },
      },
    }),
  ],
};
export default NextAuth(authOptions);
