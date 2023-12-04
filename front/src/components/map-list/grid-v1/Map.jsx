"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import {
    useLoadScript,
    GoogleMap,
    Marker,
    InfoWindow,
    StreetViewPanorama,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import Link from "next/link";
import { useMemo } from "react";
import currencyFormatter from "currency-formatter"
import { apiKey } from "../../../utils/defaultValues";


const libraries = ["places"]; // search için gerekli
const mapContainerStyle = {
    width: "100%",
    height: "100%",
};

const options = {
    // styles: mapStyles,
    // disableDefaultUI: true,
    zoomControl: true,
};

function MyMap({ content }) {
    const center = {
        lat: 38.720546,
        lng: 35.482568
    };

    const [markers, setMarkers] = useState([]);
    const [location, setLocation] = useState()


    // Kütüphanenin bize vermiş olduğu hook
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });


    const [selected, setSelected] = useState(null);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        setLocation({ lat, lng });
        mapRef.current.setZoom(15);
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
        // setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

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
        <div style={{ height: "100%"}}>

            {/* <Search panTo={panTo} setSelected={setSelected} setMarkers={setMarkers} /> */}
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                options={options}
                onLoad={onMapLoad}
                onClick={(e) => handleMapClick(e)}
                streetView={true}
                yesIWantToUseGoogleMapApiInternals
            >

                {content.length > 0 &&
                    content.map(c => (
                        <Marker
                            key={c.advertNo}
                            title={`${c.advertNo} - ${currencyFormatter.format(c?.advertPrice, { thousand: '.', precision: 0 })} TL`}
                            position={{ lat: c.latitude, lng: c.longitude }}
                            icon={{
                                url: "/assets/images/logo/logo-short.png",
                                scaledSize: new window.google.maps.Size(50, 50),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15),
                            }}
                            onClick={(e) => {
                                setSelected({
                                    lat: c.latitude,
                                    lng: c.longitude,
                                    title:`${c.advertTitle}`,
                                    processName:`${c.processName}`,
                                    advertNo:`İlan No:${c.advertNo}`,
                                    price: `İlan Fiyatı: ${currencyFormatter.format(c?.advertPrice, { thousand: '.', precision: 0 })} TL`,
                                    desc: `Latitude: ${c.latitude}, Longitude: ${c.longitude}`,
                                    linkUrl: `/ilan-detay/${c.advertNo}`,
                                    imgURL: c.advertCoverPhoto
                                });
                            }}
                        />
                    ))

                }



                {selected && selected.title && selected.desc ? (
                    <InfoWindow
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={(e) => {
                            setSelected(e?.target.value);
                        }}
                    >
                        <div>
                            <h5>{selected?.title} - <span className="status_tag badge ms-2">{selected?.processName || ""}</span></h5>
                            <p>{selected?.advertNo} </p>
                            <p>{selected?.price} </p>
                            <img src={selected?.imgURL || ''} alt={selected?.title} />
                            <p>
                                <Link
                                    href={selected?.linkUrl || '#'}
                                >
                                    İlana Git
                                </Link>
                            </p>
                            {/* <p>
                                <Link
                                    href={`https://www.google.com/maps?ll=${selected?.lat},${selected?.lng}&z=19&t=m&hl=en-US&gl=US&mapclient=apiv3&cid=6528365072648182307`}
                                    target="_blank"
                                >
                                    Google Haritalar&apos;da görüntüle
                                </Link>
                            </p> */}
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>

        </div>
    );
}


export default MyMap;
