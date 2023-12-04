"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Link from "next/link";
import { useMemo } from "react";
import { apiKey } from "../../../utils/defaultValues";

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

function MyMap({ location, setLocation, values }) {
  const center = {
    lat: location?.lat,
    lng: location?.lng,
  };

  // const center = useMemo(() => ({
  //   lat: location?.lat,
  //   lng: location?.lng,
  // }));

  // Kütüphanenin bize vermiş olduğu hook
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [addresVal, setAddresVal] = useState('')
  const [value, setValue] = useState()

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleSelection = async (address) => {
    setValue(address, false);
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
      const selectedData = data.find((item) => item.description === address);
      const { description, structured_formatting } = selectedData; // place_id,types,terms
      // console.log(place_id,types,terms)
      setSelected({
        lat,
        lng,
        title: structured_formatting.main_text,
        desc: description,
      });
      setMarkers([
        {
          lat,
          lng,
          time: new Date(),
          title: "",
          desc: "",
        },
      ]);
    } catch (err) {
      console.log(err);
      return err;
    }
  };


  useEffect(() => {
    if (values?.address) {
      handleSelection(values?.address)
    }

  }, [values?.address])

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    setLocation({ lat, lng });
    mapRef.current.setZoom(13);
    // Hata olabilir setLocation onu düzeltirsin problem olursa
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  // Kullanıcı tıkladığında marker koy ve değerlerini al
  function handleMapClick(event) {
    const { lat, lng } = event.latLng.toJSON();

    // Yeni bir marker oluşturur
    const newMarker = {
      lat,
      lng,
      time: new Date(),
      title: "", // Bu değerleri sonra doldur
      desc: "", // Bu değerleri sonra doldur
    };

    // Yeni marker'ı markers state'ine ekler
    setMarkers([newMarker]);

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

  // Kullanıcıdan alınan değerlere git
  const goToLocation = () => {
    const lat = parseFloat(location.lat);
    const lng = parseFloat(location.lng);

    if (!isNaN(lat) && !isNaN(lng)) {
      panTo({ lat, lng });

      // Yeni bir marker oluşturur
      const newMarker = {
        lat,
        lng,
        time: new Date(),
        title: "", // Doldurulacak
        desc: "", // Doldurulacak
      };

      // Yeni marker'ı markers state'ine ekler
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

      // Seçilen bilgileri belirli bir işlem için kullanabilirsiniz
      setSelected({
        lat,
        lng,
        title: `Yeni Konum`,
        desc: `Latitude: ${lat}, Longitude: ${lng}`,
      });

      // Yeni marker eklenen konuma giderek haritayı pan edebilirsiniz
      setLocation({ lat, lng });
    } else {
      alert("Geçersiz Latitude veya Longitude değeri!");
    }
  };




  return (
    <div>
      <div className="row d-flex gap-5 align-items-center mb-4">
        <div className="col-lg-4 col-xl-4 col-xs-12">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="googleMapLat">Latitude (for Google Maps)</label>
            <input
              type="text"
              className="form-control"
              id="googleMapLat"
              defaultValue={location?.lat}
              value={location.lat}
              onChange={(e) =>
                setLocation({ ...location, lat: e.target.value })
              }
            />
          </div>
        </div>

        <div className="col-lg-4 col-xl-4 col-xs-12">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="googleMapLong">Longitude (for Google Maps)</label>
            <input
              type="text"
              className="form-control"
              id="googleMapLong"
              defaultValue={location?.lng}
              value={location.lng}
              onChange={(e) =>
                setLocation({ ...location, lng: e.target.value })
              }
            />
          </div>
        </div>

        {/* <button
          onClick={goToLocation}
          className="btn btn-danger goToLocation-button "
        >
          Konuma Git
        </button> */}
      </div>

      <div className="row map-container-area">

      {/* <Search panTo={panTo} setSelected={setSelected} setMarkers={setMarkers} /> */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onLoad={onMapLoad}
        onClick={(e) => handleMapClick(e)}
      
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "/assets/images/logo/logo-short.png",
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
        ))}

        {selected && selected.title && selected.desc ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={(e) => {
              setSelected(e?.target.value);
            }}
          >
            <div>
              <h2>{selected?.title}</h2>
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
      </GoogleMap>
      {/* <Locate panTo={panTo} /> */}
      </div>

    </div>
  );
}

// Konumuna gitmesi için
function Locate({ panTo }) {
  return (
    <>
      <button
        className="flex justify-center btn btn-outline-secondary mt-2"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // console.log(position)
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null,
            options
          );
        }}
      >
        Konumu Göster
      </button>
    </>
  );
}

// Haritada arama yapması için
function Search({ panTo, setSelected, setMarkers }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 43.653225,
        lng: () => -79.383186,
      },
      radius: 200 * 1000,
    },
  });



  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
      const selectedData = data.find((item) => item.description === address);
      const { description, structured_formatting } = selectedData; // place_id,types,terms
      // console.log(place_id,types,terms)
      setSelected({
        lat,
        lng,
        title: structured_formatting.main_text,
        desc: description,
      });
      // setMarkers([
      //   {
      //     lat,
      //     lng,
      //     time: new Date(),
      //     title: "",
      //     desc: "",
      //   },
      // ]);
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  return (
    <div className="border-b solid dark mb-2">
      <div className="position-relative">
        <input
          className="form-control"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Lütfen mülkün adresini giriniz"
        />
        {data.length > 0 && data && status === "OK" && (
          <div className="google-map__input position-absolute mt-2 rounded-md shadow-lg">
            {data.map(({ id, description }) => (
              <div
                key={id}
                value={description}
                className="google-map__input--area"
                onClick={() => handleSelect(description)}
              >
                {description}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default MyMap;
