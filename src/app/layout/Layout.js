import React from "react";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { IconContext } from "react-icons";
import SearchSubHeader from "./components/SearchSubHeader";

export default function Layout({ children }) {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                {/*begin::Page*/}
                <div className="d-flex flex-row flex-column page">
                    <IconContext.Provider
                        value={{ size: "1.5em", className: "svg-icon" }}
                    >
                        <Aside />
                    </IconContext.Provider>

                    {/*begin::Wrapper*/}
                    <div className="d-flex flex-column flex-row-fluid wrapper">
                        <Header />

                         <SearchSubHeader />

                        {/*begin::Content*/}
                        <div className="content d-flex flex-column flex-column-fluid min-vh-100 pt-md-3">
                            <div className="d-flex flex-column-fluid">
                                <div className="container">
                                    <div>{children}</div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                    {/*end::Wrapper*/}
                </div>
                {/*end::Page*/}
            </div>
        </>
    );
}
