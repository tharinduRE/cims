import React from "react";

export default function Brand() {
  return (
    <>
      <div class="aside-brand d-flex flex-column align-items-center flex-column-auto mh-100 py-lg-2 bg-white">
        <a href="/">
          <img
            src={process.env.PUBLIC_URL + "/pera-logo.png"}
            width="80"
            alt="brand-logo"
            className="max-h-80"
          />
        </a>
      </div>
    </>
  );
}
