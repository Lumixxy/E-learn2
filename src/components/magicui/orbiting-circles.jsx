import * as React from "react";

export function OrbitingCircles({
  children,
  radius = 80,
  reverse = false,
  ...props
}) {
  const count = React.Children.count(children);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      {...props}
    >
      {React.Children.map(children, (child, i) => {
        const angle = (i / count) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` + (reverse ? " scaleX(-1)" : ""),
              transition: "transform 0.5s cubic-bezier(.4,0,.2,1)",
              pointerEvents: "auto",
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
} 