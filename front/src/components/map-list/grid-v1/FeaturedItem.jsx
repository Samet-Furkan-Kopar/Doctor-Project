import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLength } from "../../../features/properties/propertiesSlice";
import Image from "next/image";
import filterService from "../../../services/filter.service";
import imageLoader from "../../../utils/imageLoader";
const FeaturedItem = () => {
  const [content, setContent] = useState([]);

  const properties = useSelector((state) => state.properties);
  const { statusType, featured, isGridOrList } = useSelector(
    (state) => state.filter
  );

  const dispatch = useDispatch();

  // status filter
  const statusTypeHandler = (a, b) => {
    if (statusType === "recent") {
      return a.created_at + b.created_at;
    } else if (statusType === "old") {
      return a.created_at - b.created_at;
    } else if (statusType === "") {
      return a.created_at + b.created_at;
    }
  };

  useEffect(() => {
    filterService
      .getFilteredContent(
        properties.allFilter,
        properties.allLocation,
        properties.allQuery
      )
      .then((res) => {
        if (res?.data?.succedd) setContent(res?.data?.data);
        else setContent([]);
      });
  }, [properties]);

  // add length of filter items
  useEffect(() => {
    dispatch(addLength(content.length));
  }, [dispatch, content]);

  return (
    <>
      {content.length > 0 ? (
        content.map((item) => (
          <Link
            href={`/ilan-detay/${item.advertNo}`}
            className={`${
              isGridOrList ? "col-12 feature-list" : "col-md-4 col-lg-4"
            } `}
            key={item.advertNo}
          >
            <div
              className={`feat_property home7 style4 ${
                isGridOrList ? "d-flex align-items-center" : undefined
              }`}
            >
              <div className="thumb">
                <Image
                  loader={imageLoader}
                  width={342}
                  height={220}
                  className="img-whp w-100 h-100 cover"
                  src={
                    item?.advertDetail?.coverPhoto?.options ||
                    "/assets/images/logo/logo-short.png"
                  }
                  alt="fp1.jpg"
                />
                <div className="thmb_cntnt">
                  <ul className="tag mb0">
                    <li className="list-inline-item">
                      <a href="#">Featured</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="text-capitalize">
                        Özellikler
                      </a>
                    </li>
                  </ul>
                  <ul className="icon mb0">
                    <li className="list-inline-item">
                      <a href="#">
                        <span className="flaticon-heart"></span>
                      </a>
                    </li>
                  </ul>

                  <Link
                    href={`/ilan-detay/${item.advertNo}`}
                    className="fp_price"
                  >
                    {item?.advertPrice}
                  </Link>
                </div>
              </div>
              <div className="details">
                <div className="tc_content">
                  <p className="text-thm">{item.advertTypeName}</p>
                  <h4>
                    <Link href={`/ilan-detay/${item?.advertNo}`}>
                      {item.adverTitle}
                    </Link>
                  </h4>
                  <p>
                    <span className="flaticon-placeholder"></span>
                    {item?.address || "-"}
                  </p>

                  <ul className="prop_details mb0">
                    {item?.itemDetails?.map((val, i) => (
                      <li className="list-inline-item" key={i}>
                        <a href="#">
                          {val.name}: {val.number}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* End .tc_content */}

                <div className="fp_footer">
                  <ul className="fp_meta float-start mb0">
                    <li className="list-inline-item">
                      <Link href="/agent-v2">
                        <Image
                          loader={imageLoader}
                          width={40}
                          height={40}
                          src={
                            item?.advertDetail?.ownerCoverPhoto?.options ||
                            "/assets/images/logo/logo-short.png"
                          }
                          alt="pposter1.png"
                        />
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link href="/agent-v2">{item?.ownerName}</Link>
                    </li>
                  </ul>
                  <div className="fp_pdate float-end">{item?.postedYear}</div>
                </div>
                {/* End .fp_footer */}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="d-flex justify-content-center w-100 text-dark h2">
          İlan bulunamadı.
        </div>
      )}
    </>
  );
};

export default FeaturedItem;
