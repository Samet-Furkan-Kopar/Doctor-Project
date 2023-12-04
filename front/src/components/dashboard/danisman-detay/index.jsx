import { useEffect, useState } from "react";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import ChangePassword from "./ChangePassword";
import ProfileInfo from "./ProfileInfo";
import SocialMedia from "./SocialMedia";
import Navigation from "./Navigation";
import Institutional from "./Institutional";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import masterServices from "../../../services/user.service";
import { getCurrentUser } from "../../../utils/auth";

const Index = ({ id }) => {
  const currentUser = getCurrentUser();
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (id) {
      masterServices
        .getOneUserWithId(id)
        .then((data) => {
          console.log('JJJ', data)
          setUserData(data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    userData && (
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
        <section className="our-dashbord dashbord bgc-f7 pb50">
          <ToastContainer />
          <div className="container-fluid ovh">
            <div className="row">
              <div className="col-lg-12 maxw100flex-992">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="my_dashboard_review">
                      <Navigation
                        screens={[
                          {
                            title: "Profil Bilgileri",
                            isOfficeAdmin: true,
                            component: (
                              <div className="d-flex justify-content-center">
                                <div className="col-xl-10">
                                  <ProfileInfo userData={userData} />
                                </div>
                              </div>
                            ),
                          },
                          {
                            title: "Kurumsal Bilgiler",
                            isOfficeAdmin:
                              userData?.role?.value == "officeAdmin",
                            component: (
                              <div className="d-flex justify-content-center">
                                <div className="col-xl-10">
                                  <Institutional userData={userData} />
                                </div>
                              </div>
                            ),
                          },
                          {
                            title: "Sosyal Medya",
                            isOfficeAdmin: true,
                            component: (
                              <div className="d-flex justify-content-center">
                                <div className="col-xl-10">
                                  <SocialMedia userData={userData} />
                                </div>
                              </div>
                            ),
                          },
                          {
                            title: "Şifre değiştir",
                            isOfficeAdmin:
                              getCurrentUser()?._id === userData?._id?.value,

                            component: (
                              <div className="d-flex justify-content-center">
                                <div className="col-xl-10">
                                  <ChangePassword userData={userData} />
                                </div>
                              </div>
                            ),
                          },
                        ]}
                      />
                    </div>
                  </div>
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
      </>
    )
  );
};

export default Index;
