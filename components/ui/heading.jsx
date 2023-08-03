import React from "react";

const Heading = ({ title, desc }) => {
  return (
    <div className="px-2 flex flex-col gap-2">
      <h1 className="text-3xl font-bold tracking-wide">{title}</h1>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
};

export default Heading;
