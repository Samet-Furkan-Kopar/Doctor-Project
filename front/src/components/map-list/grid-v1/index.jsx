import Pagination from "../../common/blog/Pagination";
import CopyrightFooter from "../../common/footer/CopyrightFooter";
import Footer from "../../common/footer/Footer";
import Header from "../../common/header/DefaultHeader";
import MobileMenu from "../../common/header/MobileMenu";
import FilterTopBar from "../../common/listing/FilterTopBar";
import ShowFilter from "../../common/listing/ShowFilter";
import SidebarListing from "../../common/listing/SidebarListing";
import PopupSignInUp from "../../common/PopupSignInUp";
import FeaturedItem from "./FeaturedItem";
import GoogleMap from "../../../components/google-maps";
import { useDispatch, useSelector } from "react-redux";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import { useEffect, useRef, useState } from "react";
import imageLoader from "../../../utils/imageLoader";
import Image from "next/image";
import filterService from "../../../services/filter.service";
import { addLength } from "../../../features/properties/propertiesSlice";
import MyMap from "./Map";
import SecretAdverts from "./SecretAdverts";

const Index = () => {
  const { length } = useSelector((state) => state.properties);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const [content, setContent] = useState([]);
  const [secretAds, setSecretAds] = useState([]);

  const properties = useSelector((state) => state.properties);
  const { statusType, featured, isGridOrList } = useSelector(
    (state) => state.filter
  );

  const dispatch = useDispatch();

  // status filter
  const statusTypeHandler = (a, b) => {
    if (statusType === "recent") {
      return a.created_at + b.created_at;
    } else if (statusType === "old") {
      return a.created_at - b.created_at;
    } else if (statusType === "") {
      return a.created_at + b.created_at;
    }
  };

  useEffect(() => {
    filterService
      .getFilteredContent(properties.allFilter, properties.allLocation)
      .then((res) => {
        if (res?.data?.succedd && res?.data?.data?.length) {
          const tmpArr = [];
          res?.data?.data.map((r) => {
            if (r.isEncrypted) {
              tmpArr.push(r);
            }
          });
          setSecretAds(tmpArr);
          setContent(res?.data?.data);
        } else {
          setContent([]);
        }
      });
  }, [properties]);

  // add length of filter items
  useEffect(() => {
    dispatch(addLength(content.length));
  }, [dispatch, content]);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    if (!isMobile) {
      handleResize();
    }
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        const targetMenu = document.getElementById("DashboardOffcanvasMenu");
        if (targetMenu && targetMenu.classList.contains("show")) {
          targetMenu.classList.toggle("show");
        }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
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

      {/* <!-- Listing Grid View --> */}
      <section className="our-listing bgc-f7 pb30-991 mt85 md-mt0 ">
        <div className="container-fluid ">
          <div className="row">
            {/* End .col */}

            <div className="col-lg-6 position-relative">
              {/* End list grid */}

              <div className="dn db-991 mb0 d-block map-list-filter-btn">
                <div
                  id="main2"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#sidebarListing"
                >
                  <span
                    id="open2"
                    className="flaticon-filter-results-button filter_open_btn style2"
                  >
                    Filtreyi göster
                  </span>
                </div>
              </div>

              {/* ENd button for mobile sidebar show  */}
            </div>
            <div className="col-lg-6 position-relative">
              {/* End list grid */}

              <div
                className="dn db-991 mb0 d-block map-list-filter-btn"
                style={{ right: "10px" }}
              >
                <div
                  id="main3"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#sidebarListing2"
                >
                  <span
                    id="open2"
                    className="flaticon-filter-results-button filter_open_btn style2"
                  >
                    Gizli İlanlar
                  </span>
                </div>
              </div>
              {/* ENd button for mobile sidebar show  */}
            </div>
          </div>
          {/* End Page Breadcrumb and Grid,List and filter Button */}

          <div className="row d-flex justify-content-center mt-1">
            <div className="col-lg-3 col-xl-3">
              {/* End SidebarListing */}

              <div
                className="offcanvas offcanvas-start offcanvas-listing-sidebar"
                tabIndex="-1"
                id="sidebarListing"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title">Detaylı Arama</h5>
                  <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                {/* End .offcanvas-heade */}

                <div className="offcanvas-body">
                  <SidebarListing />
                </div>
              </div>
              {/* End mobile sidebar listing  */}
            </div>
            <div className="col-lg-3 col-xl-3">
              {/* End SidebarListing */}

              <div
                className="offcanvas offcanvas-start offcanvas-listing-sidebar"
                tabIndex="-1"
                id="sidebarListing2"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title">Şifreli İlanlar</h5>
                  <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                {/* End .offcanvas-heade */}

                <div
                  className="offcanvas-body hide-scrollbar"
                  style={{ padding: "15px" }}
                >
                  {secretAds.length > 0 ? (
                    <SecretAdverts adverts={secretAds} />
                  ) : (
                    <div className="d-flex justify-content-center">
                      <h6>Kayıtlı İlan Bulunmamaktadır</h6>
                    </div>
                  )}
                </div>
              </div>
              {/* End mobile sidebar listing  */}
            </div>
            {/* End sidebar conent */}

            <div className="col-md-12 col-lg-12">
              <div className="container-fluid p0" style={{ height: "90vh" }}>
                <div className="row" style={{ height: "100%" }}>
                  <MyMap content={content} />
                </div>
              </div>
            </div>
            {/* End  page conent */}
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
