import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { HOST } from '../../shared/const/const';
import { DataContext } from "../../shared/containers/provider";
import ReactAudioPlayer from 'react-audio-player';

const DialPad = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let { startContent, speechContent, setspeechContent, setstep } = useContext(DataContext);
  const handleSubmit = (lang) => {
    axios.get(`${HOST}/get_audio/${lang}`)
      .then(response => {
        console.log(response.data);
        // Handle the response data as needed
        setspeechContent(response.data)
        setTimeout(() => {
          setstep(1)
          console.log(speechContent)
        }, 4000);
      })
      .catch(error => {
        console.error('Error fetching audio:', error);
      });
  }

  useEffect(() => {
    const handleAudioEnded = () => {
      setTimeout(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          if (nextIndex < Object.keys(startContent).length) {
            return nextIndex;
          } else {
            return 0; // Loop back to the beginning if reached the end
          }
        });
      }, 1000); // Delay before transitioning to the next audio
    };

    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.addEventListener('ended', handleAudioEnded);

    return () => {
      audioPlayer.removeEventListener('ended', handleAudioEnded);
    };
  }, [startContent]);

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
      <div className="flex flex-wrap rounded-xl bg-gray-300 max-w-sm mx-auto mt-8">
        <div className="w-1/3" onClick={() => handleSubmit("English")}>
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400 ">
            <p>1</p> <p className="text-sm ">English</p>
          </button>
        </div>
        <div className="w-1/3" onClick={() => handleSubmit("Tamil")}>
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400 ">
            <p>2</p> <p className="text-sm ">தமிழ்</p>
          </button>
        </div>
        <div className="w-1/3" onClick={() => handleSubmit("Telugu")}>
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400 ">
            <p>3</p> <p className="text-sm ">తెలుగు</p>
          </button>
        </div>
        <div className="w-1/3" onClick={() => handleSubmit("Hindi")}>
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400 ">
            <p>4</p> <p className="text-sm ">हिन्दी</p>
          </button>
        </div>
        <div className="w-1/3" onClick={() => handleSubmit("Bangla")}>
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400 ">
            <p>5</p> <p className="text-sm ">বাংলা</p>
          </button>
        </div>
        {/* <div className="w-1/3">
          <button className="w-full h-20 text-2xl text-gray-700 font-bold rounded-xl hover:bg-gray-400 ">
            <p>6</p> <p className="text-sm ">മലയാളം</p>
          </button>
        </div> */}
      </div>
    </article>
  );
};

export default DialPad;
