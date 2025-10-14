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
        role: {
          label: "Role",
          type: "string",
          placeholder: "ADMIN",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password || !credentials.role) {
          console.log("Email, Password, or Role is missing");
          return null;
        }

        // Validate the role is one of the allowed values
        const validRoles = ["ADMIN", "SUPER_ADMIN", "MANAGEMENT"];
        if (!validRoles.includes(credentials.role)) {
          console.log("Invalid role provided");
          return null;
        }

        if (
          credentials.email === "admin@gmail.com" &&
          credentials.password === "admin123"
        ) {
          return {
            id: "1",
            name: "Admin User",
            email: credentials.email,
            role: credentials.role as "ADMIN" | "SUPER_ADMIN" | "MANAGEMENT",
          };
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // On first sign in, user object is available
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      // Pass token data to session
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },

  session: { strategy: "jwt" },
};