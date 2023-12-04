import Image from "next/image";
import Link from "next/link";
import RegisterForm from "../../register/Form2";
import LoginForm from "../../login/LoginForm";
import imageLoader from "../../../utils/imageLoader";
import { useEffect, useState } from "react";
import generalServices from "../../../services/general.service";

const LoginSignup = () => {
  const [loginContent, setLoginContent] = useState({})
  const [registerContent, setRegisterContent] = useState({})

  useEffect(() => {
    if(Object.keys(loginContent).length <= 0){
      generalServices.getPageSeoData('login').then(res => {
        if(res?.success && res?.data?.length){
          const contentData = res.data.find(r => r.page === "login" && r.type === "popup");
          if(contentData?.content){
            setLoginContent(contentData?.content)
          }
        }
      })
    }
    if(Object.keys(registerContent).length <= 0){
      generalServices.getPageSeoData('register').then(res => {
        if(res?.success && res?.data?.length){
          const contentData = res.data.find(r => r.page === "register" && r.type === "popup");
          if(contentData?.content){
            setRegisterContent(contentData?.content)
          }
        }
      })
    }
  }, [])



  return (
    <>
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
            className="btn-close"
          ></button>
        </div>
        {/* End .modal-header */}

        <div className="modal-body container pb20">
          <div className="row">
            <div className="col-lg-12">
              <ul
                className="sign_up_tab nav nav-tabs"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Giriş Yap
                  </Link>
                </li>
                {/* End login tab */}

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Kayıt Ol
                  </Link>
                </li>
                {/* End Register tab */}
              </ul>
              {/* End .sign_up_tab */}
            </div>
          </div>
          {/* End .row */}

          <div className="tab-content container" id="myTabContent">
            <div
              className="row mt25 tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className="col-lg-6 col-xl-6">
                <div className="login_thumb">
                  <Image
                    loader={imageLoader}
                    width={357}
                    height={494}
                    className="img-fluid w100 h-100 cover"
                    src={loginContent?.image || "/assets/images/resource/login.jpg"}
                    alt={loginContent.alt_text || "Giriş Yap"}
                  />
                </div>
              </div>
              {/* End col */}

              <div className="col-lg-6 col-xl-6 login_form">
                <LoginForm isPopup={true} />
                {/* End .col .login_form */}
              </div>
            </div>
            {/* End .tab-pane */}

            <div
              className="row mt25 tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="col-lg-6 col-xl-6">
                <div className="regstr_thumb">
                  <Image
                    loader={imageLoader}
                    width={357}
                    height={659}
                    className="img-fluid w100 h-100 cover"
                    src={registerContent?.image || "/assets/images/resource/login.jpg"}
                    alt={registerContent.alt_text || "Kayıt Ol"}
                  />
                </div>
              </div>
              {/* End . left side image for register */}

              <div className="col-lg-6 col-xl-6 login_form  ">
                <RegisterForm isPopup={true} />
              </div>

              {/* End register content */}
            </div>
            {/* End .tab-pane */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
