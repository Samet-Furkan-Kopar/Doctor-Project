import React, { useState } from "react";

export default function Navigation({ screens }) {
  const [selectedRoot, setSelectedRoot] = useState(0);

  return (
    <div className="d-flex flex-column w-100 rounded-sm">
      <div className={`d-flex justify-content-between w-100 mb-3`}>
        {screens.map((item, i) =>
          item.isOfficeAdmin ? (
            <div
              className={`h4 w-100 h-100 p-4 ${
                i !== selectedRoot
                  ? "bg-secondary text-white"
                  : "bg-light text-danger"
              }`}
              style={{ cursor: "pointer" }}
              key={i}
              onClick={() => {
                setSelectedRoot(i);
              }}
            >
              {item.title}
            </div>
          ) : (
            <></>
          )
        )}
      </div>

      <div>
        {screens &&
          screens.map((item, i) => {
            if (i === selectedRoot) return item.component;

            return <></>;
          })}
      </div>
    </div>
  );
}
