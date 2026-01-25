import React from "react";

const Skeleton = ({ className = "", style = {}, ...props }) => (
  <div
    className={`bg-gray-200 rounded animate-pulse ${className}`}
    style={style}
    {...props}
  />
);

export default Skeleton;

