import currencyFormatter from "currency-formatter"

const PropertyDetailsBlog = ({ property }) => {

  console.log('BUNUN DETAYI NEDİR', property)
  return (
    <>
      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              {property?.advertDetail?.advertNo?.label} :{" "}
              <span>{property?.advertDetail?.advertNo?.options}</span>
            </p>
          </li>
          <li>
            <p>
              {property?.advertDetail?.advertPrice?.label} :{" "}
              <span> {currencyFormatter.format(property?.advertDetail?.advertPrice?.options, { thousand: '.', precision: 0 }) || "-"} TL </span>
            </p>
          </li>
        
          {property?.advertDetail?.squareMeterNet &&
            <li>
              <p>
                {property?.advertDetail?.squareMeterNet?.label} :{" "}
                <span>{property?.advertDetail?.squareMeterNet?.options}</span>
              </p>
            </li>
          }
            {property?.advertDetail?.squareMeterPrice &&
            <li>
              <p>
                {property?.advertDetail?.squareMeterPrice?.label} :{" "}
                <span>{property?.advertDetail?.squareMeterPrice?.value ? property?.advertDetail?.squareMeterPrice?.value.toFixed(2) : '-'} TL</span>
              </p>
            </li>
          }
          {property?.advertDetail?.forFlatName &&
            <li>
              <p>
                {property?.advertDetail?.forFlatName?.label || "-"} :{" "}
                <span>{property?.advertDetail?.forFlatName?.options ? "Evet" : "Hayır"}</span>
              </p>
            </li>
          }
        </ul>
      </div>
      {/* End .col */}

      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          {property?.advertDetail?.zoningStatus &&
            <li>
              <p>
                {property?.advertDetail?.zoningStatus?.label || "-"} :{" "}
                <span>{property?.advertDetail?.zoningStatus?.options || "-"}</span>
              </p>
            </li>
          }
          {property?.advertDetail?.usingStatus &&
            <li>
              <p>
                {property?.advertDetail?.usingStatus?.label || "-"} :{" "}
                <span>{property?.advertDetail?.usingStatus?.options || "-"}</span>
              </p>
            </li>
          }
          {property?.advertDetail?.titleDeedStatus &&
            <li>
              <p>
                {property?.advertDetail?.titleDeedStatus?.label || "-"} :{" "}
                <span>
                  {property?.advertDetail?.titleDeedStatus?.options || "-"}
                </span>
              </p>
            </li>
          }

        </ul>
      </div>
      {/* End .col */}

      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          {property?.advertDetail?.advertShapeName &&
            <li>
              <p>
                {property?.advertDetail?.advertShapeName?.label || "-"} : 
                <span>
                  {property?.advertDetail?.advertShapeName?.options || "-"}
                </span>
              </p>
            </li>
          }
          {property?.advertDetail?.processName &&
            <li>
              <p>
                {property?.advertDetail?.processName?.label || "-"} :{" "}
                <span> {property?.advertDetail?.processName?.options || "-"}</span>
              </p>
            </li>
          }
          {property?.advertDetail?.advertTypeName &&
            <li>
              <p>
                {property?.advertDetail?.advertTypeName?.label || "-"} :
                <span>
                  {property?.advertDetail?.advertTypeName?.options || "-"}
                </span>
              </p>
            </li>
          }
        </ul>
      </div>
    </>
  );
};

export default PropertyDetailsBlog;
