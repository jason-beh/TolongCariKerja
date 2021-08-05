import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { MailIcon, PhoneIcon, BookmarkIcon, PlusIcon } from "@heroicons/react/solid";
import truncateString from "../utils/truncateString";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import classNames from "../utils/classNames";
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
            {isDisabled === true || helpData.length == 0 ? (
              <RedirectPrompt message="You haven't created any help at the moment." />
            ) : (              <>
              <div className="flex items-center my-10">
                <a
                  href="/request-help/edit"
                  className="mr-4 relative inline-flex items-center px-4 py-2 img border-transparent text-sm font-medium rounded-md text-white bg-gray-600 shadow-sm hover:bg-gray-700 focus:outline-none"
                >
                  Edit Request Help
                </a>
                <a
                  href="/provide-help/edit"
                  className="relative inline-flex items-center px-4 py-2 img border-transparent text-sm font-medium rounded-md text-white bg-gray-600 shadow-sm hover:bg-gray-700 focus:outline-none"
                >
                  Edit Provide Help
                </a>
              </div>

              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {helpData.map((help) => (
                  <PostCard help={help} key={help._id} savedHelp={savedHelp} />
                ))}
              </ul>
            </>)}
          </Layout>
        </>
      )}
    </>
  );
}
