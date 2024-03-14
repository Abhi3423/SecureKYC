import React, { useRef, useState, useEffect, useContext } from "react";
import Webcam from "react-webcam";
import { DataContext } from "../../shared/containers/provider";
import ReactAudioPlayer from 'react-audio-player';

const DocumentScanner = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  // const [isDocumentDetected, setIsDocumentDetected] = useState(false);
  const [imageData, setImageData] = useState(null);
  let { startContent, speechContent, setspeechContent, setstep } = useContext(DataContext);

  // useEffect(() => {
  //   // Captures after 5 seconds

  // }, []);

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

  const handleStartEnded = () => {
    setTimeout(() => {
      captureScreenshot();
    }, 10000);
  };

  const handlePageEnded = () => {
    setTimeout(() => {
      setstep(6);
    }, 3000);
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
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
      <ReactAudioPlayer
        id="audio"
        src={Object.values(speechContent)[5]}
        autoPlay={true}
        onEnded={handleStartEnded}
      />
      {
        imageData &&
        <div>
          <button onClick={() => handlePageEnded()} className="bg-green-500 p-3 m-2 border-black rounded-md text-white">
            Next
          </button>
          <ReactAudioPlayer
            id="audio"
            src={Object.values(speechContent)[6]}
            autoPlay={true}
          />
          {/* this paragraph will be dynamic to render the instructions for the document  */}
          <div className="flex flex-wrap rounded-xl bg-gray-300 max-w-sm mx-auto mt-8 p-3">
            Please show your Adhaar card to the camera. Make sure that the card is
            properly visible and the details are clear.
          </div>
        </div>
      }
    </article>
  );
};

export default DocumentScanner;
