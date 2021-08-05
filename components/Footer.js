/* This example requires Tailwind CSS v2.0+ */
const navigation = {
  main: [
    { name: "Home", href: "/home" },
    { name: "FAQ", href: "/faq" },
  ],
  requestHelp: [
    { name: "Request New Help", href: "/request-help/new" },
    { name: "Edit Help Request", href: "/request-help/edit" },
  ],
  provideHelp: [
    { name: "Provide New Help", href: "/provide-help/new" },
    { name: "Edit Help Provision", href: "/provide-help/edit" },
  ],
  personal: [
    { name: "My Help", href: "/my-help" },
    { name: "Saved Help", href: "/saved-help" },
    { name: "Profile", href: "/profile" },
  ],
};

export default function Example() {
  return (
    <footer className="bg-gray-800 mt-24" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <img className="h-10" src="/images/logo-white.svg" alt="Company name" />
            <p className="text-gray-400 text-base">
              Making Malaysia a better place through #KitaJagaKita.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Main
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Personal
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.personal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Request Help
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.requestHelp.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Provide Help
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.provideHelp.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2021 TolongCariKerja by Jason Beh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
