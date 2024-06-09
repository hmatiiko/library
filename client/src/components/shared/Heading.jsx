import React from "react";

export default function Heading({ children, headingLevel, className }) {
  return React.createElement(headingLevel, { className }, children);
}
