import { Routes, Route } from "react-router-dom";
import { NoRouteFound } from "./NoRouteFound";
import Home from "../components/Home/home";
import Kyc from "../components/KYC/kyc";
import LanguageSelection from "../components/KYC/LanguageSelection";
import DialPad from "../components/KYC/DialPad";
import DocumentScanner from "../components/KYC/DocumentScanning";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/kyc-process"
        element={
          <>
            <Kyc />
          </>
        }
      />
      <Route path="/language-selection" element={<LanguageSelection />} />
      <Route path="/dial-pad" element={<DialPad />} />
      <Route path="/doc-scanner" element={<DocumentScanner />} />

      <Route path="*" element={<NoRouteFound />} />
    </Routes>
  );
};
export { AppRoute as Routes };
