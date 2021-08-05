import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { MailIcon, PhoneIcon, BookmarkIcon } from "@heroicons/react/solid";
import truncateString from "../utils/truncateString";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";

export default function Index() {
  const [session, loading] = useSession();
  const router = useRouter();

  const [helpData, setHelpData] = useState([]);
  const [savedHelp, setSavedHelp] = useState([]);

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }

    async function fetchData(session) {
      let { data } = await axios.post("/api/my-help", {
        creator: session.dbUser._id,
      });

      setHelpData(data);
    }

    if (!loading && session) {
      fetchData(session);
      setSavedHelp(session.dbUser.savedHelp || []);
    }
  }, [loading, session]);

  return (
    <>
      {session && !loading && (
        <>
          {/* Signed in as {session.user.email}
          <div>You can now access our super secret pages</div>
          <button className="block">
            <Link href="/hello">To the secret</Link>
          </button>
          <button onClick={signOut}>sign out</button> */}
          <Layout pageTitle="My Help">
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {helpData.map((help) => (
                <PostCard help={help} key={help._id} savedHelp={savedHelp} />
              ))}
            </ul>
          </Layout>
        </>
      )}
    </>
  );
}
