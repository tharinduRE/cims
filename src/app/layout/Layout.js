import React from "react";
import Aside from "../components/Aside";
import Footer from "./Footer";
import TopBar from './TopBar'

export default function Layout({ children }) {
  return (
    <div className="d-flex flex-column flex-root">
       <TopBar/> 
      {/*begin::Page*/}
      <div className="d-flex flex-row flex-column-fluid page">
        <Aside />
        {/*begin::Wrapper*/}
        <div className="d-flex flex-column flex-row-fluid wrapper">
          {/*begin::Content*/}
          <div className="d-flex flex-column flex-column-fluid">
            <div className="d-flex flex-column-fluid">
              {/*begin::Container*/}
              <div>{children}</div>
              {/*end::Container*/}
            </div>

            {/*end::Entry*/}
          </div>
          {/*end::Content*/}
          <Footer />
        </div>
        {/*end::Wrapper*/}
      </div>
      {/*end::Page*/}
    </div>
  );
}
