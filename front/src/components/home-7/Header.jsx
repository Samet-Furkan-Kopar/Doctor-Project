import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderMenuContent from "../common/header/HeaderMenuContent";
import Image from "next/image";
import imageLoader from "../../utils/imageLoader";

const Header = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 95) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <header
      className={`header-nav menu_style_home_one home7 navbar-scrolltofixed stricky main-menu  ${navbar ? "stricky-fixed " : ""
        }`}
    >
      <div className="container p0">
        {/* <!-- Ace Responsive Menu --> */}

        <div className="d-flex align-items-center flex-wrap home6-nav">
          <Link href="/" className="navbar_brand float-start dn-smd">
            <Image
              loader={imageLoader}
              width={40}
              height={45}
              className="logo1 img-fluid"
              src="/assets/images/logo.jpeg"
              alt="logo.jpeg"
            />
            <Image
              loader={imageLoader}
              width={40}
              height={45}
              className="logo2 img-fluid"
              src="/assets/images/logo.jpeg"
              alt="logo.jpeg"
            />
            <span>FindHouse</span>
          </Link>
          {/* site logo brand */}

          <nav className="ms-auto">
            <HeaderMenuContent />
          </nav>
          {/* End .navbar */}
        </div>
      </div>
    </header>
    // {/* <!-- /.theme-main-menu --> */}
  );
};

export default Header;