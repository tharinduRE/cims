import React from "react";
import AsideMenu from "./AsideMenu";
import Brand from "./Brand";

export default function Aside() {
  return (
    <div className="aside aside-left d-flex flex-column">
      {/* begin::Nav Wrapper */}
      <Brand />
      <div className="aside-nav d-flex flex-column align-items-center flex-column-fluid pt-7">
        {/* begin::Nav */}
          <AsideMenu/>
        {/* end::Nav */}
      </div>
      {/* end::Nav Wrapper */}
    </div>
  );
}
