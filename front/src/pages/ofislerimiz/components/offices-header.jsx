import Pagination from "../../../components/common/blog/Pagination";
import CopyrightFooter from "../../../components/common/footer/CopyrightFooter";
import Footer from "../../../components/common/footer/Footer";
import Header from "../../../components/common/header/DefaultHeader";
import MobileMenu from "../../../components/common/header/MobileMenu";
import PopupSignInUp from "../../../components/common/PopupSignInUp";
import OfficesFilter from "./offices-filter";
import OfficesContent from "./offices-content";



const index = () => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Map --> */}
      <section className="home-two p0 mt85 md-mt0">
        <div className="home_two_map">
          <div className="gmap_canvas pe-none">
            <iframe
              title="map"
              className="gmap_iframe"
              src="https://www.google.com/maps/d/embed?mid=1Sz8p20XJQ5nunDgkt7-_gfETpa0&hl=en&ehbc=2E312F"
            ></iframe>
          </div>
        </div>
      </section>

      {/* <!-- Listing Grid View --> */}
      <section className="our-listing bgc-f7 pb30-991  ">
        <div className="container">
          <div className="row featured_row position-relative">
            <div className="col-lg-12">
              <OfficesFilter className="mt20 " />
            </div>
          </div>
        </div>
        {/* End .container */}

        <div className="row">
                <OfficesContent />
       </div>

        <div className="container">

          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="row">
                <div className="col-lg-12 mt20">
                  <div className="mbp_pagination">
                    <Pagination />
                  </div>
                </div>
                {/* End paginaion .col */}
              </div>
              {/* End .row */}
            </div>
            {/* End  .col */}
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default index;
