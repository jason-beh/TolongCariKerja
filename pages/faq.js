/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Layout from "../components/Layout";

const faqs = [
  {
    question: "What does TolongCariKerja mean?",
    answer:
      "TolongCariKerja is a phrase in Bahasa Malaysia, which is Malaysia's national language. In English, it literally translates to 'Help Find Job'. TolongCariKerja is therefore a name to help people in Malaysia to find jobs, especially people's jobs who are affected by COVID-19.",
  },
  {
    question: "Why was TolongCariKerja created?",
    answer:
      "TolongCariKerja was originally created to support #KitaJagaKita movement. We noticed the overwhelming need to help people across Malaysia. As most #KitaJagaKita apps have emerged to ensure basic necessities such as food are provided, TolongCariKerja is an initiative to help support the movement further by providing everyone a platform to look for jobs based on their needs and skills.",
  },
  {
    question: "What is the key feature of TolongCari Kerja",
    answer:
      "TolongCariKerja offers an easy-to-use platform for everyone. Our value proposition is utilizing Azure's AI services, namely Speech-To-Text and Translator services, to ease natural language barriers and allow them to speak directly when they are requesting for help.",
  },
  {
    question: "Is TolongCariKerja still in development?",
    answer:
      "With our diligent and rigorous development timeline, we hope to add other features such as language support and search functions to help users. Furthermore, we want to add Azure's Personaliser service to recommend jobs to users based on their previous liked jobs. In the future, we might want to add additional form validation and matching feature also.",
  },
  {
    question: "Who is the creator of TolongCariKerja?",
    answer: "TolongCariKerja is created by Jason Beh.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <Layout>
      <Head>
        <title>FAQ | TolongCariKerja</title>
      </Head>
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
              <p className="font-normal mt-6 text-lg text-gray-500">
                Can’t find the answer you’re looking for? Email our{" "}
                <a
                  href="mailto:behjieshen@gmail.com"
                  className="font-medium text-sky-600 hover:text-sky-500"
                >
                  customer support
                </a>{" "}
                team.
              </p>
            </h2>

            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                          <span className="font-medium text-gray-900">{faq.question}</span>
                          <span className="ml-6 h-7 flex items-center">
                            <ChevronDownIcon
                              className={classNames(
                                open ? "-rotate-180" : "rotate-0",
                                "h-6 w-6 transform"
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="text-base text-gray-500">{faq.answer}</p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Layout>
  );
}
