import Image from "next/image";
import Social from "./Social";
import Pagination from "./Pagination";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

import { advisorService } from "../../../services/advisor.service";
import { useEffect, useState } from "react";
import imageLoader from "../../../utils/imageLoader";
const TableData = ({ searchKey }) => {
  const [advisors, setAdvisors] = useState();
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [page, setPage] = useState(1);

  async function handleAdvisorList(query) {
    setLoadingStatus(true)
    advisorService
      .getAdvisorList(query)
      .then((res) => {
        setLoadingStatus(false)
        if (res?.data?.succedd && res?.data?.data) {
          setAdvisors(res?.data?.data);
        }
      })
      .catch((err) => console.log(err));
    return;
  }


  useEffect(() => {
    handleAdvisorList({ searchKey, page });
  }, [searchKey, page]);

  useEffect(() => {
    handleAdvisorList();
  }, []);

  let theadConent = [
    "Genel Bilgiler",
    "Toplam İlan",
    "Aktivasyon Durumu",
    "Oluşturma Tarihi",
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
          {advisors &&
            advisors?.advisor?.length > 0 &&
            advisors?.advisor?.map((item, i) => (
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
                          item?.advisor?.advisorProfilePhoto?.value ||
                          "/assets/images/logo/logo-short.png"
                        }
                        alt="fp1.jpg"
                      />
                      <div
                        className=""
                        style={{
                          position: "absolute",
                          bottom: -5,
                          left: 10,
                        }}
                      >
                        <span className="status_tag badge">{item?.advisor?.role?.value}</span>
                      </div>
                    </div>
                    <div className="details">
                      <div className="tc_content">
                        <p>
                          Ad Soyad : {item?.advisor?.firstAndLastName?.value}
                        </p>
                        <p>
                          Telefon Numarası : {item?.advisor?.phoneNumber?.value}
                        </p>
                        <p
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            width: "80%",
                            whiteSpace: "nowrap",
                          }}
                        >
                          E-posta : {item?.advisor?.email?.value}
                        </p>

                        <Social
                          facebookAddress={item?.advisor?.facebook?.value}
                          instagramAddress={item?.advisor?.instagram?.value}
                          twitterAddress={item?.advisor?.twitter?.value}
                          linkedinAddress={item?.advisor?.linkedln?.value}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                {/* End td */}

                <td className="">
                  <span className="d-flex justify-content-center">
                    {item?.totalNumberOfAds}
                  </span>
                </td>
                {/* End td */}

                <td>
                  <span className="d-flex justify-content-center">
                    <span className="status_tag badge">
                      {item?.advisor?.isStatus?.value ? "Aktif" : "Beklemede"}
                    </span>
                  </span>
                </td>
                {/* End td */}

                <td>
                  <span className="h5 d-flex justify-content-center">
                    {new Date(
                      item?.advisor?.createdAt?.value
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
                      title="Edit"
                    >
                      <a href={`/danisman-detay/${item?.advisor?._id?.value}`}>
                        <span className="flaticon-edit"></span>
                      </a>
                    </li>
                    {/* End li */}

                    <li
                      className="list-inline-item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                      onClick={() => {
                        Swal.fire({
                          title: "Silmek istediğinize emin misiniz?",
                          text: "Geri döndürme şansınız yok!",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Sil",
                          cancelButtonText: "İptal",
                        }).then(async (result) => {
                          if (result.isConfirmed) {
                            await advisorService.deleteAdvisor(
                              item?.advisor?._id.value
                            );
                            await handleAdvisorList();
                            Swal.fire({
                              title: "Başarılı!",
                              text: "Silme işlemi başarılı.",
                              icon: "success",
                              confirmButtonText: "Kapat",
                            });
                          }
                        });
                      }}
                    >
                      <a href="#">
                        <span className="flaticon-garbage"></span>
                      </a>
                    </li>
                  </ul>
                </td>
                {/* End td */}
              </tr>
            ))}
        </tbody>
      </table>
      {!advisors && loadingStatus && (
        <div className="d-flex justify-content-center w-100 text-dark h2">
             <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Yükleniyor...
        </div>
      )}
      {advisors?.advisor?.length === 0 && !loadingStatus && (
        <div className="d-flex justify-content-center w-100 text-dark h2">
          Kayıtlı Danışman Bulunamamaktadır...
        </div>
      )}

      {advisors && advisors?.advisor?.length > 0 && (
        <div className="mbp_pagination">
          <Pagination
            pageSize={Math.ceil((advisors?.totalRecord || 0) / 10)}
            onPage={(page) => {
              setPage(page);
            }}
          />
        </div>
      )}
    </>
  );
};

export default TableData;
