import React from "react";

const MeasureDetails = ({
  title,
  subtitle,
  description,
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <span>{subtitle}</span>
      <h2>What would this measure do?</h2>
      <span>{description}</span>
      <a href="https://votersedge.org" target="_blank">More information on Voter's Edge</a>
    </div>
  );
};

export default MeasureDetails;


