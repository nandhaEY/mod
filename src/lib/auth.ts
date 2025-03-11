import type { NextAuthOptions } from "next-auth";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    ///////////////////////////////////// CY LOGIN
    {
      id: "cylogin",
      name: "cylogin",
      type: "oauth",
      authorization: {
        params: {
          scope: "openid cegg_profile army.certificates",
        },
      },
      userinfo: {
        url: process.env.CLIENT_USERINFO_ENDPOINT,
        async request(context) {
          return await context.client.userinfo(
            context.tokens?.access_token ?? ""
          );
        },
      },
      checks: ["pkce", "state"],
      idToken: true,
      wellKnown: process.env.CLIENT_CONFIG,
      profile(profile: any) {
        const {
          sub,
          unique_identifier,
          name,
          given_name,
          family_name,
          birthdate,
          legal_unique_identifier,
          legal_name,
          email,
          profile_type,
          client_ip,
          legal_main_profile,
          phone_number,
        } = profile;

        return {
          id: sub,
          unique_identifier,
          name,
          given_name,
          family_name,
          birthdate,
          legal_unique_identifier,
          legal_name,
          email,
          profile_type,
          client_ip,
          legal_main_profile,
          phone_number,
        };
      },
      httpOptions: {
        timeout: 10000,
      },
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
  ],
  debug: true,
  secret: process.env.CLIENT_SECRET,
  callbacks: {
    async jwt({ token, user, session, account }) {
      console.log("callbacks", token, user, session, account);
      if (account?.id_token) {
        token.id_token = account?.id_token;
        token.access_token = account?.access_token;
      }

      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      session.user = token;

      const decodedToken = jwt.decode(token.access_token as string);
      if (decodedToken && typeof decodedToken !== "string") {
        session.exp = decodedToken.exp ?? 0;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      const redirectUrl = url.startsWith("/")
        ? new URL(url, baseUrl).toString()
        : url;
      return redirectUrl;
    },
  },
};
