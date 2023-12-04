import { useState } from "react";
import ReactHtmlParser from 'react-html-parser';

const PropertyDescriptionsBlog = ({ property }) => {
  const [click, setClick] = useState(true);
  const handleClick = () => setClick(!click);
  console.log(property);
  return (
    <>
      <p className={click ? "gpara second_para white_goverlay mt10 mb10" : ""}>
        {ReactHtmlParser(property?.content)}
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

export default PropertyDescriptionsBlog;

// import { useState } from "react";
// import ReactHtmlParser from 'react-html-parser';

// const PropertyDescriptionsBlog = ({ property }) => {
//   const [click, setClick] = useState(true);
//   const handleClick = () => setClick(!click);
//   console.log(property);
//   return (
//     <>
//       <div style={{maxWidth:"100%",marginRight:"auto",marginLeft:"auto"}} className={click ? "gpara-container second_para white_goverlay mt10 mb10" : ""}>
//         {ReactHtmlParser(property?.content)}
//       </div>

//       <p className="overlay_close">
//         <a
//           className="text-thm fz14"
//           data-bs-toggle="collapse"
//           href="#collapseExample"
//           role="button"
//           aria-expanded="false"
//           aria-controls="collapseExample"
//           onClick={handleClick}
//         >
//           Daha fazla <span className="flaticon-download-1 fz12"></span>
//         </a>
//       </p>
//     </>
//   );
// };

// export default PropertyDescriptionsBlog;
