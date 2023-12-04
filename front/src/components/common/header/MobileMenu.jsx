import Link from "next/link";
import MobileMenuContent from "./MobileMenuContent";
import Image from "next/image";
import imageLoader from "../../../utils/imageLoader";
import { getCurrentUser } from "../../../utils/auth";
import { useEffect } from "react";

const MobileMenu = () => {
  const currentUser = getCurrentUser();

  const toggleProfileMenu = () => {
    const targetMenu = document.getElementById('DashboardOffcanvasMenu');
    if(targetMenu){
      targetMenu.classList.toggle("show")
    }
  }

  

  return (
    // <!-- Main Header Nav For Mobile -->
    <div className="stylehome1 h0 mega-menu-wrapper">
      <div className="mobile-menu">
        <div className="header stylehome1">
          <div className="main_logo_home2 text-center">
            <Image
              loader={imageLoader}
              width={200}
              height={45}
              className="nav_logo_img contain mt20"
              src="/assets/images/logo/logo.jpg"
              alt="header-logo2.png"
            />
          </div>
          {/* main_logo_home2 */}

          <ul className="menu_bar_home2">
            <li className="list-inline-item list_s">
              {currentUser ? (

                <span onClick={() => toggleProfileMenu()} className="flaticon-user"></span>

              ) : (
                ""
              )}
            </li>
            <li
              className="list-inline-item"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
              aria-controls="offcanvasMenu"
            >
              <a>
                <span></span>
              </a>
            </li>
          </ul>
          {/* menu_bar_home2 */}
        </div>
      </div>
      {/* <!-- /.mobile-menu --> */}

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
        data-bs-scroll="true"
      >
        <MobileMenuContent />
      </div>
    </div>
  );
};

export default MobileMenu;
