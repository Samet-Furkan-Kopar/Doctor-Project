import { useState } from "react";
import ReactHtmlParser from 'react-html-parser';

const PropertyDescriptions = ({ property }) => {
  const [click, setClick] = useState(true);
  const handleClick = () => setClick(!click);
  return (
    <>
      <p className={click ? "gpara second_para white_goverlay mt10 mb10" : ""}>
        {ReactHtmlParser(property?.description)}
      </p>

      <p className="overlay_close">
        <a
          className="text-thm fz14"
          data-bs-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          onClick={handleClick}
        >
          Daha fazla <span className="flaticon-download-1 fz12"></span>
        </a>
      </p>
    </>
  );
};

export default PropertyDescriptions;
