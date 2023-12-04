import Image from "next/image";
import testimonials from "../../data/testimonial";
import Slider from "react-slick";
import imageLoader from "../../utils/imageLoader";

const Testimonial = () => {
  const settings = {
    dots: true,
    arrow: false,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <>
      <Slider {...settings} arrows={false}>
        {testimonials.slice(0, 5).map((item) => (
          <div className="item" key={item.id}>
            <div className="testimonial_grid style2">
              <div className="thumb">
                <Image
                  loader={imageLoader} width={104} height={104} src={item.img} alt="1.jpg" />
                <div className="tg_quote">
                  <span className="fa fa-quote-left"></span>
                </div>
              </div>
              <div className="details">
                <h4>{item.name}</h4>
                <p>{item.designation}</p>
                <p className="mt25">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Testimonial;