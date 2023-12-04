import { useState } from "react";
import PropertyDescriptions from "../common/listing-details/PropertyDescriptions";
import PropertyDetails from "../common/listing-details/PropertyDetails";
import PropertyFeatures from "../common/listing-details/PropertyFeatures";
import MyMap from "./MyMap";

const DetailsContent = ({ property }) => {

  const checkFeatureIncludeChecked = (feature) => {
    if (feature.length) {
      let ctrlStatus = false;
      feature.map(f => {
        if (f.status) {
          ctrlStatus = true
        }
      })
      return ctrlStatus;
    } else {
      return false
    }
  }


  return (
    <>
      {property?.advertDetail?.advertDetail?.options && (
        <div className="listing_single_description">
          {/* End .lsd_list */}

          <h4 className="mb30">
            {property?.advertDetail?.advertDetail?.label}
          </h4>

          <PropertyDescriptions property={property} />
        </div>
      )}
      {/* End .listing_single_description */}

      <div className="additional_details">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="mb15">
              {property?.advertDetail?.advertDetail?.label}
            </h4>
          </div>
          <PropertyDetails property={property} />
        </div>
      </div>
      {/* End .additional_details */}



      {/* End .feature_area */}
      <div className="shop_single_tab_content style2 mt30">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          {property?.features && <li className="nav-item">
            <a
              className="nav-link active"
              data-bs-toggle="tab"
              href="#features"
              role="tab"
            >
              İlan Özellikleri
            </a>
          </li>}
          {!property?.advertDetail?.isMapActive?.value &&
            <>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#harita"
                  role="tab"
                >
                  Harita
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  href="#sokak"
                  role="tab"
                >
                  Sokak Görünümü
                </a>
              </li>
            </>
          }
        </ul>
      </div>
      <div className="tab-content" id="myTabContent2">
        <div
          className="tab-pane fade show active"
          id="features"
          role="tabpanel"
        >
          {property?.features &&
            property.features.map((feature, k) => (
              checkFeatureIncludeChecked(feature.features) &&
              <div key={feature?._id} className={k === 0 ? "application_statics" : "application_statics mt30"}>
                <div className="row">
                  <div className="col-lg-12">
                    <h4 className="mb10">{feature.subtitle}</h4>
                  </div>
                  {/* End .col */}

                  <PropertyFeatures feature={feature} />
                </div>
              </div>
            ))}
        </div>


        {!property?.advertDetail?.isMapActive?.value &&
          <>
            <div
              className="tab-pane fade show"
              id="harita"
              role="tabpanel"
            >
              <div className="application_statics">
                <div className="property_video p0">
                  <MyMap property={property} street={false} />
                </div>
              </div>
              {/* End .location_area */}
            </div>
            <div
              className="tab-pane fade show"
              id="sokak"
              role="tabpanel"
            >
              <div className="application_statics">
                <div className="property_video p0">
                  <MyMap property={property} street={true} />
                </div>
              </div>
              {/* End .location_area */}
            </div>
          </>
        }
      </div>
      {/* End .tab-conten */}


    </>
  );
};

export default DetailsContent;
