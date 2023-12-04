import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useMemo } from "react";
import React from "react";

export default function MyMap2() {
  const {} = useLoadScript({
    googleMapsApiKey: "AIzaSyAG11XnZVfpXOZtYuRep6oCxeKfFLm14",
  });
  return <div>MyMap2</div>;
}

function Map() {
  return <GoogleMap zoom={10} center={{ lat: 44, lng: 44 }}></GoogleMap>;
}
