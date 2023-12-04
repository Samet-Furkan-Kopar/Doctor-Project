import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import createAddresStr from "../../utils/createAddresStr";
import logo from "../../../public/assets/images/logo/logo.jpg"
import imageLoader from "../../utils/imageLoader";

const Offices = ({ ofis }) => {
  console.log('blog,', ofis)




  const [list, setList] = useState([]);
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
  useEffect(() => {
    if (ofis?.length) {
      setList(ofis.map((item) => (
        <div className="item p-1" key={item?._id}>
          <div className="feat_property">
            <div className="thumb">
              <Link
                href={`/ofis-detay/${item._id}`}
                className="d-block mx-auto text-center"
              >
                <Image
                loader={imageLoader}
                  width={351}
                  height={220}
                  className="contain"
                  src={item.officeCoverPhoto || logo}
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

            <div className="details">
              <div className="tc_content">
                <h4>
                  <Link href={`/ofis-detay/${item._id}`}>{item.companyName}</Link>
                </h4>
                <ul className="prop_details mb0">
                  <li>
                    <a href="#">Telefon: {item.officeNumber}</a>
                  </li>
                  <li>
                    <a href="#">E-posta: {item.officeEmail}</a>
                  </li>
                  <li>
                    <a href="#">Adres: {createAddresStr(item.officeCOuntry, item.officeCity, item.officeDistrict, item.officeNeighbourhood)}</a>
                  </li>
                </ul>
              </div>
              {/* End .tc_content */}

              <div className="fp_footer">
                <ul className="fp_meta float-start mb0">
                  <li className="list-inline-item">
                    <a
                      href={item.officefacebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={`fa fa-facebook`}></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href={item.officetwitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={`fa fa-twitter`}></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href={item.officeinstagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={`fa fa-instagram`}></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href={item.officelinkedln}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={`fa fa-linkedin`}></i>
                    </a>
                  </li>
                </ul>
                <div className="fp_pdate float-end text-thm">
                  <Link href={`/ofis-detay/${item._id}`} className="text-thm">
                    Tüm İlanlar <i className="fa fa-angle-right"></i>
                  </Link>
                </div>
              </div >
              {/* End .fp_footer */}
            </div >
          </div >
        </div >
      )))
    }
  }
    , [ofis]);

  return (

    <>
      <Slider {...settings} arrows={true} infinite={ofis?.length >= 3}>
        {list}
      </Slider>
    </>
  );
}

export default Offices;
