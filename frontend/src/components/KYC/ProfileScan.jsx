import React, { useRef, useState, useEffect, useContext } from "react";
import "@tensorflow/tfjs-backend-webgl";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { DataContext } from "../../shared/containers/provider";
import ReactAudioPlayer from 'react-audio-player';
import axios from "axios";
import { HOST } from "../../shared/const/const";

const ProfileScanner = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageData, setImageData] = useState(null);

  let { startContent, speechContent, setspeechContent, setstep } = useContext(DataContext);

  const runFaceMesh = async () => {
    const model = facemesh.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
      runtime: "tfjs",
      solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
    };
    const detector = await facemesh.createDetector(model, detectorConfig);
    // const interval = setInterval(() => {
    //   detect(detector);
    // }, 1000);
    detect(detector);
  };

  const detect = async (detector) => {
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
      const ctx = canvasRef.current.getContext("2d");

      const face = await detector.estimateFaces(video);
      if (face.length > 0 && !imageData) {
        // Capture snapshot only once on first face detection
        ctx.drawImage(video, 0, 0); // Draw the video frame onto the canvas

        // Capture the image data as base64 encoded JPEG
        const imageData = canvasRef.current.toDataURL("image/jpeg"); // Adjust image quality as needed
        setImageData(imageData);
      }
    }
  };

  const handlePageEnded = () => {
    console.log(imageData)
    axios.post(`${HOST}/post_user_image`, {"image":imageData})
      .then(response => {
        console.log(response.data);
        setTimeout(() => {
          setstep(5);
        }, 3000);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };

  useEffect(() => {
    runFaceMesh();
  }, []);

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
        src={Object.values(speechContent)[4]}
        autoPlay={true}
      />
      {
        imageData &&
        <div>
          <button onClick={() => handlePageEnded()} className="bg-green-500 p-3 m-2 border-black rounded-md text-white">
            Next
          </button>
          <ReactAudioPlayer
            id="audio"
            src={Object.values(speechContent)[5]}
            autoPlay={true}
          />
          {/* this paragraph will be dynamic to render the instructions for the document  */}
          <div className="flex flex-wrap rounded-xl bg-gray-300 max-w-sm mx-auto mt-8 p-3">
            Please make sure your face is clearly visible and in proper lighting.
          </div>
        </div>
      }
    </article>
  );
};

export default ProfileScanner;
