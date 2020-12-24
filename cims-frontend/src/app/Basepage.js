import React, { Suspense } from "react";
import SplashScreen from "./layout/SplashScreen";
import NavRoutes from "./Routes";

export default function BasePage() {
    return (
        <Suspense fallback={<SplashScreen />}>
           <NavRoutes/>
        </Suspense>
    );
}
