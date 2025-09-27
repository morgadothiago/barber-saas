"use client"
import React, { createContext, useContext } from "react"
import { useSession, SessionProvider } from "next-auth/react"
import type { Session, User } from "next-auth"

export interface AuthContextType {
  user: (User & { role: string }) | null
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

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
      value={{
        user: (session?.user as User & { role: string }) ?? null,
        isAuthenticated,
        loading,
      }}
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
  if (context === undefined || Object.keys(context).length === 0) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
