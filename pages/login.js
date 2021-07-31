import { signIn, signOut, useSession } from "next-auth/client";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && session) {
      router.push("/");
    }
  }, [loading, session]);

  return (
    <>
      {!session && (
      <div className="flex flex-col">
      <button onClick={() => signIn("google", { callbackUrl: "/" })}>Sign in with Google</button>
      <button onClick={() => signIn("facebook", { callbackUrl: "/" })}>
        Sign in with Facebook
      </button>
    </div>
      )}
    </>
  );
}