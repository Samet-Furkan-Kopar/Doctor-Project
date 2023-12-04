import { useEffect, useState } from "react";
import BreadCrumb from "../common/BreadCrumb";

const BreadCrumbBanner = ({bgimage = "", bgimagealttext = ""}) => {
  const [url, setUrl] = useState('/assets/images/contact/breadimg.jpg')
  useEffect(() => {
    if(bgimage){
      setUrl(bgimage)
    }
  }, [bgimage])

  return (
    <section className="inner_page_breadcrumb" style={{backgroundImage:`url(${url})`}}>
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="breadcrumb_content">
              <BreadCrumb title="Kayıt Ol" />
              {/* <h4 className="breadcrumb_title">Register</h4> */}
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbBanner;
