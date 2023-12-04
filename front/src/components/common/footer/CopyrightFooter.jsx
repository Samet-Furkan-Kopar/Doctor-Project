import Link from "next/link";

const CopyrightFooter = () => {
  const menuItems = [
    { id: 1, name: "Home", routeLink: "/" },
    { id: 2, name: "Listing", routeLink: "/listing-grid-v3" },
    { id: 3, name: "Property", routeLink: "/listing-grid-v4" },
    { id: 4, name: "About Us", routeLink: "/about-us" },
    { id: 5, name: "Blog", routeLink: "/blog-list-3" },
    { id: 6, name: "Contact", routeLink: "/contact" },
  ];

  return (
    <div className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="footer_menu_widget">
         <></>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        {/* <div className="copyright-widget text-end">
          <p>
            &copy; {new Date().getFullYear()} Designed by{" "}
            <a
              href="https://www.sozlesmeliemlak.com/"
              target="_blank"
              rel="noreferrer"
            >
              Sözleşmeli Emlak
            </a>
            . All rights reserved.
          </p>
        </div> */}
      </div>
      {/* End .col */}
    </div>
  );
};

export default CopyrightFooter;
