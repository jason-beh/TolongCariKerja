import { signIn, signOut, useSession } from "next-auth/client";
import Router from "next/router";

export default function Login() {
  const [session, loading] = useSession();

  console.log(loading, session)

  if (loading) {
    return "loading...";
  }

  if (!loading && session) {
    // return "redirect to home page";
    Router.push(process.env.NEXTAUTH_URL + "/");
    return;
  } else if (!loading && !session) {
    return (
      <div class="flex flex-col">
      <button onClick={() => signIn("google", { callbackUrl: "/" })}>Sign in with Google</button>
      <button onClick={() => signIn("facebook", { callbackUrl: "/" })}>Sign in with Facebook</button>
      </div>
    );
  }
}
