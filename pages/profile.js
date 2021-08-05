import { Disclosure } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/outline";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useFormik } from "formik";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import CreatableSelect from "react-select/creatable";
import * as Yup from "yup";
import Notification from "../components/Notification";

const user = {
  name: "Debbie Lewis",
  handle: "deblewis",
  email: "debbielewis@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
};
const navigation = [{ name: "Dashboard", href: "#", current: true }];
const subNavigation = [{ name: "Profile", href: "#", icon: UserCircleIcon, current: true }];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const [session, loading] = useSession();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState("");
  const [profileData, setProfileData] = useState({
    name: "",
    contact: "",
    location: "",
    skills: "",
  });
  const [showNotification, setShowNotification] = useState(false);
  const [creatableSkills, setCreatableSkills] = useState(null);

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }

    if (!loading && session) {
      let userData = session.dbUser;

      setProfileImage(userData.image || "/images/user-placeholder.jpeg");
      // console.log(session);

      let initialProfile = {};

      for (var key in profileData) {
        if (profileData.hasOwnProperty(key)) {
          initialProfile[key] = userData[key] || "";
        }
      }

      // console.log(initialProfile);

      let skills = [];
      userData.skills.forEach((skill) => {
        skills.push({
          label: skill,
          value: skill,
        });
      });
      setCreatableSkills(skills);

      setProfileData(initialProfile);
    }
  }, [loading, session]);

  const formik = useFormik({
    initialValues: profileData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("This field is required."),
      location: Yup.string().required("This field is required."),
      contact: Yup.string().required("This field is required."),
      skills: Yup.array().min(1, "Please add at least one skill."),
    }),
    onSubmit: async (values, { resetForm }) => {
      let { data } = await axios({
        method: "post",
        url: `/api/profile/update`,
        data: values,
      });

      if (data == "success") {
        setShowNotification(true);

        setTimeout(() => {
          setShowNotification(false);
        }, 4000);
      }
    },
  });

  const handleProfileImageUpload = async (e) => {
    // Upload image
    const uploadImageData = new FormData();
    uploadImageData.append("file", e.target.files[0]);
    uploadImageData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
    uploadImageData.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME);

    try {
      let { data } = await axios({
        method: "post",
        url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        data: uploadImageData,
      });

      await axios({
        method: "post",
        url: `/api/profile/deleteImage`,
        data: {
          previousImage: profileImage,
          newImage: data.secure_url,
        },
      });

      setProfileImage(data.secure_url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {session && (
        <>
          <Notification
            title="Profile Updated!"
            description="Your changes are now updated across the whole website."
            show={showNotification}
            setShow={setShowNotification}
          />
          <div>
            <Disclosure as="div" className="relative bg-sky-700 pb-32 overflow-hidden">
              {({ open }) => (
                <>
                  <div
                    className={classNames(
                      open ? "bottom-0" : "inset-y-0",
                      "absolute flex justify-center inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0"
                    )}
                    aria-hidden="true"
                  >
                    <div className="flex-grow bg-sky-900 bg-opacity-75" />
                    <svg
                      className="flex-shrink-0"
                      width={1750}
                      height={308}
                      viewBox="0 0 1750 308"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity=".75"
                        d="M1465.84 308L16.816 0H1750v308h-284.16z"
                        fill="#075985"
                      />
                      <path opacity=".75" d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0c4a6e" />
                    </svg>
                    <div className="flex-grow bg-sky-800 bg-opacity-75" />
                  </div>
                  <header className="relative py-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <a
                        className="flex items-center justify-start mb-5 cursor-pointer hover:opacity-90"
                        href="/"
                      >
                        <ArrowLeftIcon className="mr-3 w-8 h-6 text-white" />
                        <p className="text-xl font-medium text-white">Return to Home</p>
                      </a>

                      <h1 className="text-3xl font-bold text-white">Profile</h1>
                    </div>
                  </header>
                </>
              )}
            </Disclosure>

            <main className="relative -mt-32">
              <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-24 lg:px-8">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                    <aside className="py-6 lg:col-span-3">
                      <nav className="space-y-1">
                        {subNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-sky-50 border-sky-500 text-sky-700 hover:bg-sky-50 hover:text-sky-700"
                                : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                              "group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-sky-500 group-hover:text-sky-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            <span className="truncate">{item.name}</span>
                          </a>
                        ))}
                      </nav>
                    </aside>

                    <form
                      className="divide-y divide-gray-200 lg:col-span-9"
                      onSubmit={formik.handleSubmit}
                    >
                      {/* Profile section */}
                      <div className="py-6 px-4 sm:p-6 lg:pb-24">
                        <div>
                          <h2 className="text-lg leading-6 font-medium text-gray-900">Profile</h2>
                          <p className="mt-1 text-sm text-gray-500">
                            This information will be displayed publicly so be careful what you
                            share.
                          </p>
                        </div>

                        <div className="mt-6 flex flex-col lg:flex-row">
                          <div className="flex-grow space-y-6">
                            {/* Name */}
                            <div>
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Name
                              </label>
                              <div className="mt-1 rounded-md shadow-sm flex">
                                <input
                                  name="name"
                                  id="name"
                                  type="text"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.name}
                                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm"
                                />
                              </div>
                              {formik.touched.name && formik.errors.name ? (
                                <p className="text-sm text-red-400">{formik.errors.name}</p>
                              ) : null}
                            </div>

                            {/* Location */}
                            <div>
                              <label
                                htmlFor="location"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Location
                              </label>
                              <div className="mt-1 rounded-md shadow-sm flex">
                                <input
                                  name="location"
                                  id="location"
                                  type="text"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.location}
                                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm"
                                />
                              </div>
                              {formik.touched.location && formik.errors.location ? (
                                <p className="text-sm text-red-400">{formik.errors.location}</p>
                              ) : null}
                            </div>
                            {/* Contact */}
                            <div>
                              <label
                                htmlFor="contact"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Contact
                              </label>
                              <div className="mt-1 rounded-md shadow-sm flex">
                                <input
                                  name="contact"
                                  id="contact"
                                  type="number"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.contact}
                                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm"
                                />
                              </div>
                              {formik.touched.contact && formik.errors.contact ? (
                                <p className="text-sm text-red-400">{formik.errors.contact}</p>
                              ) : null}
                            </div>
                            <div>
                              <label
                                htmlFor="skills"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Skills
                              </label>
                              <CreatableSelect
                                isMulti
                                className="cursor-pointer"
                                onChange={(e) => {
                                  let flatSkillsArray = e.map((skill) => {
                                    return skill.value;
                                  });
                                  formik.setFieldValue("skills", flatSkillsArray);
                                  setCreatableSkills(e);
                                }}
                                value={creatableSkills}
                                id="skills"
                                instanceId="skills"
                              />
                              {formik.touched.skills && formik.errors.skills ? (
                                <p className="text-sm text-red-400">{formik.errors.skills}</p>
                              ) : null}
                            </div>
                          </div>

                          <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                            <p className="text-sm font-medium text-gray-700" aria-hidden="true">
                              Photo
                            </p>
                            <div className="mt-1 lg:hidden">
                              <div className="flex items-center">
                                <div
                                  className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                                  aria-hidden="true"
                                >
                                  <img
                                    className="rounded-full h-full w-full"
                                    src={profileImage}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-5 rounded-md shadow-sm">
                                  <div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                    <label
                                      htmlFor="user-photo"
                                      className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                                    >
                                      <span>Change</span>
                                      <span className="sr-only"> user photo</span>
                                    </label>
                                    <input
                                      name="user-photo"
                                      type="file"
                                      onChange={handleProfileImageUpload}
                                      className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="hidden relative rounded-full overflow-hidden lg:block">
                              <img
                                className="relative rounded-full w-40 h-40"
                                src={profileImage}
                                alt=""
                              />
                              <label
                                htmlFor="user-photo"
                                className="absolute inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                              >
                                <span>Change</span>
                                <span className="sr-only"> user photo</span>
                                <input
                                  type="file"
                                  name="user-photo"
                                  onChange={handleProfileImageUpload}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                        <button
                          type="submit"
                          className="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </>
      )}
    </>
  );
}
