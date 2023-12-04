import BreadCrumb from "../common/BreadCrumb";

const BreadCrumbBanner = ({bgimage = "", bgimagealttext = ""}) => {
  return (
    <section  className="inner_page_breadcrumb" style={{backgroundImage:`url(${bgimage})`, height:"90%"}}>
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="breadcrumb_content">
              <BreadCrumb title="Giriş Yap" bgimage={bgimage} bgimagealttext={bgimagealttext} />
              {/* <h4 className="breadcrumb_title">Giriş Yap</h4> */}
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbBanner;
