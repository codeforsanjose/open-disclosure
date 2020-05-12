import React from "react"
import "typeface-roboto"

const Shadow = ({ color, big, reverse, children }) => {
  const shadowSize = big ? "3rem" : "1rem"

  return (
    <div
      style={{
        width: "max-content",
        backgroundColor: color,
        marginTop: reverse ? `-${shadowSize}` : shadowSize,
        marginLeft: reverse ? `-${shadowSize}` : shadowSize,
      }}
    >
      <div
        style={{
          position: "relative",
          top: `-${shadowSize}`,
          left: reverse ? shadowSize : `-${shadowSize}`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Shadow
