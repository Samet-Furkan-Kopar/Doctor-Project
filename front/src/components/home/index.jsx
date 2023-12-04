import CallToAction from "../common/CallToAction";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import MobileMenu from "../common/header/MobileMenu";
import Blogs from "../common/Blogs";
import FeaturedProperties from "./FeaturedProperties";
import Header from "./Header";
import Hero from "./Hero";
import PopupSignInUp from "../common/PopupSignInUp";
import WhyChooseHome from "../common/WhyChooseHome";
import { useEffect, useRef, useState } from "react";
import Offices from "../common/Offices";
import SidebarMenu from "../common/header/dashboard/SidebarMenu";

const Index = ({ content, blog, officeList, processTypes, newsList, advertTypes, cityList, advertList }) => {
  const [aboutPartVisibility, setAboutPartVisibility] = useState(false)
  const [aboutPartTitle, setAboutPartTitle] = useState('');
  const [aboutShortDescription, setAboutShortDescription] = useState('');
  const [blogpartContent, setBlogpartContent] = useState({})
  const [officepartContent, setOfficepartContent] = useState({})

  useEffect(() => {
    if (content?.length) {
      content[0]?.content?.isVisible && setAboutPartVisibility(content[0]?.content?.isVisible)
      console.log(content[0]?.content?.isVisible)
      content[0]?.content?.title && setAboutPartTitle(content[0]?.content?.title)
      content[0]?.content?.title && setAboutShortDescription(content[0]?.content?.short_description)

      const targetBlogContent = content.find(c => c.page === 'homepage' && c.type === 'blogpart')
      if (targetBlogContent) {
        setBlogpartContent(targetBlogContent.content)
      }
      const targetOfficeContent = content.find(c => c.page === 'homepage' && c.type === 'officepart')
      if (targetOfficeContent) {
        setOfficepartContent(targetOfficeContent.content)
      }
    }

  }, [content])

  const [isMobile, setIsMobile] = useState(false)
  const ref = useRef(null);
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

      {/* <!-- Home Design --> */}
      <Hero processTypes={processTypes} content={content} cityList={cityList} advertTypes={advertTypes} officeList={officeList} />


      {/* <!-- Feature Properties --> */}
      {advertList?.length &&
        <section id="feature-property" className="feature-property bgc-f7">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="main-title text-center mb40">
                  <h2>İlanlarımız</h2>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="feature_property_slider gutter-x15">
                  <FeaturedProperties advertList={advertList} />
                </div>
              </div>
            </div>
          </div>
        </section>
      }


      {/* <!-- Why Chose Us --> */}

      <section id="why-chose" className="whychose_us bgc-f7 pb30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>{aboutPartTitle}</h2>
                <p>{aboutShortDescription}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <WhyChooseHome content={content[0]?.content} />
          </div>
        </div>
      </section>


      {Object.keys(officepartContent).length && officepartContent?.isVisible && officeList?.length &&
        < section className="our-blog bgc-f7 pb30">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="main-title text-center">
                  <h2>{officepartContent.title}</h2>
                  <p>{officepartContent.short_description}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <Offices ofis={officeList} />
            </div>
          </div>
        </section>
      }

      {Object.keys(blogpartContent).length && blogpartContent?.isVisible && blog?.length &&
        < section className="our-blog bgc-f7 pb30">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="main-title text-center">
                  <h2>{blogpartContent.title}</h2>
                  <p>{blogpartContent.short_description}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <Blogs blog={blog} />
            </div>
          </div>
        </section >
      }



      {/* <!-- Start Call to Action --> */}
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
