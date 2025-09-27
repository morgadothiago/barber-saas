import { Session } from "next-auth"
import { BuiltInProviderType } from "next-auth/providers/index"
import { ClientSafeProvider, LiteralUnion } from "next-auth/react"

export type AuthContextType = {
  session: Session | null
  providers: Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null
  signIn: (
    provider?: LiteralUnion<BuiltInProviderType>,
    options?: Record<string, unknown>
  ) => Promise<void>
  signOut: () => Promise<void>
}
