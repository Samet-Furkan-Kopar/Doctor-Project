import Image from "next/image";
import HeroFilter from "./HeroFilter";
import { useEffect, useState } from "react";
import imageLoader from "../../utils/imageLoader";

const Hero = ({ content, processTypes, advertTypes, cityList, officeList }) => {
  const [imgURL, setImgURL] = useState('')
  const [toppartContent, setTopPartContent] = useState({})

  useEffect(() => {
    if (content?.length) {
      const targetContent = content.find(c => c.page === 'homepage' && c.type === 'toppart')
      if (targetContent) {
        targetContent?.content?.image && setImgURL(targetContent?.content?.image)
        targetContent.content && setTopPartContent(targetContent.content)
      }
    }
  }, [content])

  return (
    <section className="home-one home1-overlay home1_bgi1" style={{backgroundImage: 'url("/assets/images/background/homepage.jpg")'}}>
      <div className="container">
        <div className="row posr">
          <div className="col-lg-12">
            <HeroFilter content={toppartContent} processTypes={processTypes} officeList={officeList} advertTypes={advertTypes} cityList={cityList} />
          </div>
        </div>
      </div>
      {/* End .container */}

      <div className="mouse_scroll">
        <a href="#feature-property">
          <div className="icon">
            <h4>Daha Fazlası İçin</h4>
            <p>Aşağı Kaydır</p>
          </div>
          <div className="thumb">
            <Image
              loader={imageLoader}
              width={21}
              height={35}
              src="/assets/images/resource/mouse.png"
              alt="mouse.png"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
