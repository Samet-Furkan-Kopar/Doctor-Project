import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { getCurrentUser } from "../../../../utils/auth";
import imageLoader from "../../../../utils/imageLoader";
import MyAccount from "../../../../components/common/header/dashboard/MyAccount";
const HeaderMenuContent = ({ float = "" }) => {
  const route = useRouter();

  const currentUser = getCurrentUser();

  return (
    <ul
      id="respMenu"
      className="ace-responsive-menu text-end d-lg-block d-none"
      data-menu-style="horizontal"
    >
      <li className="last">
        <Link
          href="/"
          className={route.pathname === "/" ? "ui-active" : undefined}
        >
          Anasayfa
        </Link>
      </li>
      <li className="last">
        <Link
          href="/ofislerimiz"
          className={
            route.pathname === "/ofislerimiz" ? "ui-active" : undefined
          }
        >
          Ofislerimiz
        </Link>
      </li>
      <li className="last">
        <Link
          href="/harita"
          className={
            route.pathname === "/harita" ? "ui-active" : undefined
          }
        >
          Harita
        </Link>
      </li>
      <li className="last">
        <Link
          href="/doktorlar"
          className={
            route.pathname === "/doktorlar" ? "ui-active" : undefined
          }
        >
          Doktor/Ofi
        </Link>
      </li>
      <li className="last">
        <Link
          href="/bloglar"
          className={
            route.pathname === "/bloglar" ? "ui-active" : undefined
          }
        >
          Blog
        </Link>
      </li>
      <li className="last">
        <Link
          href="/faq"
          className={route.pathname === "/faq" ? "ui-active" : undefined}
        >
          F.A.Q
        </Link>
      </li>
      <li className="last">
        <Link
          href="/iletisim"
          className={route.pathname === "/iletisim" ? "ui-active" : undefined}
        >
          İletişim
        </Link>
      </li>

      {currentUser ? (
        <li className="user_setting">
          <div className="dropdown">
            <a
              className="btn dropdown-toggle"
              href="#"
              data-bs-toggle="dropdown"
            >
              {!currentUser?.image_url ? (
                <Image
                  loader={imageLoader}
                  width={45}
                  height={45}
                  className="rounded-circle"
                  src="/assets/images/dashboard/avatar-icon.png"
                  alt="e1.png"
                />
              ) : (
                <Image
                  loader={imageLoader}
                  width={45}
                  height={45}
                  className="rounded-circle"
                  alt="e1.png"
                  src={currentUser?.image_url}
                />
              )}
              <span className="dn-1199 ms-1">
                {currentUser?.firstName + " " + currentUser?.lastName}
              </span>
            </a>
            <div className="dropdown-menu">
              <MyAccount currentUser={currentUser} />
            </div>
          </div>
        </li>
      ) : (
        <li className={`list-inline-item list_s ${float}`}>
          <a
            href="#"
            className="btn flaticon-user"
            data-bs-toggle="modal"
            data-bs-target=".bd-example-modal-lg"
          >
            <span className="dn-lg">Giriş Yap/Kayıt Ol</span>
          </a>
        </li>
      )}
    </ul>
  );
};

export default HeaderMenuContent;
