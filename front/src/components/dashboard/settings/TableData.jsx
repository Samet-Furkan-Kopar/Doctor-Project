import Image from "next/image";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useEffect, useState } from "react";
import imageLoader from "../../../utils/imageLoader";
import { getPresentationStatus, setPresentationStatus } from "../../../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../features/presentation/presentationSlice";

const TableData = () => {
  const presentationStatus = getPresentationStatus()
  const dispatch = useDispatch();

  const [status, setStatus] = useState(false)

  const presentationMode = useSelector((state) => state.presentationMode);

  useEffect(() => {
    if (presentationStatus) {
      if (presentationStatus?.status) {
        setStatus(true)
      } else {
        setStatus(false)
      }
    }
  }, [presentationStatus, presentationMode])

  return (
    <>
      <table className="table">
        <thead className="thead-light">

        </thead>
        {/* End theaad */}
        <tbody>
          <td>
            <span className="h5 d-flex justify-content-center">
              Sunum Modu
            </span>
          </td>
          <td>
            <span className="h5 d-flex justify-content-center align-items-center">
              {status ? "Aktif" : "Pasif"}
              <Image
                loader={imageLoader}
                width={20}
                height={20}
                className="float-start"
                src={status ? "/assets/images/icons8-green-circle-48.png" : "/assets/images/icons8-red-48.png"}
                alt="e1.png"
              />
            </span>
          </td>

          <td>
            <ul className="view_edit_delete_list mb0 d-flex flex-row justify-content-center">
              <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title="Sunum Modunu Değiştir"
                onClick={() => {
                  Swal.fire({
                    title: status ? "Sunum modunu kapatmak istediğinizden emin misini?" : "Sunum modunu açmak istediğinizden emin misini?",
                    text: "",
                    showCancelButton: true,
                    confirmButtonColor: status ? "#3085d6" : "green",
                    cancelButtonColor: "#d33",
                    confirmButtonText: status ? "Kapat" : "Aktif Et",
                    cancelButtonText: "İptal",
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      setPresentationStatus(!status)
                      setStatus(!status)
                      dispatch(updateField(!status))
                      Swal.fire({
                        title: "Başarılı!",
                        text: status ? "Sunum modu kapatıldı!" : "Sunum modu aktif edildi!",
                        icon: "success",
                        confirmButtonText: "Kapat",
                      });
                    }
                  });
                }}
              >
                <a href="#">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.00153 10.9997C3.51773 9.19412 3.27584 8.29135 3.48389 7.51489C3.62019 7.00622 3.88798 6.5424 4.26035 6.17003C4.82875 5.60162 5.73152 5.35973 7.53706 4.87593L14.54 2.99949C15.2133 2.8191 15.5499 2.72891 15.8447 2.70958C17.0555 2.63022 18.1949 3.28804 18.7315 4.37629C18.8622 4.64129 18.9524 4.97791 19.1328 5.65114C19.1929 5.87556 19.223 5.98776 19.2295 6.08604C19.2559 6.48964 19.0366 6.86943 18.6739 7.04832C18.5855 7.09188 18.4733 7.12195 18.2489 7.18208L4.00153 10.9997Z" stroke="#1C274C" stroke-width="1.5" />
                    <path d="M14.7004 2.94135L14.0627 8.28861" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M8.42184 4.62396L7.78409 9.97123" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M14 16.5C14 16.0778 13.6028 15.793 12.8084 15.2235C12.0031 14.6462 11.6005 14.3575 11.3002 14.5695C11 14.7814 11 15.3543 11 16.5C11 17.6457 11 18.2186 11.3002 18.4305C11.6005 18.6425 12.0031 18.3538 12.8084 17.7765C13.6028 17.207 14 16.9222 14 16.5Z" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M20 16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V11H16C17.8856 11 18.8284 11 19.4142 11.5858C19.7501 11.9217 19.8934 12.3749 19.9545 13.0559" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                  </svg>

                </a>
              </li>
            </ul>
          </td>
          {/* End td */}

        </tbody>
      </table>

    </>
  );
};

export default TableData;

