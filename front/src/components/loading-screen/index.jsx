import React from "react";
import "./index.scss";
import Image from "next/image";
export default function LoadingScreen({ close , backStatus = false }) {
  return (
    <div
      className={close ? "closingLoadingScreen" : ""}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        opacity: backStatus ? .7 : 1
      }}
    >
      <div
        style={{
          width: 75,
          height: 75,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="closingScreenSpinner"></div>
        <img
          src={"/assets/images/logo/logo-short.png"}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
