import Image from "next/image";
import PopupVideo from "../common/PopupVideo";
import sanitizeHtml from 'sanitize-html';
import imageLoader from "../../utils/imageLoader";
const OurMission = ({ pageContentBanner }) => {
  const desc = pageContentBanner.short_description
  const sanitizeHtmlOptions = {
    allowedTags: ['a', 'ul', 'li'], // İzin verilen etiketler
    allowedAttributes: {
      'a': ['href', 'target'], // İzin verilen özellikler
    },
  };

  function customSanitizeHtml(html) {
    return sanitizeHtml(html, sanitizeHtmlOptions);
  }
  const cleanedHtml = customSanitizeHtml(desc);

  console.log("OurMission -> pageContent", pageContentBanner)
  const missionContent = [
    {
      id: 1,
      icon: "flaticon-user",
      number: "80,123",
      meta: "Customers to date",
    },
    {
      id: 2,
      icon: "flaticon-home",
      number: "$74 Billion",
      meta: "In home sales",
    },
    {
      id: 3,
      icon: "flaticon-transfer",
      number: "$468 Million",
      meta: "In Savings",
    },
  ];

  return (
    <>

      <div className="col-lg-8 col-xl-7">
        <div className="about_content">
          <p className="large">
            {pageContentBanner.title}
          </p>
          <p>

            {cleanedHtml}
          </p>
          <p>
            Maecenas quis viverra metus, et efficitur ligula. Nam congue augue
            et ex congue, sed luctus lectus congue. Integer convallis
            condimentum sem. Duis elementum tortor eget condimentum tempor.
            Praesent sollicitudin lectus ut pharetra pulvinar. Donec et libero
            ligula. Vivamus semper at orci at placerat.Placeat Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Quod libero amet, laborum
            qui nulla quae alias tempora.
          </p>

          <ul className="ab_counting">
            {missionContent.map((item) => (
              <li className="list-inline-item" key={item.id}>
                <div className="about_counting">
                  <div className="icon">
                    <span style={{ fontSize: "2rem" }} className={`${item.icon}`}></span>
                  </div>
                  <div className="details">
                    <h3>{item.number}</h3>
                    <p>{item.meta}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>


      <div className="col-lg-4 col-xl-5">
        <div className="about_thumb">
          <Image
            loader={imageLoader}
            width={461}
            height={509}
            priority
            className="img-fluid w100 cover"
            src={pageContentBanner.image}
            alt="1.jpg"
          />
          <PopupVideo />
        </div>
      </div>



    </>
  );
};

export default OurMission;
