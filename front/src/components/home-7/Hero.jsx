import SimpleFilter from "../common/SimpleFilter";

const Hero = () => {
  return (
    <section className="home-seven">
      <div className="container">
        <div className="row posr">
          <div className="col-lg-10 offset-lg-1">
            <div className="home_content home7">
              <div className="home-text text-center">
                <h2 className="fz55">Discover your place to live</h2>
                <p className="fz18 color-white">Get started in few clicks.</p>
              </div>
              <div className="home_adv_srch_opt home7">
                <div className="home1-advnc-search home7">
                  <SimpleFilter />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;