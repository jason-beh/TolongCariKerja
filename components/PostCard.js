import { MailIcon, PhoneIcon, BookmarkIcon, HeartIcon } from "@heroicons/react/solid";
import truncateString from "../utils/truncateString";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/outline";
import axios from "axios";

export default function PostCard({ help, savedHelp, refreshOnSave = null }) {
  const [isSaved, setIsSaved] = useState(savedHelp.includes(help._id));

  async function savePost(id, isSaved) {
    let { data } = await axios.post(`/api/help/save`, { id, isSaved });
  }

  return (
    <li className="col-span-1 flex flex-col cursor-pointer text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <a
        key={help._id}
        href={`help/${help._id}`}
        className="flex-1 flex flex-col p-8 hover:opacity-80"
      >
        <img
          className="w-32 h-32 flex-shrink-0 mx-auto bg-white rounded-full"
          src={help.creator.image === "" ? "images/user-placeholder.jpeg" : help.creator.image}
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

        <h3 className="mt-4 text-gray-900 text-2xl font-bold">{help.creator.name}</h3>

        <p className="mt-3 text-sm text-center">{truncateString(help.message, 100)}</p>

        <dl className="mt-4 flex-grow flex flex-col justify-between">
          <dd className="mt-3">
            {help.skills.map((skill, index) => (
              <span
                key={index}
                className={`px-2 py-1 text-xs font-medium rounded-full text-yellow-800 bg-yellow-200 mr-2`}
              >
                {skill}
              </span>
            ))}
          </dd>
        </dl>
      </a>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="w-0 flex-1 flex">
            <a
              href={`mailto:${help.creator.email}`}
              className="relative -mr-px w-0 flex-1 hover:opacity-80 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
            >
              <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">Email</span>
            </a>
          </div>

          {help.creator.contact != null ? (
            <div className="-ml-px w-0 flex-1 flex">
              <a
                href={`tel:+60${help.creator.contact}`}
                className="relative w-0 flex-1 hover:opacity-80 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
              >
                <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                <span className="ml-3">Call</span>
              </a>
            </div>
          ) : null}

          <div className="-ml-px w-0 flex-1 flex">
            <div
              onClick={async () => {
                setIsSaved(!isSaved);
                await savePost(help._id, !isSaved);
                if (refreshOnSave != null) {
                  await refreshOnSave();
                }
              }}
              className={`relative w-0 flex-1 hover:opacity-80 inline-flex items-center justify-center py-4 text-sm font-medium border border-transparent rounded-br-lg ${
                isSaved ? "text-red-500" : "text-gray-700"
              }`}
            >
              {isSaved === true ? (
                <HeartIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <HeartOutlineIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
