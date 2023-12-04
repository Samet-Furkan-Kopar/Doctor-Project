"use client";
import React, { useState } from "react";
import Header from "../../common/header/DefaultHeader";
import MobileMenu from "../../common/header/MobileMenu";
import PopupSignInUp from "../../common/PopupSignInUp";
import BreadCrumbBanner from "../../register/BreadCrumbBanner";
import CopyrightFooter from "../../common/footer/CopyrightFooter";
import Footer from "../../common/footer/Footer";
import Link from "next/link";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Inner Page Breadcrumb --> */}

      <section className=" bgc-fa forgot-password">
        <div className="container">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <form action="#" className="login_form inner_page">
              <div className="heading text-center">
                <h3 className="login-header">Şifrenizi Yenileyin</h3>
                <p className="text-center login-header--text">
                  Lütfen kullanmak istediğiniz parolanızı giriniz
                </p>
              </div>

              <div className="form-group input-group  ">
                <input
                  type="password"
                  className="form-control"
                  required
                  placeholder="Şifre"
                />
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="flaticon-password"></i>
                  </div>
                </div>
              </div>
              {/* End .form-group */}
              <div className="form-group input-group  ">
                <input
                  type="password"
                  className="form-control"
                  required
                  placeholder="Şifre Tekrarı"
                />
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="flaticon-password"></i>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-log w-100 btn-thm my-3">
                Şifremi sıfırla
              </button>
            </form>
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
}
