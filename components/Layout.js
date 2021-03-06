/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, PlusIcon, XIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import classNames from "../utils/classNames";
import Footer from "./Footer";
import Head from "next/head";

const navigation = [
  {
    link: "/",
    title: "Home",
  },
  {
    link: "/faq",
    title: "FAQ Us",
  },
  {
    link: "/request-help/new",
    title: "Request New Help",
  },
  {
    link: "/provide-help/new",
    title: "Provide New Help",
  },
];

export default function Layout({ children, pageTitle = "" }) {
  const [profileImage, setProfileImage] = useState("/images/user-placeholder.jpeg");
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }

    if (!loading && session) {
      let { image, name } = session.dbUser;
      if (image != null && image != "") {
        setProfileImage(image);
      }
    }
  }, [loading, session]);

  return (
    <div>
      {pageTitle != "" ? (
        <Head>
          <title>{pageTitle} | TolongCariKerja</title>
        </Head>
      ) : null}

      <Disclosure as="nav" className="bg-sky-700">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <a href="/">
                      <img className="h-8" src="/images/logo-white.svg" />
                    </a>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <a
                        href="/"
                        className="text-white hover:bg-sky-600 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Home
                      </a>
                      <a
                        href="/faq"
                        className="text-white hover:bg-sky-600 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        FAQ
                      </a>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <Menu as="div" className="mr-5 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="relative inline-flex items-center px-4 py-2 img border-transparent text-sm font-medium rounded-md text-white bg-gray-700 shadow-sm hover:bg-gray-800 focus:outline-none">
                              <span>Create New </span>
                              <PlusIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 static z-50 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="/request-help/new"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Request New Help
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="/provide-help/new"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Provide New Help
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="max-w-xs bg-sky-700 rounded-full px-3 py-2 hover:bg-sky-600 flex items-center text-sm text-white focus:outline-none">
                              <img className="h-8 w-8 rounded-full" src={profileImage} alt="" />
                              <ChevronDownIcon className="ml-2 w-5 h-5" />
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
                              className="origin-top-right absolute right-0 mt-2 static z-50 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="/my-help"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    My Help
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="/saved-help"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Saved Help
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="/profile"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Profile
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    onClick={signOut}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Logout
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-sky-200 hover:text-white hover:bg-sky-600 hover:bg-opacity-75 focus:outline-none">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item, itemIdx) => (
                  <a
                    key={itemIdx}
                    href={item.link}
                    className="text-white hover:bg-sky-600 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-sky-400">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={profileImage} alt="" />
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <a
                    href="/my-help"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-sky-600 hover:bg-opacity-75"
                  >
                    My Help
                  </a>
                  <a
                    href="/saved-help"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-sky-600 hover:bg-opacity-75"
                  >
                    Saved Help
                  </a>
                  <a
                    href="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-sky-600 hover:bg-opacity-75"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    onClick={signOut}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-sky-600 hover:bg-opacity-75"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main>
        <div className="w-10/12 sm:max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {pageTitle != "" ? <h1 className="text-3xl font-bold mt-5 mb-10">{pageTitle}</h1> : null}

          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
