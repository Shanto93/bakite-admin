/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role: "ADMIN" | "SUPER_ADMIN" | "MANAGEMENT";
      image?: string | null;
    };
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role: "ADMIN" | "SUPER_ADMIN" | "MANAGEMENT";
    image?: string | null;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "SUPER_ADMIN" | "MANAGEMENT";
  }
}

const demoUsersCredential = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@gmail.com",
    password: "admin123",
    role: "SUPER_ADMIN" as const,
  },
  {
    id: "2",
    name: "Maruf",
    email: "maruf@gmail.com",
    password: "admin123",
    role: "SUPER_ADMIN" as const,
  },
  {
    id: "3",
    name: "Shanto",
    email: "shanto@gmail.com",
    password: "admin123",
    role: "SUPER_ADMIN" as const,
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "User Email",
          type: "email",
          placeholder: "user@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
        role: { label: "Role", type: "string", placeholder: "ADMIN" }, 
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.log("Email or Password is missing");
          return null;
        }

        const matched = demoUsersCredential.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );
        if (!matched) {
          console.log("Invalid email/password");
          return null;
        }

        if (credentials.role && credentials.role !== matched.role) {
          console.log("Role mismatch with server-side user role");
          return null;
        }

        return {
          id: matched.id,
          name: matched.name,
          email: matched.email,
          role: matched.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // First sign-in: copy user -> token
      if (user) {
        token.id = user.id as string;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose token -> session.user
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};
