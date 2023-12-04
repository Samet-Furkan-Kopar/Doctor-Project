import Link from "next/link";
import Slider from "react-slick";
import properties from "../../data/properties";
import Image from "next/image";
import { useEffect, useState } from "react";
import imageLoader from "../../utils/imageLoader";
import currencyFormatter from "currency-formatter"
import createAddresStr from "../../utils/createAddresStr";
import { getCurrentUser, getPresentationStatus } from "../../utils/auth";
import { useSelector } from "react-redux";

const FeaturedProperties = ({ advertList }) => {
  const [list, setList] = useState([])
  const images = advertList.map((item) => item?.advertDetail?.numberOfBathroom?.options);
  const settings = {
    dots: true,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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

  useEffect(() => {
    if (advertList?.length) {
      setList(advertList.map((item) => (
        <div className="item" key={item?.advertDetail?._id?.options}>
          <div className="feat_property">
            <div className="thumb">
              <Image
                loader={imageLoader}
                width={343}
                height={220}
                className="img-whp w-100 h-100 contain"
                src={item?.advertDetail?.coverPhoto?.options || '/assets/images/logo/logo.jpg'}
                alt={item?.advertDetail?.adverTitle?.options}
              />
              <div className="thmb_cntnt">
                <ul className="tag mb0">
                  <li className="list-inline-item">
                    <a href="#">{item?.advertDetail?.processName?.options}</a>
                  </li>
                </ul>

                {/* End .icon */}

                <Link href={`/ilan-detay/${item?.advertDetail?.advertNo?.options}`} className="fp_price">
                  {currencyFormatter.format(item?.advertDetail.advertPrice.options, { thousand: '.', precision: 0 })} TL
                </Link>
              </div>
            </div>
            {/* End .thumb */}

            <div className="details">
              <div className="tc_content">
                <p style={{ color: "red" }}>{item?.advertDetail?.advertTypeName?.options}</p>
                <h4>
                  <Link href={`/ilan-detay/${item?.advertDetail?.advertNo?.options}`}>{item?.advertDetail?.adverTitle?.options}</Link>
                </h4>
                <p className="grid-address">
                  <span className="flaticon-placeholder"></span>
                  {createAddresStr(item?.advertDetail?.country?.options, item?.advertDetail?.city?.options, item?.advertDetail?.district?.options, item?.advertDetail?.neighbourhood?.options) || "-"}
                </p>

                <ul className="prop_details mb0">

                </ul>
              </div>
              {/* End .tc_content */}
              <div className="fp_footer">
                <ul className="fp_meta float-start mb0">
                  <li className="list-inline-item">
                    <Link href="/ofis-detay">
                      {presentMode ?
                        <Image
                          loader={imageLoader}
                          width={40}
                          height={40}
                          src={currentUser?.advisorProfilePhoto || '/assets/images/logo/logo-short.png'}
                          alt={item?.advertDetail?.ownerName?.options}
                        /> :
                        <Image
                          loader={imageLoader}
                          width={40}
                          height={40}
                          src={item?.advertDetail?.ownerCoverPhoto?.options || '/assets/images/logo/logo-short.png'}
                          alt={item?.advertDetail?.ownerName?.options}
                        />

                      }

                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <p>{presentMode ? currentUser?.firstAndLastName : item?.advertDetail?.ownerName?.options}</p>
                  </li>
                </ul>
              </div>
              {/* End .fp_footer */}
            </div>
            {/* End .details */}
          </div>
        </div>
      )))
    }
  }, [advertList])

  return (
    <>
      <Slider {...settings} arrows={true} infinite={advertList?.length >= 3}>
        {list}
      </Slider>
    </>
  );
};

export default FeaturedProperties;
