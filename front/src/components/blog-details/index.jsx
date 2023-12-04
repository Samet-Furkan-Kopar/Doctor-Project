import Image from "next/image";
import BlogSidebar from "../../components/common/blog/BlogSidebar";
import CopyrightFooter from "../../components/common/footer/CopyrightFooter";
import Footer from "../../components/common/footer/Footer";
import Header from "../../components/common/header/DefaultHeader";
import MobileMenu from "../../components/common/header/MobileMenu";
import PopupSignInUp from "../../components/common/PopupSignInUp";
import Social from "../common/footer/Social";
import BreadCrumb2 from "./BreadCrumb2";
import Comments from "./Comments";
import Pagination from "./Pagination";
import Ratings from "./Ratings";
import RelatedPost from "./RelatedPost";
import ReviewBox from "./ReviewBox";
import imageLoader from "../../utils/imageLoader";

const index = () => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Main Blog Post Content --> */}
      <section className="blog_post_container bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <BreadCrumb2 />
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-8">
              <div className="main_blog_post_content">
                <div className="mbp_thumb_post">
                  <div className="blog_sp_tag">
                    <a href="#">Construction</a>
                  </div>
                  <h3 className="blog_sp_title">
                    Redfin Ranks the Most Competitive Neighborhoods of 2020
                  </h3>
                  <ul className="blog_sp_post_meta">
                    <li className="list-inline-item">
                      <a href="#">
                        <Image
                          loader={imageLoader}
                          width={40}
                          height={40}
                          src="/assets/images/property/pposter1.png"
                          alt="pposter1.png"
                        />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">Ali Tufan</a>
                    </li>
                    <li className="list-inline-item">
                      <span className="flaticon-calendar"></span>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">January 16, 2020</a>
                    </li>
                    <li className="list-inline-item">
                      <span className="flaticon-view"></span>
                    </li>
                    <li className="list-inline-item">
                      <a href="#"> 341 views</a>
                    </li>
                    <li className="list-inline-item">
                      <span className="flaticon-chat"></span>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">15</a>
                    </li>
                  </ul>
                  <div className="thumb">
                    <Image
                      loader={imageLoader}
                      width={692}
                      height={414}
                      className="w-100 h-100 cover"
                      src="/assets/images/blog/bs1.jpg"
                      alt="bs1.jpg"
                    />
                  </div>

                  <div className="details">
                    <p className="mb30">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Duis mollis et sem sed sollicitudin. Donec non odio neque.
                      Aliquam hendrerit sollicitudin purus, quis rutrum mi
                      accumsan nec. Quisque bibendum orci ac nibh facilisis, at
                      malesuada orci congue. Nullam tempus sollicitudin cursus.
                      Ut et adipiscing erat. Curabitur this is a text link
                      libero tempus congue.
                    </p>
                    <p className="mb30">
                      Duis mattis laoreet neque, et ornare neque sollicitudin
                      at. Proin sagittis dolor sed mi elementum pretium. Donec
                      et justo ante. Vivamus egestas sodales est, eu rhoncus
                      urna semper eu. Cum sociis natoque penatibus et magnis dis
                      parturient montes, nascetur ridiculus mus. Integer
                      tristique elit lobortis purus bibendum, quis dictum metus
                      mattis. Phasellus posuere felis sed eros porttitor mattis.
                      Curabitur massa magna, tempor in blandit id, porta in
                      ligula. Aliquam laoreet nisl massa, at interdum mauris
                      sollicitudin et.
                    </p>
                    <h4 className="mb15">
                      Housing Markets That Changed the Most This Decade
                    </h4>
                    <p>
                      Nullam tempus sollicitudin cursus. Nulla elit mauris,
                      volutpat eu varius malesuada, pulvinar eu ligula. Ut et
                      adipiscing erat. Curabitur adipiscing erat vel libero
                      tempus congue. Nam pharetra interdum vestibulum. Aenean
                      gravida mi non aliquet porttitor. Praesent dapibus, nisi a
                      faucibus tincidunt, quam dolor condimentum metus, in
                      convallis libero ligula ut eros.
                    </p>
                    <div className="mbp_blockquote">
                      <div className="blockquote">
                        <span className="font-italic">
                          <i className="fa fa-quote-left"></i>
                        </span>
                        <br />
                        <em className="mb-0">
                          Duis mollis et sem sed sollicitudin. Donec non odio
                          neque. Aliquam hendrerit sollicitudin purus, quis
                          rutrum mi accumsan nec.
                        </em>
                      </div>
                    </div>
                    <p className="mb25">
                      Curabitur massa magna, tempor in blandit id, porta in
                      ligula. Aliquam laoreet nisl massa, at interdum mauris
                      sollicitudin et. Mauris risus lectus, tristique at nisl
                      at, pharetra tristique enim.
                    </p>
                    <p className="mb25">
                      Nullam this is a link nibh facilisis, at malesuada orci
                      congue. Nullam tempus sollicitudin cursus. Nulla elit
                      mauris, volutpat eu varius malesuada, pulvinar eu ligula.
                      Ut et adipiscing erat. Curabitur adipiscing erat vel
                      libero tempus congue. Nam pharetra interdum vestibulum.
                      Aenean gravida mi non aliquet porttitor. Praesent dapibus,
                      nisi a faucibus tincidunt, quam dolor condimentum metus,
                      in convallis libero ligula ut eros.
                    </p>
                  </div>
                  <ul className="blog_post_share">
                    <li>
                      <p>Share</p>
                    </li>
                    <Social />
                  </ul>
                  {/* End .blog_post_share */}
                </div>
                {/* End .mbp_thumb_post */}

                <div className="mbp_pagination_tab">
                  <Pagination />
                </div>
                {/* End mbp_pagination_tab */}

                <div className="product_single_content mb30">
                  <div className="mbp_pagination_comments">
                    <div className="total_review">
                      <h4>896 Reviews</h4>
                      <ul className="review_star_list mb0 pl10">
                        <Ratings />
                      </ul>
                      <a className="tr_outoff pl10" href="#">
                        ( 4.5 out of 5 )
                      </a>
                      <a className="write_review float-end fn-xsd" href="#">
                        Write a Review
                      </a>
                    </div>
                    {/* End .total_review */}

                    <Comments />
                    <div className="custom_hr"></div>
                  </div>
                </div>
                {/* End .product_single_content  */}

                <div className="bsp_reveiw_wrt">
                  <h4>Write a Review</h4>

                  <ul className="review_star">
                    <li className="list-inline-item">
                      <span className="sspd_review">
                        <ul>
                          <Ratings />
                        </ul>
                      </span>
                    </li>
                    <li className="list-inline-item pr15">
                      <p>Your Rating & Review</p>
                    </li>
                  </ul>
                  <ReviewBox />
                </div>
                {/* End .bsp_reveiw_wrt */}
              </div>
              {/* End .main_blog_post_content */}

              <div className="row">
                <div className="col-lg-12 mb20">
                  <h4>Related Posts</h4>
                </div>
                <RelatedPost />
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-4">
              <BlogSidebar />
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

export default index;
