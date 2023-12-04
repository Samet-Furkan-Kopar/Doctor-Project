import { useEffect, useState } from "react";
import GlobalHeroFilter from "../common/GlobalHeroFilter";

const HeroFilter = ({content, processTypes, officeList, advertTypes, cityList}) => {

    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    useEffect(() => {
      if(content){
        content?.title && setTitle(content?.title)
        content?.alt_text && setSubtitle(content?.alt_text)
      }
    }, [content])

    return (
        <div className="home_content">
            <div  className="home-text text-center">
                <h2 className="fz55">{title}Sağlık Huzur</h2>
                <p className="fz18 color-white">{subtitle}Mutluluk</p>
            </div>
            {/* End .home-text */}

            {/* <GlobalHeroFilter processTypes={processTypes} officeList={officeList} advertTypes={advertTypes} cityList={cityList}/> */}
        </div>
    );
};

export default HeroFilter;
