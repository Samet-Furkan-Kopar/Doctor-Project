import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderMenuContent from "../common/header/HeaderMenuContent";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import generalServices from "../../services/general.service";
import { setSettings } from "../../features/settings/generalsetting";
// import logo from "../../../public/assets/images/logo/logo.jpg"
import logo from "../../../public/assets/images/logo/doktorlogo-cutout.png"
import imageLoader from "../../utils/imageLoader";
import { io } from 'socket.io-client';
import toast, { Toaster } from "react-hot-toast";
import { getCurrentUser } from "../../utils/auth";


const Header = () => {
  const dispatch = useDispatch();
  const currentUser = getCurrentUser();
  const state = useSelector((state) => state);
  const [navbar, setNavbar] = useState(false);
  const [logoUrl, setLogoUrl] = useState("/assets/images/logo/logo.jpg");

  useEffect(() => {
    if (!state?.generalSettings?.data || !Object.keys(state.generalSettings?.data).length) {
      generalServices.getGeneralSettings().then(res => {
        if (res?.succedd && res.data) {
          dispatch(setSettings(res.data))
        }
      })
    }
    if (Object.keys(state.generalSettings?.data).length) {
      state?.generalSettings?.data?.logo_url && setLogoUrl(state?.generalSettings?.data?.logo_url)
    }
  }, [state])




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

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("https://api.sozlesmeliemlak.com"))
    // setSocket(io("http://localhost:8800"))
  }, [])
  useEffect(() => {

    socket?.on('connect', () => {

      console.log('socket connected');
    });

    socket?.on("chat", (data) => {

      if (data && data.message && currentUser?._id && currentUser._id != data.message.senderId) {
        toast.success("Yeni bir mesaj aldınız!");
      }
    })

  }, [socket])


  return (
    <>
      <Toaster
        position="top-right"
        containerClassName=""
        containerStyle={{
          opacity: "100%",
        }}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
            opacity: "100%",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
            style: {
              opacity: "100%",
            },
          },
          error: {
            duration: 3000,
            style: {
              opacity: "100%!important",
            },
          },
        }}
      />

      <header
        className={`header-nav menu_style_home_one navbar-scrolltofixed stricky main-menu  ${navbar ? "stricky-fixed " : ""
          }`}
      >
        <div className="container-fluid p0">
          {/* <!-- Ace Responsive Menu --> */}

          <Link href="/" className="navbar_brand float-start dn-smd">
            <Image
              loader={imageLoader}
              width={220}
              height={45}
              className="logo1 contain"
              src={logo}
              alt="Sözleşmeli Emlak"
            />
            <Image
              loader={imageLoader}
              width={220}
              height={45}
              className="logo2 contain"
              src={logo}
              alt="Sözleşmeli Emlak"
            />
          </Link>
          {/* site logo brand */}

          <nav>
            <HeaderMenuContent />
          </nav>
          {/* End .navbar */}
        </div>
      </header>
    </>
    // {/* <!-- /.theme-main-menu --> */}
  );
};

export default Header;
