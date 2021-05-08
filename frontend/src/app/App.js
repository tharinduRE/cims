import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import SplashScreen from "./layout/SplashScreen";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./pages/auth/AuthProvider";

function App() {
    return (
        <AuthProvider>
            <React.Suspense fallback={<SplashScreen />}>
                <BrowserRouter>
                    <AuthRoutes />
                    <ToastContainer />
                </BrowserRouter>
            </React.Suspense>
        </AuthProvider>
    );
}

export default App;
