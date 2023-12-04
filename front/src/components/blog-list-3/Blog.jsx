import Link from "next/link";
import blogContent from "../../data/blogs";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../../../public/assets/images/logo/logo.jpg";
import dateFormatter from "../../utils/dateFormatter";
import imageLoader from "../../utils/imageLoader";

const Blog = ({ blogs }) => {
  return (
    <>
      {blogs.length === 0 ? (
        <div style={{ minHeight: "800px" }}>
          <p className="fw-bold fs-5">
            Aradığınız kriterlere göre sonuç bulunamadı.
          </p>
        </div>
      ) : (
        blogs.map((item) => (
          <div className="col-lg-4 col-md-6" key={item.seoUrl}>
            <div className="for_blog feat_property">
              <div className="thumb">
                <Link href={`/blog-detay/${item.seoUrl}`}>
                  <Image
                    loader={imageLoader}
                    width={343}
                    height={220}
                    className="img-whp w-100  img-fluid"
                    src={item.coverPhoto || Logo}
                    alt={item.alt_text[0]}
                  />
                </Link>
              </div>
              {/* End .thumb */}
              <div className="details">
                <div className="tc_content">
                  <h4 className="mb15">
                    <Link href={`/blog-detay/${item.seoUrl}`}>
                      {item.seoTitle}
                    </Link>
                  </h4>
                  <ul className="bpg_meta mb10">
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="flaticon-calendar"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">{dateFormatter(item.updatedAt)}</a>
                    </li>
                  </ul>
                  <p>{item.seoDescription.slice(0, 65)}</p>
                </div>
                {/* End .tc_content */}
                <div className="fp_footer">
                  <a className="fp_pdate float-end text-thm" href="#">
                    Daha Fazla <span className="flaticon-next"></span>
                  </a>
                </div>
                {/* End fb_footer */}
              </div>
              {/* End .thumb */}
            </div>
          </div>
        )))}
    </>)
}



export default Blog;
