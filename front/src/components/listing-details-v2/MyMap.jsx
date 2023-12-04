"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
  StreetViewPanorama,
} from "@react-google-maps/api";
import Link from "next/link";
import currencyFormatter from "currency-formatter"
import { apiKey } from "../../utils/defaultValues";


const libraries = ["places"]; // search için gerekli
const mapContainerStyle = {
  width: "100%",
  height: "480px",
};

const options = {
  // styles: mapStyles,
  // disableDefaultUI: true,
  zoomControl: true,
};

function MyMap({ property, street }) {
  const [center, setCenter] = useState({ lat: 38.734802, lng: 35.467987 })
  const [markers, setMarkers] = useState([{ lat: 38.734802, lng: 35.467987 }]);
  const [location, setLocation] = useState()
  const [markerDesc, setMarkerDesc] = useState('')
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (property && Object.keys(property).length && property?.advertDetail?.latitude && property?.advertDetail?.longitude) {
      console.log('property?.advertDetail?.latitude', property?.advertDetail)
      setCenter({ lat: property?.advertDetail?.latitude?.value, lng: property?.advertDetail?.longitude.value })
      setMarkers([{ lat: property?.advertDetail?.latitude.value, lng: property?.advertDetail?.longitude.value }])
      setMarkerDesc(`İlan No:${property?.advertDetail?.advertNo.options} - ${currencyFormatter.format(property?.advertDetail?.advertPrice.options, { thousand: '.', precision: 0 })} TL`)
    }
  }, [property])

  // Kütüphanenin bize vermiş olduğu hook
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });




  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    setLocation({ lat, lng });
    mapRef.current.setZoom(19);
    // Hata olabilir setLocation onu düzeltirsin problem olursa
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  // Kullanıcı tıkladığında marker koy ve değerlerini al
  function handleMapClick(event) {
    const { lat, lng } = event.latLng.toJSON();


    // Seçilen bilgileri belirli bir işlem için kullanabilirsiniz
    setSelected({
      lat,
      lng,
      title: `Yeni Konum`,
      desc: `Latitude: ${lat}, Longitude: ${lng}`,
    });

    // Yeni marker eklenen konuma giderek haritayı pan edebilirsiniz
    setLocation({ lat, lng });
  }



  return (
    <div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={18}
        center={center}
        options={options}
        onLoad={onMapLoad}
        onClick={(e) => handleMapClick(e)}
        streetView={true}
      >
        {!street && <Marker
          key={new Date()}
          position={{ lat: center?.lat, lng: center?.lng }}
          icon={{
            url: "/assets/images/logo/logo-short.png",
            scaledSize: new window.google.maps.Size(50, 50),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
          onClick={(e) => {
            console.log('KKKKK', {
              lat: center.lat,
              lng: center.lng,
              title: markerDesc,
            })
            setSelected({
              lat: center.lat,
              lng: center.lng,
              title: markerDesc,
              desc: `Latitude: ${center.lat}, Longitude: ${center.lng}`,
            });
          }}
        />}

        {selected && selected.title && selected.desc ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={(e) => {
              setSelected(e?.target.value);
            }}
          >
            <div>
              <h5>{selected?.title}</h5>
              <p>{selected?.desc} </p>
              <p>
                Konum : {selected?.lat} / {selected.lng}
              </p>
              <p>
                <Link
                  href={`https://www.google.com/maps?ll=${selected?.lat},${selected?.lng}&z=19&t=m&hl=en-US&gl=US&mapclient=apiv3&cid=6528365072648182307`}
                  target="_blank"
                >
                  Google Haritalar&apos;da görüntüle
                </Link>
              </p>
            </div>
          </InfoWindow>
        ) : null}
        {street && <StreetViewPanorama position={center} visible={true} />}
      </GoogleMap>

    </div>
  );
}


export default MyMap;
