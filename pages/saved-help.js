import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import RedirectPrompt from "../components/RedirectPrompt";

export default function Index() {
  const [session, loading] = useSession();
  const router = useRouter();

  const [helpData, setHelpData] = useState([]);
  const [savedHelp, setSavedHelp] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }

    async function fetchData(session) {
      let savedHelpIds = session.dbUser.savedHelp;

      if (savedHelpIds.length === 0) {
        setIsDisabled(true);
        return;
      }

      let helpPromises = [];

      savedHelpIds.forEach((savedHelp) => {
        let tempPromise = axios.get(`/api/help/${savedHelp}`);
        helpPromises.push(tempPromise);
      });

      Promise.all(helpPromises).then((values) => {
        let data = values.map((help) => help.data);
        setHelpData(data);
      });
    }

    if (!loading && session) {
      // console.log(session);
      fetchData(session);
      setSavedHelp(session.dbUser.savedHelp || []);
    }
  }, [loading, session]);

  const refreshOnSave = (id) => {
    let updatedHelpData = helpData.filter((help) => {
      return help._id != id;
    });

    setHelpData(updatedHelpData);
  };

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

          <Layout pageTitle="Saved Help">
            {isDisabled === true || helpData.length == 0 ? (
              <RedirectPrompt message="There are no saved help to be found." />
            ) : (
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {helpData.map((help) => (
                  <PostCard
                    refreshOnSave={() => refreshOnSave(help._id)}
                    help={help}
                    key={help._id}
                    savedHelp={savedHelp}
                  />
                ))}
              </ul>
            )}
          </Layout>
        </>
      )}
    </>
  );
}
