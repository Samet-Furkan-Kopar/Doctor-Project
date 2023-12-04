import { useEffect, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { useRouter } from "next/router";
import CopyrightFooter from "../../components/common/footer/CopyrightFooter";
import Footer from "../../components/common/footer/Footer";
import Header from "../../components/common/header/DefaultHeader";
import MobileMenu from "../../components/common/header/MobileMenu";
import PopupSignInUp from "../../components/common/PopupSignInUp";
import DetailsContent from "../../components/vip-listing-details/DetailsContent";
import Sidebar from "../../components/vip-listing-details/Sidebar";
import Image from "next/image";
import filterService from "../../services/filter.service";
import imageLoader from "../../utils/imageLoader";
import _ from "lodash";
import { getCurrentUser } from "../../utils/auth";
import addAdvertTofavorite from "../../utils/addAdvertTofavorite";
import currencyFormatter from "currency-formatter"
import Seo from "../../components/common/seo";
import LoadingScreen from "../../components/loading-screen";
import advertServices from "../../services/adver-service";
import PopupAdvertPassword from "./PopupAdvertPassword";
import Swal from "sweetalert2";

const ListingDynamicDetailsV1 = () => {
  const router = useRouter();
  const [property, setProperty] = useState({});
  const [sideBar, setSideBar] = useState({});
  const [addFavoriteStatus, setAddFavoriteStatus] = useState(true)
  const [isFavoriteStatus, setIsFavoriteStatus] = useState(false)
  const [isEncryptedStatus, setIsEncryptedStatus] = useState(false)
  const [pageTitle, setPageTitle] = useState('')
  const [pageDescription, setPageDescription] = useState('')
  const [advertInfo, setAdvertInfo] = useState({})
  const [advertType, setAdvertType] = useState('standart')
  const [close, setClose] = useState(false);


  const slug = router.query.slug
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (currentUser && Object.keys(property).length > 0 && currentUser._id === property.ownerId) {
      setAddFavoriteStatus(false)
    }
  }, [currentUser, property])


  useEffect(() => {
    if (slug && slug.length) {
      filterService.getOneAdvertWithNo(slug[0], '', slug[1]).then((res) => {
        if (res?.data?.succedd) {
          res?.data?.data?.advertDetail?.seoTitle?.value && setPageTitle(res?.data?.data?.advertDetail?.seoTitle?.value)
          res?.data?.data?.advertDetail?.seoDescription?.value && setPageDescription(res?.data?.data?.advertDetail?.seoDescription?.value)
          setProperty(res?.data?.data);
          setSideBar(res?.data);
          res?.data?.type && setAdvertType(res.data.type)
          setClose(true)
        } else if (!res?.response?.data?.succedd && res?.response?.data?.isEncrypted && res?.response?.data?.info) {
          setAdvertInfo(res?.response?.data?.info)
          setIsEncryptedStatus(true)
          setClose(true)
        } else if (res?.response?.status && res?.response?.status === 404) {
          Swal.fire({ title: 'Hata!', text: 'Bu link aktif değil. Lütfen sistem yöneticinizle görüşünüz', icon: 'error', customClass: 'sweet-alerts' });
          location.replace('/')
        }
      });
      advertServices.checkAdvertClick(slug[0]).then(res => console.log('NE Geldi', res))
    }
  }, [slug]);


  if (_.isEmpty(property) || _.isEmpty(sideBar))
    return <>
      <PopupAdvertPassword
        id={slug}
        status={isEncryptedStatus}
        setStatus={setIsEncryptedStatus}
        setPageTitle={setPageTitle}
        setPageDescription={setPageDescription}
        setProperty={setProperty}
        setSideBar={setSideBar}
        advertInfo={advertInfo}
      />
      <LoadingScreen close={false} />
    </>;



  return (
    <>
      <Seo pageTitle={pageTitle} pageDescription={pageDescription} />
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      <PopupAdvertPassword status={isEncryptedStatus} />

      {/* <!-- Listing Single Property --> */}
      <section className="listing-title-area mt85 md-mt0">
        <div className="container">
          {Object.keys(property).length > 0 && (
            <Gallery >
              <div className="row mb30">
                <div className="col-lg-7 col-xl-8">
                  <div className="single_property_title mt30-767">
                    <div className="d-flex align-items-center">
                      <h2 className="mb-0">
                        {property?.advertDetail?.adverTitle?.options || "-"} -
                      </h2>
                      <span className="status_tag badge ms-2">{property?.advertDetail?.processName?.options || ""}</span>
                    </div>
                    <p>{property?.advertDetail?.address?.options || "-"}</p>
                  </div>
                </div>
                <div className="col-lg-5 col-xl-4">
                  <div className="single_property_social_share position-static transform-none">
                    <div className="price float-start fn-400 2">
                      <h2>
                        {currencyFormatter.format(property?.advertDetail?.advertPrice.options, { thousand: '.', precision: 0 }) || "-"} TL
                      </h2>
                    </div>


                    <div className="spss style2 mt20 text-end tal-400" style={{ background: isFavoriteStatus ? '#ff5a5f' : '' }}  >
                      <ul className="mb0">
                        {addFavoriteStatus &&
                          <li className="list-inline-item" onClick={async () => {
                            const addStatus = await addAdvertTofavorite(property?.advertDetail?._id.value)
                            setIsFavoriteStatus(addStatus)
                          }}>
                            <span className="flaticon-heart"></span>
                          </li>
                        }
                        <li className="list-inline-item" style={{ background: 'transparent' }} >
                          <a href={`https://web.whatsapp.com/send?l=en&text=${encodeURIComponent(window.location.href)}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30px" height="30px" clip-rule="evenodd"><path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z" /><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z" /><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z" /><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z" /><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd" /></svg>
                          </a>
                        </li>

                      </ul>
                    </div>
                    {/* End activity and social sharing */}
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-sm-7 col-lg-8">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="spls_style_two mb30-520">
                        <Item
                          original={
                            property?.advertDetail?.coverPhoto?.options || "-"
                          }
                          thumbnail={
                            property?.advertDetail?.coverPhoto?.options || "-"
                          }
                          width={752}
                          height={450}
                        >
                          {({ ref, open }) => (
                            <div role="button" ref={ref} onClick={open}>
                              <Image
                                loader={imageLoader}

                                width={752}
                                height={450}
                                className="img-fluid w100 cover lds-1"
                                src={
                                  property?.advertDetail?.coverPhoto?.options ||
                                  "-"
                                }
                                alt="1.jpg"
                              />
                            </div>
                          )}
                        </Item>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End .col-sm-7 .col-lg-8 */}

                <div className="col-sm-5 col-lg-4">
                  <div className="row advertPhotoList">
                    {property?.adPhotosUrl?.length > 0 &&
                      property?.adPhotosUrl?.map((val, i) => (
                        <div className="col-6" key={i}>
                          <div className="spls_style_two img-gallery-box mb24">
                            <Item
                              original={val.url}
                              thumbnail={val.url}
                              width={752}
                              height={450}
                            >
                              {({ ref, open }) => (
                                <div role="button" ref={ref} onClick={open}>
                                  <Image
                                    loader={imageLoader}

                                    width={170}
                                    height={133}
                                    className="img-fluid w100 cover"
                                    src={val.url}
                                    alt="2.jpg"
                                  />
                                </div>
                              )}
                            </Item>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                {/* End  col-sm-5 col-lg-4 */}
              </div>
              {/* End .row */}
            </Gallery>
          )}
        </div>
      </section>

      {/* <!-- Agent Single Grid View --> */}
      <section className="our-agent-single bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              {Object.keys(property)?.length > 0 && (
                <DetailsContent property={property} />
              )}
            </div>
            {/* End details content .col-lg-8 */}

            <div className="col-lg-4 col-xl-4">
              {Object.keys(sideBar).length > 0 && <Sidebar property={sideBar} advertType={advertType} setAdvertType={setAdvertType} />}
            </div>
            {/* End sidebar content .col-lg-4 */}
          </div>
          {/* End .row */}
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
      <section className="footer_middle_area pt10 pb10">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  )

};

export default ListingDynamicDetailsV1;
