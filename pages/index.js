import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import truncateString from "../utils/truncateString";
import Layout from "../components/Layout";

export default function Index() {
  const [session, loading] = useSession();
  const router = useRouter();

  const [helpData, setHelpData] = useState([]);

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
                <Link key={help._id} href={`help/${help._id}`}>
                  <li className="col-span-1 flex flex-col hover:opacity-80 cursor-pointer text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                    <div className="flex-1 flex flex-col p-8">
                      <img
                        className="w-32 h-32 flex-shrink-0 mx-auto bg-black rounded-full"
                        src={
                          help.creatorUid.image === ""
                            ? "images/user-placeholder.jpeg"
                            : help.creatorUid.image
                        }
                        alt=""
                      />
                      <dl className="mt-1 flex flex-col justify-between">
                        <dd className="mt-3">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              help.isRequestHelp === true
                                ? "text-green-800 bg-green-100"
                                : "text-blue-800 bg-blue-100"
                            }`}
                          >
                            {help.isRequestHelp === true ? "Seeking a Job" : "Providing a Job"}
                          </span>
                        </dd>
                      </dl>

                      <h3 className="mt-4 text-gray-900 text-2xl font-bold">
                        {help.creatorUid.name}
                      </h3>

                      <p className="mt-3 text-sm text-center">{truncateString(help.message, 100)}</p>

                      <dl className="mt-4 flex-grow flex flex-col justify-between">
                        <dd className="mt-3">
                          {help.skills.map((skill, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 text-xs font-medium rounded-full text-yellow-800 bg-yellow-200`}
                            >
                              {skill}
                            </span>
                          ))}
                        </dd>
                      </dl>
                    </div>
                    <div>
                      <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="w-0 flex-1 flex">
                          <a
                            href={`mailto:${help.creatorUid.email}`}
                            className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                          >
                            <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                            <span className="ml-3">Email</span>
                          </a>
                        </div>

                        {help.creatorUid.contact != null ? (
                          <div className="-ml-px w-0 flex-1 flex">
                            <a
                              href={`tel:+60${help.creatorUid.contact}`}
                              className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                            >
                              <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                              <span className="ml-3">Call</span>
                            </a>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </Layout>
        </>
      )}
    </>
  );
}
