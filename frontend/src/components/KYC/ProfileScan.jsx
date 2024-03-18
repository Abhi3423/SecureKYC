import React, { useRef, useState, useEffect, useContext } from "react";
import "@tensorflow/tfjs-backend-webgl";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { DataContext } from "../../shared/containers/provider";
import ReactAudioPlayer from 'react-audio-player';
import axios from "axios";
import { HOST } from "../../shared/const/const";
import Background from "../../UI/background";
import Contentbg from "../../UI/contentbg";
import Countdown, { zeroPad } from "react-countdown";
import { renderer } from "../../shared/containers/render";
import Loader from "../layouts/Loader";
import SuccessModal from "../../UI/successModal";

const ProfileScanner = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [timer, setTimer] = useState(false);
  const [loading, setLoading] = useState(false);

  let { speechContent, setstep, step } = useContext(DataContext);

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

  const handleStartEnded = () => {
    setTimer(true);
  };

  const handlePageEnded = () => {
    console.log(imageData)
    setLoading(true)
    axios.post(`${HOST}/post_user_image`, { "image": imageData })
      .then(response => {
        console.log(response.data);
        setTimeout(() => {
          setLoading(false);
          setstep(5);
        }, 2000);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  };

  const handleRetake = () => {
    console.log(imageData)
    setTimeout(() => {
      setImageData(null);
      setstep(4);
    }, 1500);
  };


  useEffect(() => {
    runFaceMesh();
    console.log('call run facemesh')
  }, []);


  return (
    <article className="rounded-xl border border-blue-700 bg-gray-100 p-4 m-4 mt-11">
      <div className="flex flex-col lg:flex-row gap-4 justify-center">
        <div className="rounded-lg border border-blue-700 p-4 flex items-center justify-between">
          <div>
            {!imageData && <Webcam onLoadStart={() => runFaceMesh()} ref={webcamRef} />}
            <img
              src={`${imageData}`}
              className={!imageData ? "hidden" : ""}
              alt="Captured Profile"
            />
            {/* {timer && (
                <div className="mt-3 font-semibold text-xl">
                  <Countdown
                    date={Date.now() + 10000}
                    renderer={renderer}
                    onComplete={() => {
                      setTimer(false);
                      runFaceMesh();
                    }}
                  />
                </div>
              )} */}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
        <Contentbg content={'Please make sure your face is clearly visible and in proper lighting.'} />
      </div>
      {!imageData &&
        <ReactAudioPlayer
          id="audio"
          src={Object.values(speechContent)[4]}
          autoPlay={true}
          onEnded={handleStartEnded}
        />
      }
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
          <button onClick={() => handleRetake()} className="bg-red-500 p-3 m-2 border-black rounded-md text-white">
            Retake
          </button>
          {/* <ReactAudioPlayer
            id="audio"
            src={Object.values(speechContent)[5]}
            autoPlay={true}
          /> */}
        </div>
      }
      {
        loading &&
        <SuccessModal successState={loading}>
          <Loader />
        </SuccessModal>
      }
    </article>
  );
};

export default ProfileScanner;
