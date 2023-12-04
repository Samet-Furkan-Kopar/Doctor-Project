import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
// import filterService from "../../services/filter.service";
import currencyFormatter from "currency-formatter"
import advertServices from "../../../services/adver-service";
import dateFormatter from "../../../utils/dateFormatter";


const MessagePopup = ({ advertInfo, setAdvertInfo, status = false, setStatus, reloadAdvertList, message }) => {
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [adverID, setAdvertID] = useState('');
    const [adverTitle, setAdvertTitle] = useState('');
    const [advertNo, setAdvertNo] = useState('')
    const [advertPrice, setAdvertPrice] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [subUserList, setSubUserList] = useState([])
    const [recordsData, setRecordsData] = useState([])


    const modalRef = useRef(null);

    useEffect(() => {
        if (status) {
            const modalElement = modalRef.current;
            if (modalElement) {
                modalElement.style.display = "block";
                const tableHeight = modalElement.querySelector(".table")?.clientHeight;
                modalElement.style.display = tableHeight ? "block" : "none";
            }
        }
    }, [status, recordsData]);

    useEffect(() => {
        if (message) {
            setRecordsData(message)
        }

    }, [message, status])

    return (
        

        <div
            className={status ? "sign_up_modal modal bd-example-modal-lg show" : "sign_up_modal modal fade bd-example-modal-lg"}
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
            ref={modalRef}
            style={{ display: "none" }}
        >
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                <div  className="modal-header">
                        <button
                        
                            type="button"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            className="btn-close"
                            onClick={() => setStatus(false)}
                        ></button>
                        </div>
                    <div className="modal-body container pb-20">
                        <div className="row justify-content-center text-center">
                            <h4>Red Mesajları</h4>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-sm-12 col-md-12">
                                <div className="datatables">
                                    <table className="table">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Mesaj İçeriği</th>
                                                    <th>Mesaj Zamanı</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {recordsData &&
                                                    recordsData.map((i) => (
                                                        <tr key={i._id}>
                                                            <td>{i.description}</td>
                                                            <td>{dateFormatter(i.createdAt)}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MessagePopup;
