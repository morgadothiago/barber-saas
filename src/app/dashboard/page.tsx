"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import React from "react"

export default function Page() {
  const { data: session, status } = useSession()

  if (session?.user?.role === "admin") redirect("/dashboard/admin")

  return <div>Tela do usuário: {session?.user?.role}</div>
}
