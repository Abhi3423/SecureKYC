import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useLocation,
} from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const showNavbar = location.pathname !== "/";
  return (
    <header
      className="bg-white"
      style={{ display: showNavbar ? "block" : "none" }}
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 p-2 m-2">
        <a className="block text-teal-600" href="#">
          <span className="sr-only">Home</span>
          <div className="w-16 h-14">
            <Link to="/">
              <img
                src="https://1000logos.net/wp-content/uploads/2021/11/Standard-Chartered-logo.png"
                alt="Standard Charted Logo"
                className=" w-16 h-14"
              />
            </Link>
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
            <div className="sm:flex sm:gap-4 w-16 h-14">
              <img src="/kyclogo.png" alt="KYC logo" className="w-16 h-14" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
