import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
// import filterService from "../../services/filter.service";
import currencyFormatter from "currency-formatter"
import advertServices from "../../../services/adver-service";


const AssignmetPopup = ({ msgInfo, setMsgInfo, status = false, setStatus, reloadMsgList }) => {
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [msgDetail, setMsgDetail] = useState('');
  const [msgSubject, setMsgSubject] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('')
  const [ownerPhone, setOwnerPhone] = useState('')
  const [ownerName, setOwnerName] = useState('')




  const loginSchema = Yup.object().shape({
    targetAdvisor: Yup.string()
      .required("Lütfen atama yapmak istediğiniz danışmanı seçiniz."),
  });

  const onSubmit = async (values) => {
    setLoadingStatus(true)
    if (adverID) {
      const fd = new FormData()
      fd.append('advisorId', values.targetAdvisor)

      advertServices.changeAdvertOwner(adverID, fd).then((res) => {
        if (res?.succedd) {
          setMsgInfo([])
          setStatus(false)
          setLoadingStatus(false)
          reloadMsgList()
          toast.success("Atama Başarılı...");
        } else if (!res?.response?.data?.succedd) {
          setStatus(true)
          setLoadingStatus(false)
          toast.error("Atama Hatası...");
        }
      });
    }
  };

  useEffect(() => {
    if (msgInfo.length > 0) {
      msgInfo[0]?.name && setOwnerName(msgInfo[0]?.name)
      msgInfo[0]?.email && setOwnerEmail(msgInfo[0]?.email)
      msgInfo[0]?.message && setMsgDetail(msgInfo[0]?.message)
      msgInfo[0]?.phoneNumber && setOwnerPhone(msgInfo[0]?.phoneNumber)
      msgInfo[0]?.subject && setMsgSubject(msgInfo[0]?.subject)
    }
  }, [msgInfo])

  return (
    <div
      className={status ? "sign_up_modal modal bd-example-modal-lg" : "sign_up_modal modal fade bd-example-modal-lg"}
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
      style={{ display: status ? 'block' : 'none' }}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              className="btn-close"
              onClick={() => setStatus(false)}
            ></button>
          </div>
          {/* End .modal-header */}

          <div className="modal-body container pb20">
            <div className="row justify-content-center">
              <div className="col-sm-12 col-md-6">
                <Formik
                  initialValues={
                    {
                      ownerName: ownerName,
                      ownerPhone: ownerPhone,
                      ownerEmail: ownerEmail,
                      msgSubject: msgSubject,
                      msgDetail: msgDetail
                    }
                  }
                  onSubmit={() => console.log('Detaylar')}
                  enableReinitialize
                  validationSchema={loginSchema}
                >
                  {({
                    values,
                    isSubmitting,
                  }) => (
                    <Form action="#">

                      {/* End .input-group */}

                      <div className="login-input-space">
                        <div className="my_profile_setting_input form-group">
                          <label>Mesajı Gönderen</label>
                          <Field
                            name="ownerName"
                            type="text"
                            value={values.ownerName}
                            readOnly
                            className="form-control"
                            data-live-search="true"
                            data-width="100%"
                          />
                        </div>
                        <div className="my_profile_setting_input form-group">
                          <label>Telefon Numarası</label>
                          <Field
                            name="ownerPhone"
                            type="text"
                            value={values.ownerPhone}
                            readOnly
                            className="form-control"
                            data-live-search="true"
                            data-width="100%"
                          />
                        </div>
                        <div className="my_profile_setting_input form-group">
                          <label>E-posta</label>
                          <Field
                            name="ownerEmail"
                            type="text"
                            value={values.ownerEmail}
                            readOnly
                            className="form-control"
                            data-live-search="true"
                            data-width="100%"
                          />
                        </div>
                        <div className="my_profile_setting_input form-group">
                          <label>Konu</label>
                          <Field
                            name="msgSubject"
                            type="text"
                            value={values.msgSubject}
                            readOnly
                            className="form-control"
                            data-live-search="true"
                            data-width="100%"
                          />
                        </div>
                        <div className="my_profile_setting_input form-group">
                          <label>Mesaj</label>
                          <Field
                            name="msgDetail"
                            type="text"
                            value={values.msgDetail}
                            readOnly
                            as="textarea"
                            className="form-control"
                            data-live-search="true"
                            data-width="100%"
                          />
                        </div>

                      </div>

                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AssignmetPopup;
