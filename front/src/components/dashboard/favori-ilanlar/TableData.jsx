import Image from "next/image";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

import advertServices from "../../../services/adver-service";
import { useEffect, useState } from "react";
import imageLoader from "../../../utils/imageLoader";
import createAddresStr from "../../../utils/createAddresStr";
import currencyFormatter from "currency-formatter"

const TableData = ({ sorting, searchKey, page, setPage, totalPages, setTotalPages }) => {

  const [myProperties, setMyProperties] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true)

  const getAllAdverts = async () => {
    setLoadingStatus(true)
    const res = advertServices
      .getFavoriteAdverts(sorting, page, searchKey)
      .then((res) => {
        setLoadingStatus(false)
        if (res.succedd && res.totalRecord) {
          setTotalPages(Math.ceil(res.totalRecord / 10))
        }

        if (res?.succedd && res?.data?.length) {
          setMyProperties(res.data)
        }
      })
      .catch((err) => console.log(err));
  };



  useEffect(() => {
    getAllAdverts()
  }, [sorting, searchKey, page])

  let theadConent = [
    "Genel Bilgiler",
    "Eklenme Tarihi",
    "İşlemler",
  ];

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadConent.map((value, i) => (
              <th scope="col" key={i}>
                <span className={i > 0 ? "d-flex justify-content-center" : ""} style={{ fontSize: 15 }}>{value}</span>
              </th>
            ))}
          </tr>
        </thead>
        {/* End theaad */}
        <tbody>
          {myProperties &&
            myProperties?.length > 0 &&
            myProperties?.map((item, i) => (
              <tr key={i}>
                <td scope="row">
                  <div className="feat_property list favorite_page style2">
                    <div className="thumb">
                      <Image
                        loader={imageLoader}
                        width={150}
                        height={220}
                        className="img-whp cover"
                        src={
                          item?.coverPhoto ||
                          "/assets/images/logo/logo-short.png"
                        }
                        alt={item?.adverTitle || 'İlanımız'}
                      />
                      <div
                        className=""
                        style={{
                          position: "absolute",
                          bottom: -5,
                          left: 10,
                        }}
                      >
                        <span className="status_tag badge">{item?.processName}</span>
                      </div>
                    </div>
                    <div className="details">
                      <div className="tc_content">
                        <p>
                          İlan No : {item?.advertNo}
                        </p>
                        <p>
                          İlan Fiyatı :{ currencyFormatter.format(item?.advertPrice, {thousand: '.', precision: 0}) || "-" } TL 
                        </p>
                        <p>
                          İlan Tipi : {item?.advertTypeName}
                        </p>
                        <p>
                          İlan Ekleyen : {item?.ownerName}
                        </p>
                        <p>
                          İlan Adresi : {createAddresStr("", item?.city, item?.district, item?.neighbourhood)}
                        </p>

                      </div>
                    </div>
                  </div>
                </td>

                {/* End td */}


                <td>
                  <span className="h5 d-flex justify-content-center">
                    {new Date(
                      item?.createdAt
                    ).toLocaleDateString("tr-TR")}
                  </span>
                </td>
                {/* End td */}

                <td>
                  <ul className="view_edit_delete_list mb0 d-flex flex-row justify-content-center">
                    <li
                      className="list-inline-item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Favorilerimden Çıkar"
                      onClick={() => {
                        Swal.fire({
                          title: "Favorilerinizden çıkarmak istediğinizden emin misiniz?",
                          text: "Onaylıyor Musunuz!",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Favorilerimden Çıkar",
                          cancelButtonText: "İptal",
                        }).then(async (result) => {
                          if (result.isConfirmed) {
                            await advertServices.setFavoriteAdvert(item?._id).then(res => {
                              if (res && res.succedd) {
                               
                                Swal.fire({
                                  title: "Başarılı!",
                                  text: "İşlem başarılı bir şekilde gerçekleştirildi.",
                                  icon: "success",
                                  confirmButtonText: "Kapat",
                                });
                              } else {
                                Swal.fire({
                                  title: "Hata!",
                                  text: "İşlem sırasında hata ile karşılaşıldı",
                                  icon: "error",
                                  confirmButtonText: "Kapat",
                                });
                              }
                              getAllAdverts();
                            }).catch(e => {
                              Swal.fire({
                                title: "Hata!",
                                text: "İşlem sırasında hata ile karşılaşıldı",
                                icon: "error",
                                confirmButtonText: "Kapat",
                              });
                            });
                          }
                        });
                      }}
                    >
                      <a href="#">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.26279 3.25871C7.38317 2.12953 8.33887 1.25 9.5 1.25H14.5C15.6611 1.25 16.6168 2.12953 16.7372 3.25871C17.5004 3.27425 18.1602 3.31372 18.7236 3.41721C19.4816 3.55644 20.1267 3.82168 20.6517 4.34661C21.2536 4.94853 21.5125 5.7064 21.6335 6.60651C21.75 7.47348 21.75 8.5758 21.75 9.94339V16.0531C21.75 17.4207 21.75 18.523 21.6335 19.39C21.5125 20.2901 21.2536 21.048 20.6517 21.6499C20.0497 22.2518 19.2919 22.5107 18.3918 22.6317C17.5248 22.7483 16.4225 22.7483 15.0549 22.7483H8.94513C7.57754 22.7483 6.47522 22.7483 5.60825 22.6317C4.70814 22.5107 3.95027 22.2518 3.34835 21.6499C2.74643 21.048 2.48754 20.2901 2.36652 19.39C2.24996 18.523 2.24998 17.4207 2.25 16.0531V9.94339C2.24998 8.5758 2.24996 7.47348 2.36652 6.60651C2.48754 5.7064 2.74643 4.94853 3.34835 4.34661C3.87328 3.82168 4.51835 3.55644 5.27635 3.41721C5.83977 3.31372 6.49963 3.27425 7.26279 3.25871ZM7.26476 4.75913C6.54668 4.77447 5.99332 4.81061 5.54735 4.89253C4.98054 4.99664 4.65246 5.16382 4.40901 5.40727C4.13225 5.68403 3.9518 6.07261 3.85315 6.80638C3.75159 7.56173 3.75 8.56285 3.75 9.99826V15.9983C3.75 17.4337 3.75159 18.4348 3.85315 19.1901C3.9518 19.9239 4.13225 20.3125 4.40901 20.5893C4.68577 20.866 5.07435 21.0465 5.80812 21.1451C6.56347 21.2467 7.56458 21.2483 9 21.2483H15C16.4354 21.2483 17.4365 21.2467 18.1919 21.1451C18.9257 21.0465 19.3142 20.866 19.591 20.5893C19.8678 20.3125 20.0482 19.9239 20.1469 19.1901C20.2484 18.4348 20.25 17.4337 20.25 15.9983V9.99826C20.25 8.56285 20.2484 7.56173 20.1469 6.80638C20.0482 6.07261 19.8678 5.68403 19.591 5.40727C19.3475 5.16382 19.0195 4.99664 18.4527 4.89253C18.0067 4.81061 17.4533 4.77447 16.7352 4.75913C16.6067 5.87972 15.655 6.75 14.5 6.75H9.5C8.345 6.75 7.39326 5.87972 7.26476 4.75913ZM9.5 2.75C9.08579 2.75 8.75 3.08579 8.75 3.5V4.5C8.75 4.91421 9.08579 5.25 9.5 5.25H14.5C14.9142 5.25 15.25 4.91421 15.25 4.5V3.5C15.25 3.08579 14.9142 2.75 14.5 2.75H9.5ZM8.96967 11.5303C8.67678 11.2375 8.67678 10.7626 8.96967 10.4697C9.26256 10.1768 9.73744 10.1768 10.0303 10.4697L12 12.4394L13.9697 10.4697C14.2626 10.1768 14.7374 10.1768 15.0303 10.4697C15.3232 10.7626 15.3232 11.2375 15.0303 11.5304L13.0607 13.5L15.0303 15.4697C15.3232 15.7626 15.3232 16.2374 15.0303 16.5303C14.7374 16.8232 14.2625 16.8232 13.9697 16.5303L12 14.5607L10.0304 16.5303C9.73746 16.8232 9.26259 16.8232 8.96969 16.5304C8.6768 16.2375 8.6768 15.7626 8.96969 15.4697L10.9394 13.5L8.96967 11.5303Z" fill="#1C274C" />
                        </svg>


                      </a>
                    </li>
                    {/* End li */}
                    <li
                      className="list-inline-item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="İlana Git"
                    >
                      <a href={`/ilan-detay/${item?.advertNo}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.9425 1.25C9.63414 1.24999 7.8251 1.24998 6.41362 1.43975C4.96888 1.63399 3.82886 2.03933 2.93405 2.93414C2.10563 3.76255 1.69614 4.80193 1.48592 6.10063C1.27926 7.37741 1.25412 8.9835 1.25049 10.9986C1.24975 11.4129 1.58493 11.7493 1.99914 11.75C2.41335 11.7507 2.74974 11.4156 2.75049 11.0014C2.75416 8.96143 2.78245 7.47827 2.96665 6.34031C3.1473 5.22427 3.46609 4.52341 3.99471 3.9948C4.56436 3.42514 5.33509 3.09825 6.61349 2.92637C7.91347 2.75159 9.62169 2.75 11.9999 2.75C14.3781 2.75 16.0864 2.75159 17.3863 2.92637C18.6647 3.09825 19.4355 3.42514 20.0051 3.9948C20.5748 4.56445 20.9017 5.33517 21.0735 6.61358C21.2483 7.91356 21.2499 9.62178 21.2499 12C21.2499 14.3782 21.2483 16.0864 21.0735 17.3864C20.9017 18.6648 20.5748 19.4355 20.0051 20.0052C19.4765 20.5338 18.7756 20.8526 17.6596 21.0333C16.5216 21.2175 15.0385 21.2457 12.9986 21.2494C12.5843 21.2502 12.2492 21.5866 12.2499 22.0008C12.2507 22.415 12.587 22.7502 13.0013 22.7494C15.0164 22.7458 16.6225 22.7207 17.8993 22.514C19.198 22.3038 20.2374 21.8943 21.0658 21.0659C21.9606 20.1711 22.3659 19.031 22.5602 17.5863C22.7499 16.1748 22.7499 14.3658 22.7499 12.0574V11.9426C22.7499 9.63423 22.7499 7.82519 22.5602 6.41371C22.3659 4.96897 21.9606 3.82895 21.0658 2.93414C20.171 2.03933 19.0309 1.63399 17.5862 1.43975C16.1747 1.24998 14.3657 1.24999 12.0573 1.25H11.9425Z" fill="#1C274C" />
                          <path d="M5 12.25C4.58579 12.25 4.25 12.5858 4.25 13C4.25 13.4142 4.58579 13.75 5 13.75H9.18934L2.46967 20.4697C2.17678 20.7626 2.17678 21.2374 2.46967 21.5303C2.76256 21.8232 3.23744 21.8232 3.53033 21.5303L10.25 14.8107V19C10.25 19.4142 10.5858 19.75 11 19.75C11.4142 19.75 11.75 19.4142 11.75 19V13C11.75 12.5858 11.4142 12.25 11 12.25H5Z" fill="#1C274C" />
                        </svg>

                      </a>
                    </li>
                  </ul>
                </td>
                {/* End td */}
              </tr>
            ))}
        </tbody>
      </table>
      {loadingStatus && (


        <div className="d-flex justify-content-center w-100 text-dark h2">
          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Yükleniyor...
        </div>
      )}
      {myProperties?.length === 0 && !loadingStatus && (
        <div className="d-flex justify-content-center w-100 text-dark h2">
          Kayıtlı İlan Bulunmamaktadır
        </div>
      )}


    </>
  );
};

export default TableData;

