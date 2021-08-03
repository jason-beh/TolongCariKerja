import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, UserCircleIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useFormik } from "formik";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import CreatableSelect from "react-select/creatable";
import * as Yup from "yup";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
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
      console.log(session);

      let initialProfile = {};

      for (var key in profileData) {
        if (profileData.hasOwnProperty(key)) {
          initialProfile[key] = userData[key] || "";
        }
      }

      console.log(initialProfile);

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
    onSubmit: async (values) => {
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
                  <nav
                    className={classNames(
                      open ? "bg-sky-900" : "bg-transparent",
                      "relative z-10 border-b border-teal-500 border-opacity-25 lg:bg-transparent lg:border-none"
                    )}
                  >
                    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                      <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-sky-800">
                        <div className="px-2 flex items-center lg:px-0">
                          <div className="flex-shrink-0">
                            <img
                              className="block h-8 w-auto"
                              src="https://tailwindui.com/img/logos/workflow-mark-teal-400.svg"
                              alt="Workflow"
                            />
                          </div>
                          <div className="hidden lg:block lg:ml-6 lg:space-x-4">
                            <div className="flex">
                              {navigation.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className={classNames(
                                    item.current ? "bg-black bg-opacity-25" : "hover:bg-sky-800",
                                    "rounded-md py-2 px-3 text-sm font-medium text-white"
                                  )}
                                >
                                  {item.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex lg:hidden">
                          {/* Mobile menu button */}
                          <Disclosure.Button className="p-2 rounded-md inline-flex items-center justify-center text-sky-200 hover:text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                              <XIcon className="block flex-shrink-0 h-6 w-6" aria-hidden="true" />
                            ) : (
                              <MenuIcon
                                className="block flex-shrink-0 h-6 w-6"
                                aria-hidden="true"
                              />
                            )}
                          </Disclosure.Button>
                        </div>
                        <div className="hidden lg:block lg:ml-4">
                          <div className="flex items-center">
                            {/* Profile dropdown */}
                            <Menu as="div" className="relative flex-shrink-0 ml-4">
                              {({ open }) => (
                                <>
                                  <div>
                                    <Menu.Button className="rounded-full flex text-sm text-white focus:outline-none focus:bg-sky-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-900 focus:ring-white">
                                      <span className="sr-only">Open user menu</span>
                                      <img
                                        className="rounded-full h-8 w-8"
                                        src={profileImage}
                                        alt=""
                                      />
                                    </Menu.Button>
                                  </div>
                                  <Transition
                                    show={open}
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                  >
                                    <Menu.Items
                                      static
                                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                      {userNavigation.map((item) => (
                                        <Menu.Item key={item.name}>
                                          {({ active }) => (
                                            <a
                                              href={item.href}
                                              className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "block py-2 px-4 text-sm text-gray-700"
                                              )}
                                            >
                                              {item.name}
                                            </a>
                                          )}
                                        </Menu.Item>
                                      ))}
                                    </Menu.Items>
                                  </Transition>
                                </>
                              )}
                            </Menu>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Disclosure.Panel className="bg-sky-900 lg:hidden">
                      <div className="pt-2 pb-3 px-2 space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current ? "bg-black bg-opacity-25" : "hover:bg-sky-800",
                              "block rounded-md py-2 px-3 text-base font-medium text-white"
                            )}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <div className="pt-4 pb-3 border-t border-sky-800">
                        <div className="flex items-center px-4">
                          <div className="flex-shrink-0">
                            <img className="rounded-full h-10 w-10" src={profileImage} alt="" />
                          </div>
                          <div className="ml-3">
                            <div className="text-base font-medium text-white">{user.name}</div>
                            <div className="text-sm font-medium text-sky-200">{user.email}</div>
                          </div>
                          <button className="ml-auto flex-shrink-0 rounded-full p-1 text-sky-200 hover:bg-sky-800 hover:text-white focus:outline-none focus:bg-sky-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-900 focus:ring-white">
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-3 px-2">
                          {userNavigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block rounded-md py-2 px-3 text-base font-medium text-sky-200 hover:text-white hover:bg-sky-800"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </nav>
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
                      <h1 className="text-3xl font-bold text-white">Settings</h1>
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
                                ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700"
                                : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                              "group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-teal-500 group-hover:text-teal-500"
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
                                className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
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
