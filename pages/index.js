import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

    async function fetchData() {
      let { data } = await axios({
        method: "get",
        url: `/api/help/`,
      });

      setHelpData(data);
    }

    if (!loading && session) {
      fetchData();
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
          <Layout pageTitle="Home">
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
