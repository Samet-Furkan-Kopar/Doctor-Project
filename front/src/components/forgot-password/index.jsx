import React from "react";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import Footer from "../common/footer/Footer";
import CopyrightFooter from "../common/footer/CopyrightFooter";

export default function ForgotPassword() {
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
          <div className="col-sm-12 col-lg-8 offset-lg-3">
            <form action="#" className="login_form inner_page">
              <div className="heading text-center">
                <h3 className="login-header">
                  Hesabınızı Bulmamız İçin E-posta Adresinizi Girin
                </h3>
                <p className="text-center login-header--text">
                  Öncelikle size ait hesabı bulmamız gerekiyor. Lütfen e-posta
                  adresinizi yazın ve devam edin.
                </p>
              </div>

              <div className="form-group input-group  ">
                <input
                  type="email"
                  className="form-control"
                  required
                  placeholder="E-posta Adresiniz"
                />
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="flaticon-password"></i>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-log  w-75  btn-thm my-3"
                >
                  Mail Gönder
                </button>
              </div>
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
