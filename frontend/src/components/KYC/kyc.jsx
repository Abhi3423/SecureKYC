import React, { useEffect } from 'react'
import axios from 'axios';
import { HOST } from '../../shared/const/const';
import { DataContext } from "../../shared/containers/provider";
import { Fragment, useContext } from "react";
import ReactAudioPlayer from 'react-audio-player';
import DialPad from './DialPad'
import { Step1, Step2, Step3 } from './Onboarding';
import ProfileScanner from './ProfileScan';
import DocumentScanner from './DocumentScanning';
import SignatureScanner from './SignatureScan';

function Kyc() {
  const { step, setstep, speechContent, setspeechContent, startContent, setstartContent } = useContext(DataContext);
  useEffect(() => {

    async function getStartdata() {
      let res = await axios.get(`${HOST}/get_start`)
      console.log(res?.data)
      setstartContent(res?.data)
    }
    getStartdata()

  }, [])
  return (
    <div>
      {step == 0 && startContent ?
        <DialPad />
        :
        step == 1 && speechContent ?
          <article className="rounded-xl border border-blue-700 bg-gray-100 p-4 m-4 mt-11">
            <Step1 />
          </article>
          :
          step == 2 && speechContent ?
            <article className="rounded-xl border border-blue-700 bg-gray-100 p-4 m-4 mt-11">
              <Step2 />
            </article>
            :
            step == 3 && speechContent ?
              <article className="rounded-xl border border-blue-700 bg-gray-100 p-4 m-4 mt-11">
                <Step3 />
              </article>
              :
              step == 4 && speechContent ?
                <ProfileScanner />
                :
                step == 5 && speechContent ?
                  <DocumentScanner />
                  :
                  step == 6 && speechContent ?
                    <SignatureScanner />
                    :
                    <div></div>
      }
    </div>
  )
}

export default Kyc
