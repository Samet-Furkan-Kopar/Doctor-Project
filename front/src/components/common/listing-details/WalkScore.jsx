import Image from "next/image";
import imageLoader from "../../../utils/imageLoader";

const WalkScore = () => {
  return (
    <>
      <h4 className="mb30">
        Walkscore{" "}
        <span className="float-end">
          <Image
            loader={imageLoader}
            width={117}
            height={19}
            src="/assets/images/resource/wscore.png"
            alt="wscore.png"
          />
        </span>
      </h4>
      <div className="iba_container">
        <div className="icon_box_area">
          <div className="score">
            <span>70</span>
          </div>
          <div className="details">
            <h5>Walk Score</h5>
            <p>Somewhat Walkable</p>
          </div>
        </div>
        <div className="icon_box_area">
          <div className="score">
            <span>40</span>
          </div>
          <div className="details">
            <h5>Bike Score</h5>
            <p>Bikeable</p>
          </div>
        </div>
      </div>
      <a className="more_info" href="#">
        More Details Here
      </a>
    </>
  );
};

export default WalkScore;