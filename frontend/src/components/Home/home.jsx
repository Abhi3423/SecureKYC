import React from "react";
import { DataContext } from "../../shared/containers/provider";
import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { data } = useContext(DataContext);
  return (
    <Fragment>
      <div class="bg-white pb-6 h-screen flex md:mt-11 md:max-w-screen-2xl ">
        <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
          <section class="flex flex-col justify-between gap-6 sm:gap-10 md:gap-13 lg:flex-row">
            <div class="h-48 overflow-hidden rounded-lg  lg:h-auto xl:w-5/12 items-center">
              <img
                src="https://1000logos.net/wp-content/uploads/2021/11/Standard-Chartered-logo.png"
                loading="lazy"
                alt=" by Fakurian Design"
                class="h-full w-full object-cover object-center sm:object-fill"
              />
            </div>
            <div class="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
              <p class="mb-4 font-semibold text-blue-500 md:mb-6 md:text-lg xl:text-xl">
                Very proud to introduce
              </p>

              <h1 class="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">
                Revolutionary way to process eKYC
              </h1>

              <p class="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">
                we are proud to offer an innovative and secure eKYC service to
                our our Valued Customer With eKYC, we are revolutionizing the
                onboarding process making it more onvinient, efficient and
                seamless Customer can verify their identities remotely,
                eliminating the need for physical paper and in person
                verification.
              </p>

              <div class="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  to="/kyc-process"
                  class="inline-block rounded-lg bg-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
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
