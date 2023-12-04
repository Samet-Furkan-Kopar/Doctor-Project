const AllStatistics = ({ dashboardData }) => {
  const allStatistics = [
    {
      id: 1,
      blockStyle: "",
      icon: "flaticon-home",
      timer: dashboardData?.totalNumberOfAdverts || "0",
      name: "İlanlarım",
    },
    {
      id: 2,
      blockStyle: "style2",
      icon: "flaticon-view",
      timer: dashboardData?.totalNumberOfAdvertsClicks || "0",
      name: "Görüntülenme",
    },
    {
      id: 3,
      blockStyle: "style3",
      icon: "flaticon-chat",
      timer: dashboardData?.totalAdvertMessage || "0",
      name: "İlan Mesajları",
    },
    {
      id: 4,
      blockStyle: "style4",
      icon: "flaticon-heart",
      timer: dashboardData?.numberOfFavoriteAdverts || "0",
      name: "Favori İlanlarım",
    },
  ];

  return (
    <>
      {allStatistics.map((item) => (
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3" key={item.id}>
          <div className={`ff_one ${item.blockStyle}`}>
            <div className="detais">
              <div className="timer">{item.timer}</div>
              <p>{item.name}</p>
            </div>
            <div className="icon">
              <span className={item.icon}></span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllStatistics;