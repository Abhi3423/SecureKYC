import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  let [step, setstep] = useState(0);
  const [startContent, setstartContent] = useState([]);
  const [speechContent, setspeechContent] = useState([]);
  const [data, setData] = useState([]);
  const [verified, setVerified] = useState(false);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        step,
        setstep,
        startContent,
        setstartContent,
        speechContent,
        setspeechContent,
        verified,
        setVerified,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
