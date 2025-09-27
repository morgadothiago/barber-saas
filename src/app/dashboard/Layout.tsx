"use client"

import { useAuth } from "../contexts/AuthContext"
import Loading from "../components/loading"
import { redirect } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    redirect("/")
  }

  return <>{children}</>
}
