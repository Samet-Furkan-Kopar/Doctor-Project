import { useEffect, useRef, useState } from "react";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import FaqContent from "./FaqContent";
import faqPageServices from "../../services/faqpage.service";
import SidebarMenu from "../common/header/dashboard/SidebarMenu";

const Index = () => {
  const [faqList, setFaqList] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  const ref = useRef(null);

  const getFaqList = () => {
    faqPageServices.getContent().then(res => {
      if (res?.succedd && res?.data?.list) {
        setFaqList(res?.data?.list)
      }
    })
  }

  useEffect(() => {
    !faqList.length && getFaqList()
  }, [])


  //choose the screen size 
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  // create an event listener
  useEffect(() => {
    if (!isMobile) {
      handleResize()
    }
    window.addEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        const targetMenu = document.getElementById('DashboardOffcanvasMenu');
        if (targetMenu && targetMenu.classList.contains("show")) {
          targetMenu.classList.toggle("show")
        }
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });


  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {isMobile &&
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
      }
      {/* End sidebar_menu */}

      {/* <!-- Our FAQ --> */}
      <section className="our-faq bgc-f7 mt100" style={{ minHeight: '48vh' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2 className="mt0">Sıkça Sorulan Sorular</h2>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            {faqList.length && faqList.map((f, k) => (
              <div className="col-lg-6" key={k}>
                <div className="faq_content">
                  <div className="main-title text-center">
                    <h2 className="mt0">{f.title}</h2>
                  </div>
                  <div className="faq_according">
                    <FaqContent questions={f.questions} order={k} />
                  </div>
                </div>
              </div>
            ))}
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
      <section className="footer_middle_area pt10 pb10">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default Index;
