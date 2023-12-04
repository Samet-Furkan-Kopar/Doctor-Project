import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
// import filterService from "../../services/filter.service";
import currencyFormatter from "currency-formatter"
import advertServices from "../../../services/adver-service";


const AssignmetPopup = ({ advertInfo, setAdvertInfo, status = false, setStatus, reloadAdvertList }) => {
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [adverID, setAdvertID] = useState('');
  const [adverTitle, setAdvertTitle] = useState('');
  const [advertNo, setAdvertNo] = useState('')
  const [advertPrice, setAdvertPrice] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [subUserList, setSubUserList] = useState([])

  useEffect(() => {
    if (status && advertInfo.length > 0 && advertInfo[0]?._id?.value) {
      advertServices.getSubUserList(advertInfo[0]?._id?.value).then(res => {
        if (res?.succedd && res?.data) {
          res?.data?.options?.length > 0 && setSubUserList(res?.data?.options)
        }
      })
    }

  }, [advertInfo, status])


  const loginSchema = Yup.object().shape({
    targetAdvisor: Yup.string()
      .required("Lütfen atama yapmak istediğiniz danışmanı seçiniz."),
  });

  const onSubmit = async (values) => {
    setLoadingStatus(true)
    console.log('KKSKDJKSJD', adverID)
    if (adverID) {
      const fd = new FormData()
      fd.append('advisorId', values.targetAdvisor)

      advertServices.changeAdvertOwner(adverID, fd).then((res) => {
        if (res?.succedd) {
          setAdvertInfo([])
          setStatus(false)
          setLoadingStatus(false)
          reloadAdvertList()
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
    if (advertInfo.length > 0) {
      advertInfo[0]?.adverTitle?.value && setAdvertTitle(advertInfo[0]?.adverTitle?.value)
      advertInfo[0]?.advertNo?.value && setAdvertNo(advertInfo[0]?.advertNo?.value)
      advertInfo[0]?.advertPrice?.value && setAdvertPrice(advertInfo[0]?.advertPrice?.value)
      advertInfo[0]?.ownerName?.value && setOwnerName(advertInfo[0]?.ownerName?.value)
      advertInfo[0]?._id?.value && setAdvertID(advertInfo[0]?._id?.value)
      
    }
  }, [advertInfo])




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

          <div  className="modal-body container pb20">
                <div className="row justify-content-center text-center">
                  <h4>{adverTitle}</h4>
                </div>
                <div className="row justify-content-center">
                  <div className="col-sm-12 col-md-6">
                    <div className="row justify-content-left text-left">
                      <h5>İlan No: {advertNo}</h5>
                    </div>
                    <div className="row justify-content-left text-left">
                      <h5>İlan Fiyatı: {currencyFormatter.format(advertPrice, { thousand: '.', precision: 0 }) || "-"} TL</h5>
                    </div>
                    <div className="row justify-content-left text-left">
                      <h5>İlan Sahibi: {ownerName}</h5>
                    </div>

                    <Formik
                      initialValues={
                        { targetAdvisor: '' }
                      }
                      onSubmit={onSubmit}
                      enableReinitialize
                      validationSchema={loginSchema}
                    >
                      {({
                        values,
                        errors,
                        handleChange,
                        handleBlur,
                        isSubmitting,
                        touched,
                      }) => (
                        <Form action="#">

                          {/* End .input-group */}

                          <div className="login-input-space">
                            <div className="input-group form-group">
                              <Field
                                component="select"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.targetAdvisor}
                                name="targetAdvisor"
                                className="selectpicker form-select"
                                data-live-search="true"
                                data-width="100%"
                              >
                                <option selected value="">
                                  Danışman seçiniz
                                </option>
                                {subUserList.length > 0 && 
                                subUserList?.map((item, index) => (
                                  <option key={index} value={item.value}>
                                    {item.label}
                                  </option>
                                ))}
                              </Field>
                              {touched.targetAdvisor ? (
                                errors.targetAdvisor ? (
                                  <div className="text-danger mb-3">{errors.targetAdvisor}</div>
                                ) : null
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          {/* End .form-group */}
                          {loadingStatus ?
                            <button class="btn btn-log w-100 btn-thm" type="button" disabled>
                              <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                              Atama Yapılıyor...
                            </button>
                            :
                            <button
                              type="submit"
                              className="btn btn-log w-100 btn-thm"
                              disabled={isSubmitting}
                            >
                              Atama Yap
                            </button>
                          }
                          {/* login button */}
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