"use client"
import React, { createContext, useContext } from "react"
import { useSession, SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"

interface AuthContextType extends Session {
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

const AuthProviderContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const isAuthenticated = status === "authenticated"

  // Enquanto a sessão está carregando, você pode optar por não renderizar nada
  // ou mostrar um componente de loading global.
  if (loading) {
    return <div>Carregando sessão...</div> // Ou null
  }

  return (
    <AuthContext.Provider
      // Passamos a sessão (que pode ser null), o status de autenticado e o carregamento.
      // O `user` e a `role` já estão dentro do objeto `session`.
      value={{ ...(session as Session), isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // O SessionProvider do NextAuth é necessário para o useSession funcionar.
  // Envolvemos nosso conteúdo com ele.
  return (
    <SessionProvider>
      <AuthProviderContent>{children}</AuthProviderContent>
    </SessionProvider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
