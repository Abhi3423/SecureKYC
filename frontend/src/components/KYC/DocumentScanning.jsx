import React, { useRef, useState, useEffect, useContext } from "react";
import Webcam from "react-webcam";
import { DataContext } from "../../shared/containers/provider";
import ReactAudioPlayer from "react-audio-player";
import axios from "axios";
import { HOST } from "../../shared/const/const";
import Countdown, { zeroPad } from "react-countdown";

const DocumentScanner = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  // const [isDocumentDetected, setIsDocumentDetected] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [timer, setTimer] = useState(false);
  let { startContent,speechContent,setspeechContent,setstep,verified,setVerified,} = useContext(DataContext);

  // useEffect(() => {
  //   // Captures after 5 seconds
  //   setTimeout(() => {
  //     captureScreenshot();
  //   }, 10000);
  // }, []);

  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <span>
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  };

  const captureScreenshot = () => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL("image/jpeg", 0.5); // Convert captured image data to base64 encoded format
      setImageData(imageData);
      console.log(imageData);
    }
  };

  const handlePageEnded = () => {
    console.log(imageData);
    axios
      .post(`${HOST}/ocr_front`, { image: imageData })
      .then((response) => {
        console.log(response.data);
        setVerified(response.data.response);
        setTimeout(() => {
          setstep(6);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <article className="rounded-xl border border-blue-700 bg-gray-100 p-4 m-4 mt-11">
      <div className="rounded-lg border border-blue-700 p-4 flex items-center justify-between">
        <div>
          {!imageData && <Webcam ref={webcamRef} />}
          <img
            src={`${imageData}`}
            className={!imageData ? "hidden" : ""}
            alt="Captured Profile"
          />
          {timer && (
            <div className="mt-3 font-semibold text-xl">
              <Countdown
                date={Date.now() + 10000}
                renderer={renderer}
                onComplete={() => {
                  setTimer(false);
                  captureScreenshot();
                }}
              />
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
      <ReactAudioPlayer
        id="audio"
        src={Object.values(speechContent)[6]}
        autoPlay={true}
        onEnded={() => {
          setTimer(true);
        }}
      />
      {imageData && (
        <div>
          <button
            onClick={() => handlePageEnded()}
            className="bg-green-500 p-3 m-2 border-black rounded-md text-white"
          >
            Next
          </button>
          <ReactAudioPlayer
            id="audio"
            src={Object.values(speechContent)[7]}
            autoPlay={true}
          />
          {/* this paragraph will be dynamic to render the instructions for the document  */}
          <div className="flex flex-wrap rounded-xl bg-gray-300 max-w-sm mx-auto mt-8 p-3">
            Please show your Adhaar card to the camera. Make sure that the card
            is properly visible and the details are clear.
          </div>
        </div>
      )}
    </article>
  );
};

export default DocumentScanner;
