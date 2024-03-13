import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const SignatureScanner = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  //   const [isDocumentDetected, setIsDocumentDetected] = useState(false);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    // Captures after 5 seconds
    setTimeout(() => {
      captureScreenshot();
    }, 5000);
  }, []);

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
  return (
    <article className="rounded-xl border border-blue-700 bg-gray-100 p-4 m-4 mt-11">
      <div className="rounded-lg border border-blue-700 p-4 flex items-center justify-between">
        <div>
          <Webcam ref={webcamRef} className={imageData ? "hidden" : ""} />
          <img
            src={`${imageData}`}
            className={!imageData ? "hidden" : ""}
            alt="Captured Profile"
          />
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
      <button className="bg-gray-300 p-3 m-2 border-black rounded-md hover:bg-gray-400">
        Show Image in console
      </button>
      {/* this paragraph will be dynamic to render the instructions for the document  */}
      <div className="flex flex-wrap rounded-xl bg-gray-300 max-w-sm mx-auto mt-8 p-3">
        Please show your Signature to the camera. Make sure that the signature
        is properly visible and the details are clear.
      </div>
    </article>
  );
};

export default SignatureScanner;
