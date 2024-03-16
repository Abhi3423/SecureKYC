import React, { useState, useContext } from "react";
import ReactAudioPlayer from "react-audio-player";
import { DataContext } from "../../shared/containers/provider";
import SuccessModal from "../../UI/successModal";
import Loader from "../layouts/Loader";

export const Step1 = () => {
  let { startContent, speechContent, setspeechContent, setstep } =
    useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const handleAudioEnded = () => {
    setLoading(true)
    setTimeout(() => {
      setstep(2);
      setLoading(false)
    }, 5000);
  };
  return (
    <div>
      <div class="flex border border-[#0473EA] lg:mx-28 my-12 rounded-2xl px-4 shadow-lg py-12 lg:py-24 flex-col justify-center items-center text-left">
        <p className="p-4">Your eKYC process is going to start.</p>
        <p className="p-4">
          In the next steps, we'll tell you what you need to have with you in
          order to finish the eKYC process easily.
        </p>
        <ReactAudioPlayer
          id="audio"
          src={Object.values(speechContent)[1]}
          autoPlay={true}
          onEnded={handleAudioEnded}
        />
      </div>
      {
          loading && 
          <SuccessModal successState={loading}>
            <Loader/>
          </SuccessModal>
        }
    </div>
  );
};

export const Step2 = () => {
  let { startContent, speechContent, setspeechContent, setstep } =
    useContext(DataContext);
    const [loading, setLoading] = useState(false);
  const handleAudioEnded = () => {
    setLoading(true)
    setTimeout(() => {
      setstep(3);
      setLoading(false);
    }, 5000);
  };
  return (
    <div className="flex flex-col w-full p-6 lg:p-10 gap-4 lg:flex-row justify-evenly items-start">
      <div className="bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg border border-blue-700 p-4 w-full lg:w-[60%] h-full flex items-center justify-between ">
        <div className="flex flex-col h-full gap-4 mx-auto ">
          <img src="/adhaar.png" alt="adhaar card logo" className="h-[200%]" />
          <img src="/pancard.png" alt="Pan card logo" className="h-[200%]" />
        </div>
      </div>
      <div className="flex flex-col h-full items-center justify-between pb-4">
        <div className="bg-opacity-80 backdrop-filter backdrop-blur-lg flex flex-wrap rounded-xl h-full bg-white max-w-sm border border-blue-700 mx-auto p-2">
          <p className="p-4 lg:mb-20">
            Please keep your <strong>Adhaar Card or Pan card</strong> ready for
            further process
          </p>
          <ReactAudioPlayer
            id="audio"
            src={Object.values(speechContent)[2]}
            autoPlay={true}
            onEnded={handleAudioEnded}
          />
        </div>
        <div className="self mt-8">
          <img src="/icon.png" alt="Sound On" className="h-16" />
        </div>
      </div>
      {
          loading && 
          <SuccessModal successState={loading}>
            <Loader/>
          </SuccessModal>
        }
    </div>
  );
};

// export const Step3 = () => {
//   return (
//     <div>
//       <div className="rounded-lg border border-blue-700 p-4 flex items-center justify-between ">
//         <div className="mx-auto ">
//           <img src="/pancard.png" alt="Pan card logo" className="w-40 h-40" />
//         </div>
//       </div>
//       <div className="flex flex-wrap rounded-xl bg-gray-300 max-w-sm mx-auto mt-8 p-2">
//         <p className="p-4">
//           Please keep your <strong>Pan Card</strong> ready for further process
//         </p>
//       </div>
//     </div>
//   );
// };

export const Step3 = () => {
  let { startContent, speechContent, setspeechContent, setstep } =
    useContext(DataContext);
    const [loading, setLoading] = useState(false);
  const handleAudioEnded = () => {
    setLoading(true)
    setTimeout(() => {
      setstep(4);
      setLoading(false);
    }, 5000);
  };
  return (
    <div className="flex flex-col w-full p-6 lg:p-10 gap-4 lg:flex-row justify-evenly items-start">
      <div className="bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg border border-blue-700 p-4 w-full lg:w-[60%] h-full flex items-center justify-between ">
        <div className="flex flex-col h-full gap-4 mx-auto ">
          <img src="/sig.png" alt="Signature logo" className="h-80 w-80" />
        </div>
      </div>
      <div className="flex flex-col h-full items-center justify-between pb-4">
        <div className="bg-opacity-80 backdrop-filter backdrop-blur-lg flex flex-wrap rounded-xl h-full bg-white max-w-sm border border-blue-700 mx-auto p-2">
          <p className="p-4 lg:mb-20">
            Please keep your <strong>Signature</strong> on a piece of paper
            ready for further process
          </p>
          <ReactAudioPlayer
            id="audio"
            src={Object.values(speechContent)[3]}
            autoPlay={true}
            onEnded={handleAudioEnded}
          />
        </div>
        <div className="self mt-8">
          <img src="/icon.png" alt="Sound On" className="h-16" />
        </div>
      </div>
      {
          loading && 
          <SuccessModal successState={loading}>
            <Loader/>
          </SuccessModal>
        }
    </div>
  );
};

export const Step5 = () => {
  return (
    <div>
      <div className="rounded-lg border border-blue-700 p-4 flex items-center justify-between ">
        <div className="mx-auto ">
          <img
            src="/cameraIcon.png"
            alt="Signature logo"
            className=" w-40 h-40"
          />
        </div>
      </div>
      <div className="flex flex-wrap rounded-xl bg-gray-300 max-w-sm mx-auto mt-8 p-2">
        <p className="p-4">
          Make sure you are sitting in a well lit room and have a good internet
          and your camera is working fine.
        </p>
      </div>
    </div>
  );
};

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prevStep) => (prevStep < 5 ? prevStep + 1 : 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step3 />;
      case 5:
        return <Step5 />;
      default:
        return null;
    }
  };

  return (
    <article className="rounded-xl border border-blue-700 bg-gray-100 p-4 m-4 mt-11">
      {renderStep()}
      <button
        className="mt-3 inline-flex items-center gap-2 rounded border border-blue-500 bg-blue-500 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        onClick={nextStep}
      >
        <span className="text-sm font-medium"> Next </span>

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
    </article>
  );
};

export default Onboarding;
