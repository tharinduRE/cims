import React from "react";

export function Spacer({x,y}) {
    if (x) return <div className={`d-inline mr-${x}`}></div>
    if (y) return <div className={`mb-${y}`}></div>
    return <div className="mb-5"></div>;
}