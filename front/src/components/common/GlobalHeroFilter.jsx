import GlobalFilter from "./GlobalFilter";

const GlobalHeroFilter = ({ className = "", officeList, processTypes, advertTypes, cityList }) => {
  return (
    <div className={`home_adv_srch_opt ${className}`}>
      <div  className="tab-content home1_adsrchfrm w-100" id="pills-tabContent">
        <div
          className="tab-pane fade show active w-100"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          {/* <GlobalFilter processTypes={processTypes} officeList={officeList} advertTypes={advertTypes} cityList={cityList}/> */}
        </div>
      </div>
    </div>
  );
};

export default GlobalHeroFilter;
