import { MailIcon, PhoneIcon, HeartIcon } from "@heroicons/react/solid";
import axios from "axios";
import moment from "moment";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/outline";

export default function Help() {
  const [session, loading] = useSession();
  const router = useRouter();
  const [help, setHelp] = useState(null);
  const [savedHelp, setSavedHelp] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  async function savePost(id, isSaved) {
    let { data } = await axios.post(`/api/help/save`, { id, isSaved });
  }

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }

    async function fetchData() {
      const { id } = router.query;
      let { data } = await axios({
        method: "get",
        url: `/api/help/${id}`,
      });
      console.log(data);
      setHelp(data);

      let { savedHelp } = session.dbUser;
      setSavedHelp(savedHelp);
      setIsSaved(savedHelp.includes(data._id));
    }

    if (!loading && session) {
      fetchData();
    }
  }, [loading, session]);

  return (
    <>
      {session && !loading && help != null && (
        <Layout>
          <main className="py-10">
            {/* Page header */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
              <div className="flex items-center space-x-5">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      className="h-16 w-16 rounded-full"
                      src={
                        help.creator.image === ""
                          ? "/images/user-placeholder.jpeg"
                          : help.creator.image
                      }
                      alt=""
                    />
                    <span
                      className="absolute inset-0 shadow-inner rounded-full"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{help.creator.name}</h1>
                  <p className="text-sm font-medium text-gray-500">
                    Created on {moment(help.createdAt).format("DD MMMM YYYY")}
                  </p>
                </div>
              </div>

              <div
                onClick={() => {
                  setIsSaved(!isSaved);
                  savePost(help._id, !isSaved);
                }}
                className={`bg-white flex items-center cursor-pointer hover:opacity-90 justify-center shadow-md px-4 py-2 text-sm font-medium border border-transparent rounded-md ${
                  isSaved === true ? "text-red-500" : "text-gray-700"
                }`}
              >
                {isSaved === true ? (
                  <HeartIcon className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <HeartOutlineIcon className="w-5 h-5" aria-hidden="true" />
                )}

                <span className="ml-3">{isSaved === true ? "Unsave" : "Save"}</span>
              </div>
            </div>

            <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
              <div className="space-y-6 lg:col-start-1 lg:col-span-3">
                {/* Description list*/}
                <section aria-labelledby="applicant-information-title">
                  <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="applicant-information-title"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Detailed Information
                      </h2>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Type</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {help.isRequestHelp === true ? "Requesting for Job" : "Providing a Job"}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Email</dt>
                          <dd className="mt-1 text-sm text-gray-900">{help.creator.email}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Skills</dt>
                          {help.skills.map((skill, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 text-xs font-medium rounded-full text-yellow-800 bg-yellow-200`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {help.creator.contact != null ? (
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                            <dd className="mt-1 text-sm text-gray-900">+1 555-555-5555</dd>
                          </div>
                        ) : null}

                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">Message</dt>
                          <dd className="mt-1 text-sm text-gray-900">{help.message}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="flex justify-start items-center mt-5">
                    <a
                      href={`mailto:${help.creator.email}`}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
                    >
                      <MailIcon className="w-5 h-5 text-white" aria-hidden="true" />
                      <span className="ml-3">Email</span>
                    </a>

                    {help.creator.contact != null ? (
                      <a
                        href={`tel:+60${help.creator.contact}`}
                        className="ml-4 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
                      >
                        <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                        <span className="ml-3">Call</span>
                      </a>
                    ) : null}
                  </div>
                </section>
              </div>
            </div>
          </main>
        </Layout>
      )}
    </>
  );
}
