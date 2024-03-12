import { useNavigate } from "react-router-dom";

export const NoRouteFound = () => {
  const navigate = useNavigate();
  const GoToHomepageHandler = () => {
    navigate("/", {replace: true});
  };

  return (
    <>
      <div className="grid grid-cols-1 text-center py-36">
        <h1 className="text-2xl font-bold py-10">404 - Page Not Found</h1>
        <button
          className="btn-md btn-primary w-48 justify-self-center"
          onClick={GoToHomepageHandler}
        >
          Go To Homepage
        </button>
      </div>
    </>
  );
};
