import { useEffect, useState } from "react";


const WhyChooseHome = ({ style = "", content }) => {
    console.log(content)
    const [subtitle1, setSubtitle1] = useState('')
    const [subtitle1Desc, setSubtitle1Desc] = useState('')
    const [subtitle2, setSubtitle2] = useState('')
    const [subtitle2Desc, setSubtitle2Desc] = useState('')
    const [subtitle3, setSubtitle3] = useState('')
    const [subtitle3Desc, setSubtitle3Desc] = useState('')

    useEffect(() => {
        if (content) {
            content?.subtitle_1 && setSubtitle1(content?.subtitle_1)
            content?.subtitle_1_short_description && setSubtitle1Desc(content?.subtitle_1_short_description)
            content?.subtitle_2 && setSubtitle2(content?.subtitle_2)
            content?.subtitle_2_short_description && setSubtitle2Desc(content?.subtitle_2_short_description)
            content?.subtitle_3 && setSubtitle3(content?.subtitle_3)
            content?.subtitle_3_short_description && setSubtitle3Desc(content?.subtitle_3_short_description)
        }
    }, [content])



    return (
        <>
            <div className="col-md-6 col-lg-4 col-xl-4" >
          <div className={`why_chose_us ${style}`}>
            <div className="icon">
              <span className="flaticon-high-five"></span>
            </div>
            <div className="details">
              <h4>{subtitle1}</h4>
              <p>{subtitle1Desc}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 col-xl-4" >
          <div className={`why_chose_us ${style}`}>
            <div className="icon">
              <span className="flaticon-home-1"></span>
            </div>
            <div className="details">
              <h4>{subtitle2}</h4>
              <p>{subtitle2Desc}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 col-xl-4" >
          <div className={`why_chose_us ${style}`}>
            <div className="icon">
              <span className="flaticon-profit"></span>
            </div>
            <div className="details">
              <h4>{subtitle3}</h4>
              <p>{subtitle3Desc}</p>
            </div>
          </div>
        </div>

            {/* <div className="col-md-6 col-lg-3 col-xl-3" style={{ marginBottom: "20px", display: "flex" }}>
                <div className={`why_chose_us ${style}`} style={{ height: "90%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div className="icon" >
                        <span className="flaticon-high-five"></span>
                    </div>
                    <div className="details text-center">
                        <h4>{subtitle1}</h4>
                        <p>{subtitle1Desc}</p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-3 col-xl-3" style={{ marginBottom: "20px", display: "flex" }}>
                <div className={`why_chose_us ${style}`} style={{ height: "90%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div className="icon" >
                        <span className="flaticon-home-1"></span>
                    </div>
                    <div className="details text-center">
                        <h4>{subtitle2}</h4>
                        <p>{subtitle2Desc}</p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-3 col-xl-3" style={{ marginBottom: "20px", display: "flex" }}>
                <div className={`why_chose_us ${style}`} style={{ height: "90%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div className="icon"  >
                        <span className="flaticon-profit"></span>
                    </div>
                    <div className="details text-center">
                        <h4></h4>
                        <h4>{subtitle3}</h4>
                        <p>{subtitle3Desc}</p>
                    </div>
                </div>
            </div> */}

        </>
    );
};
export default WhyChooseHome;
