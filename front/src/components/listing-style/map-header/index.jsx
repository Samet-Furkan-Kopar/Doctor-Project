import React, { useEffect, useRef, useState } from "react";
import Header from "../../common/header/DefaultHeader";
import MobileMenu from "../../common/header/MobileMenu";
import PopupSignInUp from "../../common/PopupSignInUp";
import OfficeFilter from "../../common/OfficeFilter";
import Pagination from "../../common/blog/Pagination";
import CopyrightFooter from "../../common/footer/CopyrightFooter";
import Footer from "../../common/footer/Footer";
import BreadCrumb from "./BreadCrumb2";
import FeaturedItem from "./FeaturedItem";
import officeData from "../../../services/office-service";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MyMap from "./Map";

const Index = () => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false)
  const [office, setOffice] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const paginate = 8;
  const [filterData, setFilterData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // officeResponse
        const response = await officeData.officeResponse(page, paginate);
        setOffice(response.data);

        // totalPages
        const data = await officeData.officeAllData();
        const totalBlogCount = data.data.length;
        const calculatedTotalPages = Math.ceil(totalBlogCount / paginate);
        setTotalPages(calculatedTotalPages);
      } catch (error) {
        console.error("API isteği başarısız:", error);
      }
    };

    fetchData();
  }, [page]);

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

      {/* <!-- Map --> */}
      <section className="home-two p0 mt85 md-mt0">
        <div className="home_two_map">
          <div className="gmap_canvas pe-none">
            <MyMap content={office} />
          </div>
        </div>
      </section>

      {/* <!-- Listing Grid View --> */}
      <section className="our-listing bgc-f7 pb30-991">
        <div className="container">
          <div className="row featured_row position-relative">
            <div className="col-lg-12">
              <OfficeFilter
                officeList={office}
                setFilterData={setFilterData}
                className="mt20 "
              />
            </div>
          </div>
        </div>
        {/* End .container */}

        <div className="container">
          {/* End Page Breadcrumb and Grid,List and filter Button */}

          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="row">
                {/* Conditionally render FeaturedItem based on filterData */}
                {filterData.length !== 0 ? (
                  <FeaturedItem properties={filterData.data} />
                ) : (
                  <FeaturedItem properties={office} />
                )}
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-lg-12 mt20">
                  {(filterData.data && filterData.data.length === 0) ||
                    !office ||
                    office.length === 0 ? (
                    <p className="text-center">Kayıtlı Ofis Bulunmamaktadır...</p>
                  ) : (
                    <div className="mbp_pagination">
                      <Pagination
                        setPage={setPage}
                        page={page}
                        totalPages={totalPages}
                      />
                    </div>
                  )}
                </div>
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
      <section className="footer_middle_area pt10 pb10">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default Index;
