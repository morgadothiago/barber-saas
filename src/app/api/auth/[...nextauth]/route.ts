// /app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "@/app/types/User" // Seu tipo customizado

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const mockUsers: User[] = [
          {
            id: "1",
            name: "J Smith",
            email: "jsmith@example.com",
            password: "123456", // ⚠️ Só para testes! Nunca armazene senha assim em produção
            role: "admin",
          },
          {
            id: "",
            name: "teste",
            email: "teste@example.com",
            password: "123456", // ⚠️ Só para testes! Nunca armazene senha assim em produção
            role: "user",
          },
        ]

        const user = mockUsers.find(
          (u) =>
            u.email === credentials?.username &&
            u.password === credentials?.password
        )

        if (user) {
          // Retorna sem a senha
          const { password, ...safeUser } = user
          return safeUser
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as User).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/", // Página personalizada de login (home, no caso)
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// ⬇️ Importante para o app router
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
