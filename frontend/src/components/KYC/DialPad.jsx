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
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">
            1
          </button>
        </div>
        <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">
            2
          </button>
        </div>
        <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">
            3
          </button>
        </div>
        <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">
            4
          </button>
        </div>
        <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">
            5
          </button>
        </div>
        <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">
            6
          </button>
        </div>
        <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">
            7
          </button>
        </div>
        <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">
            8
          </button>
        </div>
        <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">
            9
          </button>
        </div>
        <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">
            *
          </button>
        </div>
        <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">
            0
          </button>
        </div>
        <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400">
            #
          </button>
        </div>
      </div>
    </article>
  );
};

export default DialPad;
