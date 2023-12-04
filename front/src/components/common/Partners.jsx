import Image from "next/image";
import imageLoader from "../../utils/imageLoader";

const Partners = () => {
  const partnersImages = ["1", "2", "3", "4", "5"];
  return (
    <>
      {partnersImages.map((val, i) => (
        <div className="col-sm-6 col-md-4 col-lg" key={i}>
          <div className="our_partner">
            <Image
              loader={imageLoader}
              width={106}
              height={71}
              className="contain"
              src={`/assets/images/partners/${val}.png`}
              alt="1.png"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Partners;
