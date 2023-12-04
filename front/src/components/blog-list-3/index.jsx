import { useState, useEffect, useRef } from "react";
import Pagination from "../common/blog/Pagination";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import BreadCrumbBlog from "./BreadCrumbBlog";
import Blog from "./Blog";
import axios from "axios";
import SearchBox from "../common/blog/SearchBox";
import blogData from "../../services/blog.service";
import SidebarMenu from "../common/header/dashboard/SidebarMenu";

const Index = () => {
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const paginate = 9;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // blogs

        blogData.blogsResponse(page, paginate, searchKey).then((data) => {
          setBlogs(data.data);
        });
        // totalPages
        blogData.blogDataResponse(searchKey).then((data) => {
          setBlogs(data.data);
        });
        const totalBlogCount = blogDataResponse.data.data.length;
        const calculatedTotalPages = Math.ceil(totalBlogCount / paginate);
        setTotalPages(calculatedTotalPages);
      } catch (error) {
        console.error("API isteği başarısız:", error);
      }
    };

    fetchData();
  }, [page, searchKey]);

  // Arama işlevi
  const handleSearch = (searchKey) => {
    setSearchKey(searchKey);
    setPage(1);
  };

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

      <section className="blog_post_container bgc-f7">
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-xl-6">
              <div className="mb-5">
                <div className="blog_search_widget">
                  <SearchBox onSearch={handleSearch} />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <Blog blogs={blogs} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="mbp_pagination mt20">
                <Pagination
                  setPage={setPage}
                  page={page}
                  totalPages={totalPages}
                />
              </div>
            </div>
          </div>
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

export default Index;
