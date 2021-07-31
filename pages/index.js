import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

export default function Index() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
  }, [loading, session]);

  return (
    <>
      {session && (
        <>
          Signed in as {session.user.email}
          <div>You can now access our super secret pages</div>
          <button className="block">
            <Link href="/hello">To the secret</Link>
          </button>
          <button onClick={signOut}>sign out</button>
        </>
      )}
    </>
  );
}
