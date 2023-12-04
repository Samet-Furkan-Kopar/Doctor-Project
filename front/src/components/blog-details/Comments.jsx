import Image from "next/image";
import Ratings from "./Ratings";
import imageLoader from "../../utils/imageLoader";

const Comments = () => {
  const commmetContent = [
    {
      id: 1,
      img: "1",
      name: " Diana Cooper",
      ratings: (
        <>
          <Ratings />
        </>
      ),
      data: "",
      text: `Beautiful home, very picturesque and close to everything in jtree! A
      little warm for a hot weekend, but would love to come back during
      the cooler seasons!`,
    },
    {
      id: 2,
      img: "2",
      name: "Ali Tufan",
      ratings: (
        <>
          <Ratings />
        </>
      ),
      data: "",
      text: `Beautiful home, very picturesque and close to everything in jtree! A
      little warm for a hot weekend, but would love to come back during
      the cooler seasons!`,
    },
  ];
  return (
    <>
      {commmetContent.map((item) => (
        <div className="mbp_first media" key={item.id}>
          <Image
            loader={imageLoader}
            width={80}
            height={80}
            src={`/assets/images/testimonial/${item.img}.png`}
            className="mr-3"
            alt={item.img}
          />
          <div className="media-body">
            <h4 className="sub_title mt-0">
              {item.name}
              <span className="sspd_review">
                <ul className="mb0 pl15">{item.ratings}</ul>
              </span>
            </h4>
            <a className="sspd_postdate fz14" href="#">
              {item.data}
            </a>
            <p className="fz14 mt10">{item.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Comments;
