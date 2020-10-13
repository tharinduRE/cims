import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import SplashScreen from "./layout/SplashScreen";
import { ToastContainer } from "react-toastify";

function App({ store }) {
  return (
    <React.Suspense fallback={<SplashScreen/>}>
      <BrowserRouter>
        <Routes />
        <ToastContainer />
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
