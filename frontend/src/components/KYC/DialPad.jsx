import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { HOST } from "../../shared/const/const";
import { DataContext } from "../../shared/containers/provider";
import ReactAudioPlayer from "react-audio-player";
import Loader from "../layouts/Loader";
import SuccessModal from "../../UI/successModal";

const DialPad = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  let { startContent, speechContent, setspeechContent, setstep } =
    useContext(DataContext);
  const handleSubmit = (lang) => {
    setLoading(true)
    axios
      .get(`${HOST}/get_audio/${lang}`)
      .then((response) => {
        console.log(response.data);
        // Handle the response data as needed
        setspeechContent(response.data);
        setTimeout(() => {
          setstep(1);
          console.log(speechContent);
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error fetching audio:", error);
      });
  };

  useEffect(() => {
    const handleAudioEnded = () => {
      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex < Object.keys(startContent).length) {
            return nextIndex;
          } else {
            return 0; // Loop back to the beginning if reached the end
          }
        });
      }, 1000); // Delay before transitioning to the next audio
    };

    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.addEventListener("ended", handleAudioEnded);

    return () => {
      audioPlayer.removeEventListener("ended", handleAudioEnded);
    };
  }, [startContent]);

  return (
    <div className="bg-cover bg-center h-[80vh]">
      <article className="rounded-xl bg-opacity-80 backdrop-filter backdrop-blur-lg bg-logo border border-blue-700 flex flex-col items-center justify-center h-full lg:flex-row p-4 lg:p-10 m-4 lg:m-12 mt-11">
        <div className="lg:w-[50%] w-full h-full flex items-center justify-center">
          <div className="rounded-lg border-blue-700 border-2 lg:w-[80%] w-full lg:h-[70%] h-full p-4 flex items-center justify-between relative">
            <div className="mx-auto h-1/2">
              <img
                src="/voiceRecorder.png"
                alt="Voice Recorder logo"
                className=""
              />
            </div>
            <div className="absolute bottom-0 right-0 ">
              <img
                src="/voiceicon.png"
                alt="voice recorder icon"
                className="w-11 h-11"
              />
            </div>
            <ReactAudioPlayer
              id="audio-player"
              src={Object.values(startContent)[currentIndex]}
              autoPlay={true}
            />
            <ReactAudioPlayer
              id="audio"
              src={Object.values(speechContent)[0]}
              autoPlay={true}
            />
          </div>
        </div>
        <div className="flex flex-wrap self-start rounded-xl w-full lg:w-[50%] lg:px-4 gap-y-2 mx-auto mt-8">
          <div className="w-1/3" onClick={() => handleSubmit("English")}>
            <button className="py-4 w-[90%] lg:w-[80%] h-20 text-2xl text-[#0473EA] border border-[#0473EA] font-bold rounded-lg hover:bg-[#0473EA] hover:text-white">
              <p>1</p> <p className="text-sm ">English</p>
            </button>
          </div>
          <div className="w-1/3" onClick={() => handleSubmit("Tamil")}>
            <button className="py-4 w-[90%] lg:w-[80%] h-20 text-2xl text-[#0473EA] border border-[#0473EA] font-bold rounded-lg hover:bg-[#0473EA] hover:text-white">
              <p>2</p> <p className="text-sm ">தமிழ்</p>
            </button>
          </div>
          <div className="w-1/3" onClick={() => handleSubmit("Telugu")}>
            <button className="py-4 w-[90%] lg:w-[80%] h-20 text-2xl  text-[#0473EA] border border-[#0473EA] font-bold rounded-lg hover:bg-[#0473EA] hover:text-white">
              <p>3</p> <p className="text-sm ">తెలుగు</p>
            </button>
          </div>
          <div className="w-1/3" onClick={() => handleSubmit("Hindi")}>
            <button className="py-4 w-[90%] lg:w-[80%] h-20 text-2xl  text-[#0473EA] border border-[#0473EA] font-bold rounded-lg hover:bg-[#0473EA] hover:text-white">
              <p>4</p> <p className="text-sm ">हिन्दी</p>
            </button>
          </div>
          <div className="w-1/3" onClick={() => handleSubmit("Bangla")}>
            <button className="py-4 w-[90%] lg:w-[80%] h-20 text-2xl  text-[#0473EA] border border-[#0473EA] font-bold rounded-lg hover:bg-[#0473EA] hover:text-white">
              <p>5</p> <p className="text-sm ">বাংলা</p>
            </button>
          </div>
          {/* <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400 ">
            <p>6</p> <p className="text-sm ">മലയാളം</p>
          </button>
        </div> */}
        </div>
        {
          loading && 
          <SuccessModal successState={loading}>
            <Loader/>
          </SuccessModal>
        }
      </article>
    </div>
  );
};

export default DialPad;
