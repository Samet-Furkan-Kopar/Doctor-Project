import Image from "next/image";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import advertServices from "../../../services/adver-service";
import { useEffect, useState } from "react";
import imageLoader from "../../../utils/imageLoader";
import createAddresStr from "../../../utils/createAddresStr";
import currencyFormatter from "currency-formatter"
import DetailPopup from "./DetailPopup";
import conversationServices from "../../../services/conversation.service";

const TableData = ({ sorting, searchKey, page, setPage, totalPages, setTotalPages }) => {

  const [myProperties, setMyProperties] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [targetMsg, setTargetMsg] = useState([])
  const [popupStatus, setPopupStatus] = useState(false)

  const getAllMessages = async () => {
    setLoadingStatus(true)
    const res = conversationServices
      .getSiteFormMessages(sorting, page, searchKey)
      .then((res) => {
        setLoadingStatus(false)
        console.log('NELER GELDİ NELER', res)
        if (res.succedd && res.totalRecord) {
          setTotalPages(Math.ceil(res.totalRecord / 10))
        }

        if (res?.succedd && res?.getAll?.length) {
          setMyProperties(res.getAll)
        }
      })
      .catch((err) => console.log(err));
  };



  useEffect(() => {
    getAllMessages()
  }, [sorting, searchKey, page])

  let theadConent = [
    "Gonderen Adı",
    "Telefon Numarası",
    "E-posta Adresi",
    "Konu",
    "İşlemler",
  ];

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadConent.map((value, i) => (
              <th scope="col" key={i} className="text-center">
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
                <td>
                  <span className="h5 d-flex justify-content-center">
                    {item?.name}
                  </span>
                </td>
                <td>
                  <span className="h5 d-flex justify-content-center">
                    {item?.phoneNumber}
                  </span>
                </td>
                <td>
                  <span className="h5 d-flex justify-content-center">
                    {item?.email}
                  </span>
                </td>
                <td>
                  <span className="h5 d-flex justify-content-center">
                    {item?.subject}
                  </span>
                </td>

                {/* End td */}

                <td>
                  <ul className="view_edit_delete_list mb0 d-flex flex-row justify-content-center">
                    <li
                      className="list-inline-item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Göster"
                    >
                      <a href='#' onClick={() => {
                        if (Object.keys(item).length > 0) {
                          const tmpArr = []
                          tmpArr.push(item)
                          tmpArr.length && setTargetMsg(tmpArr)
                          setPopupStatus(true)
                        }
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 4.45962C9.91153 4.16968 10.9104 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C3.75612 8.07914 4.32973 7.43025 5 6.82137" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                          <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#1C274C" stroke-width="1.5" />
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
          Kayıtlı Mesaj Bulunmamaktadır
        </div>
      )}

      {popupStatus && <DetailPopup msgInfo={targetMsg} setMsgInfo={setTargetMsg} status={popupStatus} setStatus={setPopupStatus} reloadMsgList={getAllMessages} />}
    </>
  );
};

export default TableData;

