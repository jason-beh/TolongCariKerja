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
  const [hasFetchedData, setHasFetchedData] = useState(false);

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

      setHasFetchedData(true);
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
          <Layout pageTitle="Home">
            {hasFetchedData === false ? (
              <div className={`flex justify-center h-2/3 w-full items-center`}>
                <img className="w-10 h-10 animate-spin" src="/images/loading.svg" />
              </div>
            ) : null}

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
