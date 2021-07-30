import { signOut, useSession } from "next-auth/client";
import Router from "next/router";

export default function Index() {
  const [session, loading] = useSession();

  if (loading) {
    return "loading...";
  }

  if (!loading && !session) {
    Router.push(process.env.NEXTAUTH_URL + "/login");
    return;
  } else if (!loading && session) {
    return (
      <>
        <div>Authenticated View</div>
        <a onClick={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL + "/login" })}>Sign Out</a>
      </>
    );
  }
}
