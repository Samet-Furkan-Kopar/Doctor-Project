import Ratings from "../../blog-details/Ratings";

const WhatsNearby = () => {
  const nearbyContent = [
    {
      id: 1,
      styleClass: "",
      title: " Education",
      icon: "flaticon-college-graduation",
      singleItem: [
        {
          id: 1,
          name: "Eladia &apos;s Kids",
          miles: "3.13",
          totalReview: "8895",
          ratings: (
            <>
              <Ratings />
            </>
          ),
        },
        {
          id: 2,
          name: " Gear Up With ACLS",
          miles: "4.66",
          totalReview: "7475",
          ratings: (
            <>
              <Ratings />
            </>
          ),
        },
        {
          id: 3,
          name: "Brooklyn Brainery",
          miles: "3.31",
          totalReview: "3579",
          ratings: (
            <>
              <Ratings />
            </>
          ),
        },
      ],
    },
    {
      id: 2,
      styleClass: "style2",
      title: "Health & Medical",
      icon: "flaticon-heartbeat",
      singleItem: [
        {
          id: 1,
          name: "Eladia &apos;s Kids",
          miles: "3.13",
          totalReview: "8895",
          ratings: (
            <>
              <Ratings />
            </>
          ),
        },
        {
          id: 2,
          name: " Gear Up With ACLS",
          miles: "4.66",
          totalReview: "7475",
          ratings: (
            <>
              <Ratings />
            </>
          ),
        },
        {
          id: 3,
          name: "Brooklyn Brainery",
          miles: "3.31",
          totalReview: "3579",
          ratings: (
            <>
              <Ratings />
            </>
          ),
        },
      ],
    },
    {
      id: 3,
      styleClass: "style3",
      title: " Transportation",
      icon: "flaticon-front-of-bus",
      singleItem: [
        {
          id: 1,
          name: "Eladia &apos;s Kids",
          miles: "3.13",
          totalReview: "8895",
          ratings: (
            <>
              <Ratings />
            </>
          ),
        },
        {
          id: 2,
          name: " Gear Up With ACLS",
          miles: "4.66",
          totalReview: "7475",
          ratings: (
            <>
              <Ratings />
            </>
          ),
        },
        {
          id: 3,
          name: "Brooklyn Brainery",
          miles: "3.31",
          totalReview: "3579",
          ratings: (
            <>
              <Ratings />
            </>
          ),
        },
      ],
    },
  ];

  return (
    <>
      {nearbyContent.map((item) => (
        <div
          className={`education_distance mb15 ${item.styleClass}`}
          key={item.id}
        >
          <h5>
            <span className={`${item.icon}`}></span> {item.title}
          </h5>

          {item.singleItem.map((val) => (
            <div className="single_line" key={val.id}>
              <p className="para">
                {val.name} <span>({val.miles} miles)</span>
              </p>
              <ul className="review">
                <Ratings />
                <li className="list-inline-item">
                  <span className="total_rive_count">
                    {val.totalReview} reviews
                  </span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default WhatsNearby;