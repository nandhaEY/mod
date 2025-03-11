import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    exp: number;
    user:
      | {
          /** Oauth access token */
          id_token: any;
          access_token: string;
          sub: string;
          unique_identifier: string;
          given_name: string;
          family_name: string;
          birthdate: string;
          legal_unique_identifier: string;
          legal_name: string;
          email: string;
          profile_type: string;
          client_ip: string;
          legal_main_profile: boolean;
          phone_number: string;
        }
      | (any & DefaultSession["user"]);
  }
}
