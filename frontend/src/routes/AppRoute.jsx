import { Routes, Route } from "react-router-dom";
import { NoRouteFound } from "./NoRouteFound";
import Home from "../components/Home/home";
import Kyc from "../components/KYC/kyc";

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
      
      <Route path="*" element={<NoRouteFound />} />
    </Routes>
  );
};
export { AppRoute as Routes };
