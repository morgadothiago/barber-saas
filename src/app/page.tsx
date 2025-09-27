"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  return (
    <div className="w-screen h-screen bg-[url('/fundo.png')] bg-contain bg-no-repeat bg-left-top flex flex-row-reverse">
      <div className="w-[55%] bg-[#181818]">
        <h1 className="">Login</h1>
      </div>
    </div>
  )
}
