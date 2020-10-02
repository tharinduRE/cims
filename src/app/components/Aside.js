import React from "react";

export default function Aside() {
  return (
    <div className="aside aside-left d-flex">
      {/* begin::Primary */}
      <div className="aside-primary d-flex flex-column align-items-center flex-row-auto">
        {/* begin::Nav Wrapper */}
        <div className="aside-nav d-flex flex-column align-items-center flex-column-fluid py-5 scroll scroll-pull">
          {/* begin::Nav */}
          <ul className="list-unstyled flex-column" role="tablist">
          </ul>
          {/* end::Nav */}
        </div>
        {/* end::Nav Wrapper */}
      </div>
      {/* end::Primary */}
    </div>
  );
}
