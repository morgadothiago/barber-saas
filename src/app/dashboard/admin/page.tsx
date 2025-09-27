"use client"

import { useSession } from "next-auth/react"
import React from "react"

export default function Page() {
  const { data: session } = useSession()

  return <div>Tela do adm do sistema: {session?.user?.role}</div>
}
