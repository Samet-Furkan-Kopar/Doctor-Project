import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import BreadCrumb2 from "../../components/blog-details/BreadCrumb2";
import Comments from "../../components/blog-details/Comments";
import Pagination from "../../components/blog-details/Pagination";
import Ratings from "../../components/blog-details/Ratings";
import RelatedPost from "../../components/blog-details/RelatedPost";
import ReviewBox from "../../components/blog-details/ReviewBox";
import BlogSidebar from "../../components/common/blog/BlogSidebar";
import CopyrightFooter from "../../components/common/footer/CopyrightFooter";
import Footer from "../../components/common/footer/Footer";
import Social from "../../components/common/footer/Social";
import Header from "../../components/common/header/DefaultHeader";
import MobileMenu from "../../components/common/header/MobileMenu";
import PopupSignInUp from "../../components/common/PopupSignInUp";
import Seo from "../../components/common/seo";
import Image from "next/image";
import Logo from "../../../public/assets/images/logo/logo.jpg";
import dateFormatter from "../../utils/dateFormatter";
import blogData from "../../services/blog.service";
import imageLoader from "../../utils/imageLoader";
import SidebarMenu from "../../components/common/header/dashboard/SidebarMenu";
import LoadingScreen from "../../components/loading-screen";
const BlogDetailsDynamic = () => {
  const router = useRouter();
  const [blog, setBlogItem] = useState({});
  const [features, setFetures] = useState();
  const [randomBlog, setRandomBlog] = useState();
  const [vitrinAdvert, setVitrinAdvert] = useState();
  const id = router.query.id;

  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
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

  useEffect(() => {
    if (id !== undefined) {
      blogData.blogDetail(id).then((data) => {
        setBlogItem(data.data);
        setFetures(data.features);
        setRandomBlog(data.randomBlog);
        setVitrinAdvert(data.vitrinAdvert);
      });
    }
  }, [id]);

  if (!blog) {
    return <LoadingScreen close={false} />;
  }
  return (
    <>
      <Seo pageTitle={"Blog Details"} />
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

      {/* <!-- Main Blog Post Content --> */}
      <section className="blog_post_container bgc-f7">
        <div className="container">
          {/* End .row */}

          <div className="row">
            <div className="col-lg-8">
              <div className="main_blog_post_content">
                <div className="mbp_thumb_post">
                  <h3 className="blog_sp_title">{blog?.seoTitle}</h3>
                  <ul className="blog_sp_post_meta">
                    <li className="list-inline-item">
                      <span className="flaticon-calendar"></span>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">{dateFormatter(blog?.updatedAt)}</a>
                    </li>
                  </ul>
                  <div className="thumb">
                    <Image
                      loader={imageLoader}
                      width={692}
                      height={414}
                      className="w-100 h-100 cover"
                      src={blog?.img || Logo}
                      alt={blog?.img}
                    />
                  </div>

                  <div className="details">
                    <p className="mb30">{blog?.content}</p>
                  </div>
                  <ul className="blog_post_share">
                    <li>
                      <p>Paylaş</p>
                    </li>
                    <Social />
                  </ul>
                  {/* End .blog_post_share */}
                </div>
              </div>
              {/* End .main_blog_post_content */}

              <div className="row  mt-5">
                <div className="col-lg-12 mb20">
                  <h4>Benzer Bloglar</h4>
                </div>
                <RelatedPost randomBlog={randomBlog} />
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-4">
              <BlogSidebar features={features} vitrinAdvert={vitrinAdvert} />
            </div>
            {/* End Sidebar column */}
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
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default dynamic(() => Promise.resolve(BlogDetailsDynamic), {
  ssr: false,
});
