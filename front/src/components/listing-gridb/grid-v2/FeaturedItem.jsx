import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLength } from "../../../features/properties/propertiesSlice";
import Image from "next/image";
import filterService from "../../../services/filter.service";
import imageLoader from "../../../utils/imageLoader";
import currencyFormatter from "currency-formatter"
import createAddresStr from "../../../utils/createAddresStr";
import { getCurrentUser, getPresentationStatus } from "../../../utils/auth";

const FeaturedItem = () => {
  const [content, setContent] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0)
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
    // Bu, bileşen yüklendiğinde çağrılacak
    filterService.getFilteredContent(properties.allFilter, properties.allLocation, properties.allQuery)
      .then((res) => {
        console.log(res,"dwd");
        if (res.data) {
          console.log(res.data);
          setContent(res.data.data);
          setTotalRecord(res.data.totalRecort)
        } else {
          setContent([]);

        }
      })
      .catch((error) => {
        console.error('Hata:', error);
        // Hata yönetimi ekleyebilirsiniz
      });
  }, [properties]);

  // add length of filter items
  useEffect(() => {
    dispatch(addLength(totalRecord));
  }, [dispatch, totalRecord]);


  const presentationStatus = getPresentationStatus()
  const presentationMode = useSelector((state) => state.presentationMode);
  const [presentMode, setPresentMode] = useState(false)
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (presentationMode?.data?.status || presentationStatus?.status) {
      setPresentMode(true)
    } else {
      setPresentMode(false)
    }
  }, [presentationMode])


  return (
    <>
      {content.length > 0 ? (
        content.map((item) => (
          <Link
            href={`/blog-detayy/${item._id}`}
            className={`${isGridOrList ? "col-12 feature-list" : "col-md-4 col-lg-4"
              } `}
            key={item.advertNo}
          >
            <div
              className={`feat_property home7 style4 ${isGridOrList ? "d-flex align-items-center" : undefined
                }`}
            >
              <div className="thumb">
                <Image
                  loader={imageLoader}
                  width={342}
                  height={220}
                  className="img-whp w-100 h-100 contain"
                  src={
                    item?.coverPhoto ||
                    "/assets/images/logo/logo-short.png"
                  }
                  alt={item.title || ''}
                />
                <div className="thmb_cntnt">
                  <ul className="tag mb0">
                    {item?.processName &&
                      <li className="list-inline-item">
                        <a href="#" className="text-capitalize">
                          {item?.processName}
                        </a>
                      </li>
                    }
                  </ul>

                  {/* <Link
                    href={`/blog-detayyy/${item._id}`}
                    className="fp_price"
                  >
                    {currencyFormatter.format(item?.advertPrice, { thousand: '.', precision: 0 }) || "-"} TL
                  </Link> */}
                </div>
              </div>
              <div className="details">
                <div className="tc_content">
                  {/* <p className="text-thm">{item?.title || ''}</p> */}
                  <h4>
                    <Link href={`/blog-detayy/${item?._id}`}>
                      {item.title || ''}
                    </Link>
                  </h4>
                  <p className="grid-address">
                    {/* <span className="flaticon-placeholder"></span> */}
                    {item?.short_description || 'No description for this'}
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
                      <Link href="#">
                        {presentMode ?
                          <Image
                            loader={imageLoader}
                            width={40}
                            height={40}
                            src={item?.userId?.image_url || '/assets/images/logo/logo-short.png'}
                            alt={item?.userId?.firstName +" "+ item?.userId?.lastName || ''}
                          /> :
                          <Image
                            loader={imageLoader}
                            width={40}
                            height={40}
                            src={
                              item?.userId?.image_url ||
                              "/assets/images/logo/logo-short.png"
                            }
                            alt={item?.userId?.firstName +" "+ item?.userId?.lastName || ''}
                          />
                        }
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link href="#">{presentMode ?  item?.userId?.firstName +" "+  item?.userId?.lastName : item?.userId?.firstName +" "+  item?.userId?.lastName}</Link>
                    </li>
                  </ul>
                </div>
                {/* End .fp_footer */}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="d-flex justify-content-center w-100 text-dark h2">Blog bulunamadı.</div>
      )}
    </>
  );
};

export default FeaturedItem;
