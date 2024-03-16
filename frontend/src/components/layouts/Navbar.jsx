import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useLocation,
} from "react-router-dom";
import ekyc from "./eKYC.png";

const Navbar = () => {
  const location = useLocation();

  const showNavbar = location.pathname !== "/";
  return (
    <header className="" style={{ display: showNavbar ? "block" : "none" }}>
      <div className="mx-auto rounded-b-xl flex justify-evenly h-24 max-w-screen-lg bg-[#D9D9D9] items-center gap-8 px-4 sm:px-6 lg:px-8 p-2">
        <a className="block text-teal-600" href="#">
          <div className="">
            <Link to="/">
              <img
                src="https://1000logos.net/wp-content/uploads/2021/11/Standard-Chartered-logo.png"
                alt="Standard Charted Logo"
                className="lg:h-20 h-12"
              />
            </Link>
          </div>
        </a>
        <div className="w-0.5 h-12 bg-gray-500"></div>
        <div className="block text-teal-600">
          <img src={ekyc} alt="eKYC" className="lg:h-20 h-12" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
