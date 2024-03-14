import React from "react";

const DialPad = () => {
  return (
    <article className="rounded-xl border border-blue-700 bg-gray-100 p-4 m-4 mt-11">
      <div className="rounded-lg border border-blue-700 p-4 flex items-center justify-between relative">
        <div className="mx-auto ">
          <img
            src="/voiceRecorder.png"
            alt="Voice Recorder logo"
            className=" w-24 h-24"
          />
        </div>
        <div className="absolute bottom-0 right-0 ">
          <img
            src="/voiceicon.png"
            alt="voice recorder icon"
            className="w-11 h-11"
          />
        </div>
      </div>
      <div className="flex flex-wrap rounded-xl bg-gray-300 max-w-sm mx-auto mt-8">
        <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400 ">
            <p>1</p> <p className="text-sm ">English</p>
          </button>
        </div>
        <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400 ">
            <p>2</p> <p className="text-sm ">हिन्दी</p>
          </button>
        </div>
        <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400 ">
            <p>3</p> <p className="text-sm ">தமிழ்</p>
          </button>
        </div>
        <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400 ">
            <p>4</p> <p className="text-sm ">తెలుగు</p>
          </button>
        </div>
        <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400 ">
            <p>5</p> <p className="text-sm ">বাংলা</p>
          </button>
        </div>
        <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400 ">
            <p>6</p> <p className="text-sm ">മലയാളം</p>
          </button>
        </div>
      </div>
    </article>
  );
};

export default DialPad;
