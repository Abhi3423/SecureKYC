import React from "react";
import { DataContext } from "../../shared/containers/provider";
import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { data } = useContext(DataContext);
  return (
    <Fragment>
      <div class="bg-white pb-2 h-screen mx-auto flex justify-center md:max-w-screen-2xl ">
        <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
          <section class="flex flex-col gap-10 lg:gap-0 justify-center items-center">
            <div class="h-36 bg-white z-10 overflow-hidden rounded-lg lg:h-auto xl:w-5/12 items-center">
              <img
                src="https://1000logos.net/wp-content/uploads/2021/11/Standard-Chartered-logo.png"
                loading="lazy"
                alt=" by Fakurian Design"
                class="w-full lg:max-h-80 object-cover object-center sm:object-fill"
              />
            </div>
            <div class="flex border border-[#0473EA] lg:relative bottom-16 rounded-2xl px-4 shadow-xl py-12 lg:py-24 flex-col justify-center items-center text-left">
              <p class="leading-relaxed text-[#0473EA] font-semibold lg:w-4/5 xl:text-xl">
                Standard Chartered is proud to offer an innovative and secure
                eKYC service to our valued customers. <br /> <br />
                With eKYC, we are revolutionizing the onboarding process, making
                it more convenient, efficient, and seamless. <br /> <br />
                Customers can verify their identities remotely, eliminating the
                need for physical paperwork and in-person visits to branches.
              </p>
            </div>
            <div>
              <div class="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  to="/kyc-process"
                  class="inline-block rounded-lg bg-blue-500 px-8 py-3 text-center text-sm font-semibold shadow-xl text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
