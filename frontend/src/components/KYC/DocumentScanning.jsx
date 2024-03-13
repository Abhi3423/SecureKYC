import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const DocumentScanner = () => {
  const webcamRef = useRef(null);
  let screenshotImage = "";
  const showImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    screenshotImage = imageSrc;
    console.log(screenshotImage);
  };
  return (
    <article className="rounded-xl border border-blue-700 bg-gray-100 p-4 m-4 mt-11">
      <div className="rounded-lg border border-blue-700 p-4 flex items-center justify-between">
        <Webcam ref={webcamRef} />
      </div>
      <button
        className="bg-gray-300 p-3 m-2 border-black rounded-md hover:bg-gray-400"
        onClick={() => showImage()}
      >
        Show Image in console
      </button>
      <div className="flex flex-wrap rounded-xl bg-gray-300 max-w-sm mx-auto mt-8">
        Please show your Adhaar card to the camera. Make sure that the card is
        properly visible and the details are clear.
      </div>
      <img src={screenshotImage} alt="" className=" w-36 h-36" />
    </article>
  );
};

export default DocumentScanner;
