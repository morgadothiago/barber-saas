import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token, // só logado
  },
})

export const config = {
  matcher: ["/(dashboard)/:path*"], // protege tudo dentro de (dashboard)
}
