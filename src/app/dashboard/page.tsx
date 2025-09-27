"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import React from "react"
import Loading from "../components/loading"

export default function Page() {
  const { data: session, status } = useSession()

  // 1. Enquanto a sessão está sendo verificada, mostramos um loading.
  if (status === "loading") {
    return <Loading />
  }

  // 2. Se o status for "unauthenticated" (token expirou ou não logado), redireciona para o login.
  if (status === "unauthenticated") {
    redirect("/")
  }

  // 3. Se o usuário for admin, redireciona para a página de admin.
  if (session?.user?.role === "admin") {
    redirect("/dashboard/admin")
  }

  return <div>Tela do usuário: {session?.user?.role}</div>
}
