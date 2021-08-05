import { MailIcon, PhoneIcon, HeartIcon } from "@heroicons/react/solid";
import axios from "axios";
import moment from "moment";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/outline";
import Head from "next/head";

export default function Help() {
  const [session, loading] = useSession();
  const router = useRouter();
  const [help, setHelp] = useState(null);
  const [savedHelp, setSavedHelp] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [isRequestHelp, setIsRequestHelp] = useState(false);

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

      if (data == "") {
        router.push("/");
        return;
      }

      setHelp(data);

      let { savedHelp, requestHelp, provideHelp } = session.dbUser;
      if (
        (data.isRequestHelp === true &&
          requestHelp != null &&
          data._id.toString() === requestHelp) ||
        (data.isRequestHelp === false && provideHelp != null && data._id.toString() === provideHelp)
      ) {
        setIsRequestHelp(data.isRequestHelp);
        setShowDeleteButton(true);
      }

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
          <Head>
            <title>Help Details | TolongCariKerja</title>
          </Head>
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
                              className={`px-2 py-1 text-xs font-medium rounded-full text-yellow-800 bg-yellow-200 mr-2`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {help.creator.contact != null ? (
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                            <dd className="mt-1 text-sm text-gray-900">{help.creator.contact}</dd>
                          </div>
                        ) : null}

                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">Message</dt>
                          <dd className="mt-1 text-sm text-gray-900">{help.message}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="flex justify-between mt-5">
                    <div className="flex justify-start items-center ">
                      <a
                        href={`mailto:${help.creator.email}`}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
                      >
                        <MailIcon className="w-5 h-5 text-white" aria-hidden="true" />
                        <span className="ml-3">Email</span>
                      </a>

                      {help.creator.contact != null ? (
                        <a
                          href={`tel:${help.creator.contact}`}
                          className="ml-4 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
                        >
                          <PhoneIcon className="w-5 h-5 text-white" aria-hidden="true" />
                          <span className="ml-3">Call</span>
                        </a>
                      ) : null}
                    </div>

                    {showDeleteButton === true ? (
                      <div className="flex items-center justify-right">
                        <a
                          href={
                            isRequestHelp === true ? "/request-help/edit" : "/provide-help/edit"
                          }
                          className="mr-4 inline-flex cursor-pointer items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
                        >
                          Edit
                        </a>

                        <a
                          onClick={async () => {
                            let url = "";

                            if (isRequestHelp === true) {
                              url = "/api/request-help";
                            } else {
                              url = "/api/provide-help";
                            }

                            await axios({
                              method: "delete",
                              url,
                            });

                            router.push("/");
                          }}
                          className="inline-flex cursor-pointer items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                        >
                          Delete
                        </a>
                      </div>
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
