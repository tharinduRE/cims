import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import SplashScreen from "./layout/SplashScreen";

function App({ store }) {
  return (
    <Suspense fallback={<SplashScreen/>}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
