import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const DocumentScanner = () => {
  const webcamRef = useRef(null);
  const [screenshots, setScreenshots] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      captureScreenshot();
    }, 3000); // Capture screenshot every 3 seconds

    // Stop capturing after 20 seconds
    setTimeout(() => {
      clearInterval(interval);
    }, 20000);

    return () => clearInterval(interval); // Cleanup function
  }, []);

  const captureScreenshot = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setScreenshots((prevScreenshots) => {
      const newScreenshots = [...prevScreenshots, imageSrc];
      console.log(newScreenshots); // Log the array when a new element is added
      return newScreenshots;
    });
  };
  return (
    <article className="rounded-xl border border-blue-700 bg-gray-100 p-4 m-4 mt-11">
      <div className="rounded-lg border border-blue-700 p-4 flex items-center justify-between">
        <Webcam ref={webcamRef} />
      </div>
      <button className="bg-gray-300 p-3 m-2 border-black rounded-md hover:bg-gray-400">
        Show Image in console
      </button>
      {/* this paragraph will be dynamic to render the instructions for the document  */}
      <div className="flex flex-wrap rounded-xl bg-gray-300 max-w-sm mx-auto mt-8 p-3">
        Please show your Adhaar card to the camera. Make sure that the card is
        properly visible and the details are clear.
      </div>
    </article>
  );
};

export default DocumentScanner;
