import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
// import filterService from "../../services/filter.service";
import currencyFormatter from "currency-formatter"
import advertServices from "../../../services/adver-service";


const AssignmetPopup = ({ status = false, setStatus, reloadAdvertList }) => {
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [adverID, setAdvertID] = useState('');
  const [adverTitle, setAdvertTitle] = useState('');
  const [advertNo, setAdvertNo] = useState('')
  const [advertPrice, setAdvertPrice] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [advertList, setAdvertlist] = useState([])

  useEffect(() => {
    if (status) {
      advertServices.getUserAdvertList().then(res => {
        if (res?.succedd && res?.data) {
          res?.data?.length > 0 && setAdvertlist(res?.data)
        }
      })
    }

  }, [status])


  const loginSchema = Yup.object().shape({
    duration: Yup.number().required('Lütfen Link Süresini Giriniz'),
    targetAdvert: Yup.string()
      .required("Lütfen link oluşturmak istediğiniz ilanı seçiniz."),
  });

  const onSubmit = async (values) => {
    setLoadingStatus(true)
    const fd = new FormData();
    fd.append('time', values.duration)
    fd.append('advertId', values.targetAdvert)

    advertServices.createVipLink(fd).then((res) => {
      if (res?.succedd) {
        setStatus(false)
        setLoadingStatus(false)
        reloadAdvertList()
        toast.success("Link Oluşturma Başarılı...");
      } else if (!res?.response?.data?.succedd) {
        setStatus(true)
        setLoadingStatus(false)
        toast.error("İşlem Hatası...");
      }
    });

  };

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
            <div className="row justify-content-center text-center">
              <h4>{adverTitle}</h4>
            </div>
            <div className="row justify-content-center">
              <div className="col-sm-12 col-md-6">
                <div className="row justify-content-left text-left">
                  <h5>VIP Link Oluştur</h5>
                </div>

                <Formik
                  initialValues={
                    {
                      targetAdvert: '',
                      duration: 1
                    }
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
                        <div className="input-group form-group mb-2">
                          <Field
                            component="select"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.targetAdvert}
                            name="targetAdvert"
                            className="selectpicker form-select"
                            data-live-search="true"
                            data-width="100%"
                          >
                            <option selected value="">
                              İlan seçiniz
                            </option>
                            {advertList.length > 0 &&
                              advertList?.map((item, index) => (
                                <option key={index} value={item._id}>
                                  {item.adverTitle}
                                </option>
                              ))}
                          </Field>
                          {touched.targetAdvert ? (
                            errors.targetAdvert ? (
                              <div className="text-danger mb-3">{errors.targetAdvert}</div>
                            ) : null
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="input-group form-group mb-4">
                          <Field name="duration" type="number" step="1" id="duration" min="1" autoComplete='off' placeholder="Link aktivasyon süresini giriniz" className="form-control" />

                        </div>
                        {touched.duration ? (
                          errors.duration ? (
                            <div className="text-danger mb-3">{errors.duration}</div>
                          ) : null
                        ) : (
                          ""
                        )}

                      </div>
                      {/* End .form-group */}
                      {loadingStatus ?
                        <button class="btn btn-log w-100 btn-thm" type="button" disabled>
                          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                          Link Oluşturuluyor...
                        </button>
                        :
                        <button
                          type="submit"
                          className="btn btn-log w-100 btn-thm"
                          disabled={isSubmitting}
                        >
                          Link Oluştur
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
