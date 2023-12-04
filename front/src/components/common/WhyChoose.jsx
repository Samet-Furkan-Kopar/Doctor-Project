import { useEffect, useState } from "react";
import sanitizeHtml from 'sanitize-html';

const WhyChoose = ({ style = "", pageContentAbout}) => {
  console.log("pageContentAbout",pageContentAbout)


  const desc = pageContentAbout?.description
  const desc2 = pageContentAbout?.description2
  const desc3 = pageContentAbout?.description3
  const sanitizeHtmlOptions = {
    allowedTags: [ 'a', 'ul', 'li'], // İzin verilen etiketler
    allowedAttributes: {
      'a': ['href', 'target'], // İzin verilen özellikler
    },
  };
  
  function customSanitizeHtml(html) {
    return sanitizeHtml(html, sanitizeHtmlOptions);
  }
  const cleanedHtml = customSanitizeHtml(desc);
  const cleanedHtml2 = customSanitizeHtml(desc2);
  const cleanedHtml3 = customSanitizeHtml(desc3);




  return (
    <>
      {/* <div className="col-md-6 col-lg-3 col-xl-3" >
        <div className={`why_chose_us ${style}`}>
          <div className="icon">
            <span className="flaticon-high-five"></span>
          </div>
          <div className="details">
            <h4>{subtitle1}</h4>
            <p>{subtitle1Desc}</p>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-3 col-xl-3"  >
        <div className={`why_chose_us ${style}`}>
          <div className="icon">
            <span className="flaticon-home-1"></span>
          </div>
          <div className="details">
            <h4>{subtitle2}</h4>
            <p>{subtitle2Desc}</p>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-3 col-xl-3"  >
        <div className={`why_chose_us ${style}`}>
          <div className="icon">
            <span className="flaticon-profit"></span>
          </div>
          <div className="details">
            <h4>{subtitle3}</h4>
            <p>{subtitle3Desc}</p>
          </div>
        </div>
      </div> */}
     
  <div className="col-md-6 col-lg-3 col-xl-3" style={{ marginBottom: "20px",display:"flex" }}>
    <div className={`why_chose_us ${style}`} style={{ height: "90%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="icon" >
        <span className="flaticon-high-five"></span>
      </div>
      <div className="details text-center">
        <h4></h4>
        <p>{cleanedHtml}</p>
      </div>
    </div>
  </div>
  <div className="col-md-6 col-lg-3 col-xl-3" style={{ marginBottom: "20px" ,display:"flex"}}>
    <div className={`why_chose_us ${style}`} style={{ height: "90%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="icon" >
        <span className="flaticon-home-1"></span>
      </div>
      <div className="details text-center">
        <h4></h4>
        <p>{cleanedHtml2}</p>
      </div>
    </div>
  </div>
  <div className="col-md-6 col-lg-3 col-xl-3" style={{ marginBottom: "20px",display:"flex" }}>
    <div className={`why_chose_us ${style}`} style={{ height: "90%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="icon"  >
        <span  className="flaticon-profit"></span>
      </div>
      <div className="details text-center">
        <h4></h4>
        <p>{cleanedHtml3}</p>
      </div>
    </div>
  </div>



    </>
  );
};

export default WhyChoose;
