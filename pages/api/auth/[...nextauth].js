import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import User from "../../../models/User";
import dbConnect from "../../../utils/mongodb";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async (user, account, profile) => {
      const { name, email } = user;

      try {
        await dbConnect();
        let user = await User.findOne({ email }).exec();
        if (!user) {
          const newUser = new User({
            name,
            email,
          });
          await newUser.save();
        }

        return Promise.resolve(true);
      } catch (err) {
        console.log("Server error");
        console.log(err);
        throw new Error("Error in signin callback");
      }
    },

    session: async (session, user) => {
      try {
        await dbConnect();
        let dbUser = await User.findOne({ email: session.user.email }).exec();
        session.dbUser = dbUser;
        session.id = dbUser._id;
      } catch (err) {
        console.log("Server error");
        console.log(err);
        throw new Error("Error in session callback");
      }
      return Promise.resolve(session);
    },
  },

  // Enable debug messages in the console if you are having problems
  debug: false,

  // A database is optional, but required to persist accounts in a database
  //   database: process.env.DATABASE_URL,
});
