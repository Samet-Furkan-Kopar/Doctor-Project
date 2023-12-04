import agents from "../../data/agents";
import SidebarListings from "../../components/agent-details/SidebarListings";
import TabDetailsContent from "../../components/agent-details/TabDetailsContent";
import CopyrightFooter from "../../components/common/footer/CopyrightFooter";
import Footer from "../../components/common/footer/Footer";
import Header from "../../components/common/header/DefaultHeader";
import MobileMenu from "../../components/common/header/MobileMenu";
import PopupSignInUp from "../../components/common/PopupSignInUp";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import officeData from "../../services/office-service";
import SidebarMenu from "../../components/common/header/dashboard/SidebarMenu";
import LoadingScreen from "../../components/loading-screen";
import Seo from "../../components/common/seo";

const AgentDetailsDynamic = () => {
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const router = useRouter();
  const [officeDataDetail, setOfficeDataDetail] = useState("");
  const id = router.query.id;
  const [pageTitle, setPageTitle] = useState('')
  const [agent, setAgent] = useState([])
 
  useEffect(() => {
    if (id !== undefined) {
      officeData.officeDetail(id).then((data) => {
        console.log(data);
        if (data?.data?.officeDetail?.companyTitle?.value) setPageTitle(data?.data?.officeDetail?.companyTitle?.value)
        setOfficeDataDetail(data?.data);
        data?.data?.officeDetail?.socialList &&  setAgent(data?.data?.officeDetail?.socialList)
      });
    }
  }, [id]);

  if (!officeDataDetail) {
    return <LoadingScreen close={false} />;
  }

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // // create an event listener
  // useEffect(() => {
  //   if (!isMobile) {
  //     handleResize()
  //   }
  //   window.addEventListener("resize", handleResize)
  // }, [])

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       const targetMenu = document.getElementById('DashboardOffcanvasMenu');
  //       if (targetMenu && targetMenu.classList.contains("show")) {
  //         targetMenu.classList.toggle("show")
  //       }
  //     }
  //   }
  //   // Bind the event listener
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     // Unbind the event listener on clean up
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // });

  return (
    <>
      <Seo pageTitle={pageTitle} />
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {isMobile && (
        <div className="dashboard_sidebar_menu" ref={ref}>
          <div
            className="offcanvas offcanvas-dashboard offcanvas-start"
            tabIndex="-1"
            id="DashboardOffcanvasMenu"
            data-bs-scroll="true"
          >
            <SidebarMenu />
          </div>
        </div>
      )}
      {/* End sidebar_menu */}

      {/* <!-- Agent Single Grid View --> */}
      <section className="our-agent-single bgc-f7 pb30-991 mt85 md-mt0">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="row">
                {/* End .col-12 */}

                <div className="col-lg-12">
                  <div className="feat_property list style2 agent align-items-center">
                    <div className="thumb">
                      <Image
                        width={286}
                        height={220}
                        className="img-whp w-100 h-100 cover"
                        src={
                          officeDataDetail?.coverPhoto
                        }
                        alt={
                          officeDataDetail?.coverPhoto
                        }
                      />
                      <div className="thmb_cntnt">
                        <ul className="tag mb0">
                          <li className="list-inline-item dn"></li>
                          <li className="list-inline-item">
                            <a href="#">
                              {officeDataDetail?.adverts?.length} 
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* End .thumb */}

                    <div className="details">
                      <div className="tc_content">
                        <h4>
                          {officeDataDetail?.companyName}
                        </h4>
                        <p className="text-thm">
                          {officeDataDetail?.companyTitle}
                        </p>
                        <ul className="prop_details mb0">
                          <li>
                            <a href="#">
                              Ofis Telefonu:{" "}
                              {officeDataDetail?.phoneNumber}
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              E-Posta:{" "}
                              {officeDataDetail?.officeEmail}
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* End .tc_content */}

                      <div className="fp_footer">
                        <ul className="fp_meta float-start mb0">
                          {agent?.length > 0 && agent?.map((social, i) => (
                            <li className="list-inline-item" key={i}>
                              <a
                                href={social.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className={`fa ${social.icon}`}></i>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* End .fp_footer */}
                    </div>
                  </div>
                  {/* End .feat_property */}

                  <div className="shop_single_tab_content style2 mt30">
                    <TabDetailsContent officeDataDetail={officeDataDetail} />
                  </div>
                </div>
                {/* End .col-12 */}
              </div>
            </div>
            {/* End .col-md-12 col-lg-8 content left side */}

            <div className="col-lg-4 col-xl-4">
              <SidebarListings officeDataDetail={officeDataDetail} />
            </div>
            {/* End .col-lg-4 col-xl-4 content left side */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
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
      <section className="footer_middle_area pt10 pb10">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default AgentDetailsDynamic;
