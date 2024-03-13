import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="block text-teal-600" href="#">
          <span className="sr-only">Home</span>
          <div className="w-16 h-14">
            <img
              src="/scLogo.png"
              alt="Standard Charted Logo"
              className=" w-16 h-14"
            />
          </div>
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  {" "}
                </a>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  {" "}
                </a>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  {" "}
                </a>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  {" "}
                </a>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  {" "}
                </a>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  {" "}
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                href="#"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
