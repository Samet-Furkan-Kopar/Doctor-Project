import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLength } from "../../../features/properties/propertiesSlice";
import Image from "next/image";
import createAddresStr from "../../../utils/createAddresStr";
import imageLoader from "../../../utils/imageLoader";

const FeaturedItem = ({ properties }) => {
  const {
    keyword,
    location,
    status,
    propertyType,
    price,
    bathrooms,
    bedrooms,
    garages,
    yearBuilt,
    area,
    amenities,
  } = useSelector((state) => state.properties);
  const { statusType, featured, isGridOrList } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();
  // status handler
  let content = properties?.map((item) => (
    <div className="col-md-4 col-lg-4" key={item._id}>
      <div className="feat_property home7 agent">
        <div className="thumb">
          <Link href={`/ofis-detay/${item._id}`}>
            <Image
              loader={imageLoader}
              width={342}
              height={262}
              className="img-whp w-100 h-100 contain"
              style={{objectFit: 'contain'}}
              src={item.officeCoverPhoto || '/assets/images/logo/logo.jpg'}
              alt={item.companyTitle}
            />


          </Link>
          <div className="thmb_cntnt">
            <ul className="tag mb0">
              <li className="list-inline-item dn"></li>
              <li className="list-inline-item">
                <a href="#">{item.numberOfAds} İlan</a>
              </li>
            </ul>
          </div>
        </div>
        {/* End .thumb */}

        <div className="details">
          <div className="tc_content">
            <h4>
              <Link href={`/ofis-detay/${item._id}`}>{item.companyName}</Link>
            </h4>
            <p className="text-thm">{item.companyTitle}</p>
            <ul className="prop_details mb0">
              <li>
                <a href="#">Telefon: {item.officeNumber}</a>
              </li>
              <li>
                <a href="#">E-posta: {item.officeEmail}</a>
              </li>
              <li>
                <a href="#">Adres: {createAddresStr(item.officeCountry, item.officeCity, item.officeDistrict, item.officeNeighbourhood)}</a>
              </li>
            </ul>
          </div>
          {/* End .tc_content */}

          <div className="fp_footer">
            <ul className="fp_meta float-start mb0">
              {/* {item.socialList.map((social, i) => (
                <li className="list-inline-item" key={i}>
                  <a
                    href={social.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`fa ${social.icon}`}></i>
                  </a>
                </li>
              ))} */}
            </ul>
            <div className="fp_pdate float-end ">
              <Link href={`/ofis-detay/${item._id}`} className="text-thm">
                Tüm İlanlar <i className="fa fa-angle-right"></i>
              </Link>
            </div>
          </div>
          {/* End .fp_footer */}
        </div>
      </div>
    </div>
  ));

  // add length of filter items
  useEffect(() => {
    dispatch(addLength(content?.length));
  }, [dispatch, content]);

  return <>{content}</>;
};

export default FeaturedItem;
