import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  SidebarHeader,
  Menu,
  MenuItem,
  SidebarContent,
} from "react-pro-sidebar";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import imageLoader from "../../../utils/imageLoader";
import { getCurrentUser } from "../../../utils/auth";

const MobileMenuContent = () => {
  const currentUser = getCurrentUser();
  const route = useRouter();
  return (
    <ProSidebar>
      <SidebarHeader>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-header-inner">
            <Image
              loader={imageLoader}
              width={180}
              height={30}
              className="nav_logo_img img-fluid mt20"
              src="/assets/images/logo/logo.jpg"
              alt="Sozlesmeli Emlak"
            />
          </Link>
          {/* End .logo */}

          <div
            className="fix-icon"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <span className="flaticon-close"></span>
          </div>
          {/* Mobile Menu close icon */}
        </div>

        {/* End logo */}
      </SidebarHeader>

      <SidebarContent>
        <Menu>
          <MenuItem>
            <Link
              href="/"
              className={route.pathname === "/" ? "ui-active" : undefined}
            >
              Anasayfa
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              href="/ofislerimiz"
              className={
                route.pathname === "/ofislerimiz" ? "ui-active" : undefined
              }
            >
              Ofislerimiz
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              href="/harita"
              className={
                route.pathname === "/harita" ? "ui-active" : undefined
              }
            >
              Harita
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              href="/doktorlar"
              className={
                route.pathname === "/doktorlar" ? "ui-active" : undefined
              }
            >
              Doktor/Blog
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/bloglar"
              className={
                route.pathname === "/bloglar" ? "ui-active" : undefined
              }
            >
              Bloglar
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              href="/faq"
              className={route.pathname === "/faq" ? "ui-active" : undefined}
            >
              F.A.Q
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              href="/iletisim"
              className={
                route.pathname === "/iletisim" ? "ui-active" : undefined
              }
            >
              İletişim
            </Link>
          </MenuItem>

          {!currentUser &&
            <>
              <MenuItem>
                <Link
                  href="/login"
                  className={
                    route.pathname === "/login" ? "ui-active" : undefined
                  }
                >
                  <span className="flaticon-user"></span> Giriş Yap
                </Link>
              </MenuItem>

              <MenuItem>
                <Link
                  href="/kayit-ol"
                  className={
                    route.pathname === "/kayit-ol" ? "ui-active" : undefined
                  }
                >
                  <span className="flaticon-edit"></span> Kayıt Ol
                </Link>
              </MenuItem>
            </>}
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};

export default MobileMenuContent;
