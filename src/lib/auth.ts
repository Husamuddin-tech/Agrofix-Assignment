// import type { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (
//           credentials?.email === "admin@example.com" &&
//           credentials?.password === "admin123"
//         ) {
//           return {
//             id: "1",
//             name: "Admin User",
//             email: "admin@example.com",
//             role: "admin",
//           };
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }: { token: { role?: string }; user?: { role?: string } }) {
//       if (user) token.role = user.role;
//       return token;
//     },
//     async session({ session, token }: { session: { user?: { role?: string } }; token: { role?: string } }) {
//       if (session.user && token.role) session.user.role = token.role as string;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };
