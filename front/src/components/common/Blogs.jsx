import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import imageLoader from "../../utils/imageLoader";

const Blogs = ({ blog }) => {
  console.log('blog,', blog)
  const [list, setList] = useState([]);
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
  };
  useEffect(() => {
    if (blog?.length) {
      setList(blog.map((item) => (
        <div style={{ marginBottom: "20px", display: "flex" }} className="col-md-6 col-lg-4 col-xl-4" key={item._id}>
          <div style={{ marginRight: "10px", height: "90%", display: "flex", flexDirection: "column", alignItems: "center" }} className="for_blog feat_property">
            <div className="thumb">
              <Link href={`/blog-detay/${item.seoUrl}`}>
                <Image
                  loader={imageLoader}
                  width={343}
                  height={220}
                  className="img-whp w-100 h-100 contain"
                  src={blog.coverPhoto || '/assets/images/logo/logo.jpg'}
                  alt={item.title}
                />
              </Link>
            </div>
            <div className="details">
              <div className="tc_content">
                <p className="text-thm">{item.short_decription}</p>
                <h4>
                  <Link href={`/blog-detay/${item.seoUrl}`}>{item.title}</Link>
                </h4>
              </div>
            </div>
          </div>
        </div>
      )))
    }
  }
    , [blog]);

  return (

    <>
      <Slider {...settings} arrows={true}>
        {list}
      </Slider>
    </>
  );
}

export default Blogs;
