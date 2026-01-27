import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getDatabase } from "./db";
import { signInSchema } from "./validators";

export const authConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate credentials
          const { email, password } = signInSchema.parse(credentials);

          // Get database
          const db = await getDatabase();
          const usersCollection = db.collection("users");

          // Find user by email
          const user = await usersCollection.findOne({ email });

          if (!user) {
            return null;
          }

          // Check if user has a password (credentials user)
          if (!user.password) {
            throw new Error("Please sign in with Google");
          }

          // Verify password
          const isPasswordValid = await compare(password, user.password);

          if (!isPasswordValid) {
            return null;
          }

          // Return user object
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image || null,
            provider: "credentials" as const,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Handle Google OAuth sign in
      if (account?.provider === "google") {
        try {
          const db = await getDatabase();
          const usersCollection = db.collection("users");

          // Check if user exists
          const existingUser = await usersCollection.findOne({
            email: user.email,
          });

          if (!existingUser) {
            // Create new user
            await usersCollection.insertOne({
              email: user.email,
              name: user.name,
              image: user.image,
              provider: "google",
              password: null,
              emailVerified: new Date(),
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          } else {
            // Update existing user
            await usersCollection.updateOne(
              { email: user.email },
              {
                $set: {
                  name: user.name,
                  image: user.image,
                  updatedAt: new Date(),
                },
              }
            );
          }

          return true;
        } catch (error) {
          console.error("Sign in error:", error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, account }) {
      // Add user id and provider to JWT token
      if (user?.id) {
        token.id = user.id;
        token.provider = user.provider || (account?.provider === "google" ? "google" : "credentials");
      }

      // Get user ID and purchase status from database
      const email = user?.email || token?.email;
      if (email) {
        try {
          const db = await getDatabase();
          const usersCollection = db.collection("users");
          const dbUser = await usersCollection.findOne({ email });

          if (dbUser) {
            token.id = dbUser._id.toString();
            token.isPurchased = !!dbUser.isPurchased;
            if (account?.provider === "google") {
              token.provider = "google";
            }
          }
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Add user id and provider and purchase status to session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.provider = token.provider as "credentials" | "google";
        session.user.isPurchased = token.isPurchased as boolean;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);