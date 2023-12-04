import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import imageLoader from "../../../utils/imageLoader";
const FeatureProperties = ({ officeDataDetail }) => {
  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
  };
  return (
    <>
      <Slider {...settings} arrows={false}>
        {officeDataDetail?.isVitrinData?.map((item) => (
          <Link key={item?.advertNo?.options} href={`/ilan-detay/${item.advertNo.options}`}>
            <div className="item" >
              <div className="feat_property home7">
                <div className="thumb">
                  <Image
                    loader={imageLoader}
                    width={300}
                    height={220}
                    className="img-whp w-100 h-100 cover"
                    src={
                      item?.advertCoverPhoto?.options ||
                      "/assets/images/logo/logo-short.png"
                    }
                    alt="properties identity"
                  />

                  <div className="thmb_cntnt">
                    <a className="fp_price" href="#">
                      {item?.advertPrice?.options}
                    </a>
                    <h4 className="posr color-white">{item.title}</h4>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </>
  );
};

export default FeatureProperties;
