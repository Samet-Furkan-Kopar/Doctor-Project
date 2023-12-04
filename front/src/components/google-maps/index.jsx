import React from "react";
import Image from "next/image";
import imageLoader from "../../utils/imageLoader";
export default function index() {
  return (
    <div className="container-fluid p0 mt50">
      <div className="row">
        <div className="col-lg-12">
          <div className="h600" id="map-canvas">
            <div className="gmap_canvas pe-none">
              <iframe
                title="map"
                className="gmap_iframe"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d193309.02147838814!2d-74.53513266718751!3d40.79602810000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1663993365939!5m2!1sen!2sbd"
              ></iframe>
              {/* End iframe */}

              <Image
                loader={imageLoader}
                width={32}
                height={50}
                className="location-finder"
                src="/assets/images/location.png"
                alt="location"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
