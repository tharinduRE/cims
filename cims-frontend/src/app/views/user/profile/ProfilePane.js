import React from "react";

export default function ProfilePane({ user }) {
  return (
    <div className="text-center mb-10">
      <h4 className="font-weight-bold my-2">{`${user.firstName} ${user.lastName}`}</h4>
      <div className="text-muted mb-2">{user.postTitle}</div>
      <span className="label label-light-success label-inline font-weight-bold label-lg">Active</span>
    </div>
  );
}
