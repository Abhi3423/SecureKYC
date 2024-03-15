import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { DataContext } from "../../shared/containers/provider";
import ReactAudioPlayer from "react-audio-player";
import { HOST } from "../../shared/const/const";
import SuccessModal from "../../UI/successModal";
import { useNavigate } from "react-router-dom";

function VerifiedKyc() {
  const UserDetails = {
    name: "John Doe",
    DOB: "01/01/1990",
    AdhaarNo: "1234 5678 9012",
    PanNo: "ABCDE1234F",
    Occupation: "Student",
    SalaryRange: "0-2L",
    adhaarCardFile: "adhaar-card.jpg",
    panCardFile: "pan-card.jpg",
  };
  let {
    startContent,
    speechContent,
    setspeechContent,
    setstep,
    verified,
    setVerified,
    data,
    setData,
  } = useContext(DataContext);
  const [register, setregister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleSubmit = () => {
      axios
        .get(`${HOST}/get_user_data`)
        .then((response) => {
          console.log(response.data);
          // Handle the response data as needed
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    handleSubmit();
  }, []);

  const handleRetake = () => {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  };

  const handleRegister = () => {
    setregister(true);
    setTimeout(() => {
      setregister(false);
      navigate("/");
    }, 8000);
  };

  return (
    <div className="bg-[url('https://logowik.com/content/uploads/images/standard-chartered-bank-new-20211713.jpg')] bg-center bg-contain">
      <article className="rounded-xl border border-blue-700 bg-gray-100 p-4 m-4 mt-11">
        {verified && data && (
          <>
            <div className="rounded-lg border border-blue-500 p-4 flex items-center justify-between ">
              <div className="mx-auto ">
                <img
                  src="/adhaar.png"
                  alt="adhaar card"
                  className="w-40 h-40"
                />
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg border mt-2">
              <div className="px-4 py-5 sm:px-6 flex space-x-1 border-b">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Verifier User Details
                </h3>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png"
                  className="w-6 h-6"
                  alt="verified icon"
                />
              </div>
              <div className="px-4 py-5 sm:px-6 flex space-x-1 items-center justify-between">
                <div className="items-center justify-between flex-col space-y-1">
                  <p>Adhaar Card</p>
                  <div className="flex justify-center">
                    <a
                      className="bg-gray-600 text-white p-1 rounded-full mt-1 text-sm"
                      href={`"${data.adhaar_url.replace(/"/g, "")}"`}
                    >
                      View
                    </a>
                  </div>
                </div>
                <div className="space-y-1">
                  <p>Pand Card</p>
                  <div className="flex justify-center">
                    <a
                      className="bg-gray-600 text-white p-1 rounded-full mt-1 text-sm"
                      href={UserDetails.panCardFile}
                    >
                      View
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="divide-y divide-gray-200">
                  <div className="py-3 sm:py-5 grid grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.name}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 grid grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">DOB</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.dob}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 grid grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Adhaar No
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.aadhar_number}
                    </dd>
                  </div>
                  {/* <div className="py-3 sm:py-5 grid grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Pan Card No</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {UserDetails.PanNo}
                                        </dd>
                                    </div> */}
                  {/* <div className="py-3 sm:py-5 grid grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {UserDetails.Occupation}
                                        </dd>
                                    </div> */}
                  {/* <div className="py-3 sm:py-5 grid grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">
                                            Salary Range
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {UserDetails.SalaryRange}
                                        </dd>
                                    </div> */}

                  <div className="py-3 sm:py-5 grid grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Signature File
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <a
                        className="bg-gray-300 p-1 rounded-md mt-1"
                        href={`"${data.signature_url.replace(/"/g, "")}"`}
                      >
                        View
                      </a>
                    </dd>
                  </div>

                  <ReactAudioPlayer
                    id="audio"
                    src={Object.values(speechContent)[11]}
                    autoPlay={true}
                  />
                </dl>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="mt-3 inline-flex items-center gap-2 rounded border border-gray-500 bg-gray-500 px-8 py-3 text-white hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring active:text-gray-500">
                <span className="text-sm font-medium"> Finish </span>
                <svg
                  className="size-5 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
        {!verified && (
          <>
            <div>Details were Incorrect! Retry Process</div>
            <button
              onClick={() => handleRetake()}
              className="mt-3 inline-flex items-center gap-2 rounded border border-red-500 bg-red-500 px-8 py-3 text-white hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500"
            >
              <span className="text-sm font-medium"> ReTake </span>

              <svg
                className="size-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </>
        )}
        {register && (
          <>
            <SuccessModal successState={register}>
              <div>
                <img
                  src="/verified.png"
                  alt="adhaar card logo"
                  className="w-40 h-40"
                />
                <ReactAudioPlayer
                  id="audio"
                  src={Object.values(speechContent)[12]}
                  autoPlay={true}
                  onEnded={handleRegister}
                />
                <div className="flex flex-col gap-4 py-3">
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSdA_yLEvDYZEVMJXFuZnm1EZ7EPn_Ja0CUft2XeJEViZibQ6w/viewform?usp=sf_link">
                    <div className="underline underline-offset-2">
                      Survery Form
                    </div>
                  </a>
                </div>
              </div>
            </SuccessModal>
          </>
        )}
      </article>
    </div>
  );
}

export default VerifiedKyc;
