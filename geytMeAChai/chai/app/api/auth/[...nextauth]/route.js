import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import mongoose from 'mongoose';
import User from '@/models/User';

// Connect to the database once at startup
mongoose.connect("mongodb://localhost:27017/chai");

export const authOptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // Uncomment and configure other providers as needed
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github") {
        try {
          // Retrieve the user by email from the database
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create a new user if not found
            const newUser = new User({
              email: user.email,
              userName: user.email.split("@")[0],
            });
            await newUser.save();
            user.userName = newUser.userName;
          } else {
            user.userName = existingUser.userName;
          }

          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },

  }
});

// Export for both POST and GET methods
export { authOptions as POST, authOptions as GET };
