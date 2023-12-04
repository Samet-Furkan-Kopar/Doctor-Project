import { Form, Formik } from "formik";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import Stepper from "./Stepper";
import { useState } from "react";
import LoadingScreen from "../../loading-screen";

const Index = ({ id }) => {

  const [loadingStatus, setLoadingStatus] = useState(false)

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      {loadingStatus ? (
        <LoadingScreen close={loadingStatus} backStatus={true} />)
        : (
          <section className="our-dashbord dashbord bgc-f7 pb50">
            <div className="container-fluid ovh">
              <div className="row">
                <div className="col-lg-12 maxw100flex-992">
                  <div className="row">

                    <div className="col-lg-12 mb10">
                      <div className="breadcrumb_content style2 mb0">
                        <h2 className="breadcrumb_title">İlan Güncelle</h2>
                      </div>
                    </div>
                    {/* End .col */}

                    {/* Stepper buraya gelicek */}
                    <div className="col-lg-12">
                      <Stepper id={id} loadingStatus={loadingStatus} setLoadingStatus={setLoadingStatus} />
                    </div>
                    {/* End .col */}
                  </div>
                  {/* End .row */}

                  <div className="row mt50">
                    <div className="col-lg-12">
                      <div className="copyright-widget text-center">
                        <p>
                          &copy; {new Date().getFullYear()} Designed by{" "}
                          <a
                            href="https://www.sozlesmeliemlak.com/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Sözleşmeli Emlak
                          </a>
                          . All rights reserved.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* End .row */}
                </div>
                {/* End .col */}
              </div>
            </div>
          </section>

        )}

      {/* Stepper İle Yapımı  */}
    </>
  );
};

export default Index;
