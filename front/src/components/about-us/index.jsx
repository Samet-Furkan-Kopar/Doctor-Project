import CallToAction from "../common/CallToAction";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import Partners from "../common/Partners";
import PopupSignInUp from "../common/PopupSignInUp";
import WhyChoose from "../common/WhyChoose";
import BreadCrumbBanner from "./BreadCrumbBanner";
import Team from "./Team";
import OurMission from "./OurMission";

const index = ({ pageContentBanner, pageContentAbout }) => {
console.log(pageContentAbout)

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Inner Page Breadcrumb --> */}
      <BreadCrumbBanner />

      {/* <!-- About Text Content --> */}
      <section className="about-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2 className="mt0">Our Mission Is To FindHouse</h2>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row" style={{ margin: "1rem 2.7rem 1rem 2.7rem" }}>
            <OurMission pageContentBanner={pageContentBanner} />
          </div>
          {/* End .row */}

          <div className="bgc-f7" >
            <div className="row mt80" >
              <div className="col-lg-6 offset-lg-3">
                <div className="main-title text-center" style={{ marginTop: "2rem" }}>
                  <h2>{pageContentAbout?.title}</h2>
                  <p>{pageContentAbout?.short_description}</p>
                </div>
              </div>
            </div>
            {/* End .row */}

            <div className="row justify-content-center " style={{ margin: "2px 5rem 2rem 5rem" }}>
              <WhyChoose pageContentAbout={pageContentAbout} />
            </div>
            {/* End .row */}
          </div>
        </div>
      </section>


      <section className="start-partners bgc-thm pt50 pb50">
        <div className="container">
          <CallToAction />
        </div>
      </section>
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt10 pb10">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default index;
