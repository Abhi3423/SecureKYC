import React, { useRef, useState, useEffect, useContext } from "react";
import Webcam from "react-webcam";
import { DataContext } from "../../shared/containers/provider";
import ReactAudioPlayer from "react-audio-player";
import axios from "axios";
import { HOST } from "../../shared/const/const";
import Countdown, { zeroPad } from "react-countdown";
import Contentbg from "../../UI/contentbg";
import Loader from "../layouts/Loader";
import SuccessModal from "../../UI/successModal";

const SignatureScanner = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [ready, setready] = useState(false);
  //   const [isDocumentDetected, setIsDocumentDetected] = useState(false);
  const [imageData, setImageData] = useState(null);
  let { startContent, speechContent, setspeechContent, setstep } =
    useContext(DataContext);
  const [timer, setTimer] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  // Captures after 5 seconds
  // setTimeout(() => {
  //   captureScreenshot();
  // }, 10000);
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

  const handleReady = () => {
    setready(true);
    setTimeout(() => {
      setTimer(true);
    }, 1000);
  };

  const handlePageEnded = () => {
    console.log(imageData)
    setLoading(true)
    axios.post(`${HOST}/get_signature`, { "image": imageData })
      .then(response => {
        console.log(response.data);
        setTimeout(() => {
          setLoading(false);
          setstep(9);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const handleRetake = () => {
    setTimeout(() => {
      setImageData(null);
      setstep(8);
    }, 1500);
  };

  return (
    <article className="rounded-xl border border-blue-700 bg-gray-100 p-4 m-4 mt-11">
      <div className="flex flex-col lg:flex-row gap-4 justify-center">
        <div className="rounded-lg border border-blue-700 p-4 flex items-center justify-between">
          {ready && (
            <div>
              <Webcam ref={webcamRef} className={imageData ? "hidden" : ""} />
              <img
                src={`${imageData}`}
                className={!imageData ? "hidden" : ""}
                alt="Captured Profile"
              />
              {timer && (
                <div className="mt-3 font-semibold text-xl">
                  <Countdown
                    date={Date.now() + 5000}
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
          )}
        </div>
        <Contentbg content={'Please sign in the paper and show it in the camera. Your camera will be started whenever you press green button and 5 seconds timer will start. Take your paper and show in camera closely, be steady till the scanning timing completes.'} />
      </div>
      {
        !ready &&
        <>
          <button onClick={() => handleReady()} className="bg-green-500 p-3 m-2 border-black rounded-md text-white">
            Ready
          </button>
          <ReactAudioPlayer
            id="audio"
            src={Object.values(speechContent)[12]}
            autoPlay={true}
          />
        </>
      }
      {
        imageData &&
        <div>
          <button
            onClick={() => handlePageEnded()}
            className="bg-green-500 p-3 m-2 border-black rounded-md text-white"
          >
            Next
          </button>
          <ReactAudioPlayer
            id="audio"
            src={Object.values(speechContent)[13]}
            autoPlay={true}
          />
          <button onClick={() => handleRetake()} className="bg-red-500 p-3 m-2 border-black rounded-md text-white">
            Retake
          </button>
        </div>
      }
      {
          loading && 
          <SuccessModal successState={loading}>
            <Loader/>
          </SuccessModal>
        }
    </article>
  );
};

export default SignatureScanner;
