import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import filterService from "../../services/filter.service";
import Image from "next/image";
import imageLoader from "../../utils/imageLoader";
import currencyFormatter from "currency-formatter"


const PopupAdvertPassword = ({ status = false, setStatus, id, setPageTitle, setPageDescription, setProperty, setSideBar, advertInfo }) => {
  const [loadingStatus, setLoadingStatus] = useState(false)

  const loginSchema = Yup.object().shape({
    password: Yup.string()
      .required("Şifre zorunludur."),
  });

  const onSubmit = async (values) => {
    setLoadingStatus(true)

    if (id) {
      filterService.getOneAdvertWithNo(id, values.password).then((res) => {
        if (res?.data?.succedd) {
          res?.data?.data?.advertDetail?.seoTitle?.value && setPageTitle(res?.data?.data?.advertDetail?.seoTitle?.value)
          res?.data?.data?.advertDetail?.seoDescription?.value && setPageDescription(res?.data?.data?.advertDetail?.seoDescription?.value)
          setProperty(res?.data?.data);
          setSideBar(res?.data);
          setStatus(false)
          setLoadingStatus(false)
          toast.success("Giriş Başarılı...");
        } else if (!res?.response?.data?.succedd) {
          setStatus(true)
          setLoadingStatus(false)
          toast.error("Şifre Yanlış...");
        }
      });
    }


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
        <Toaster
          position="top-center"
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              className="btn-close"
              onClick={() => {
                setStatus(false)
                location.replace('/')
              }}
            ></button>
          </div>
          {/* End .modal-header */}
          <div className="modal-body container pb20">
            <div className="row justify-content-center text-center">
              <h4>{advertInfo?.advertTitle}</h4>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-6 col-xl-6">
                <div className="login_thumb">
                  <Image
                    loader={imageLoader}
                    width={357}
                    height={494}
                    className="img-fluid w100 h-100 contain"
                    src={advertInfo?.advertCoverPhoto || "/assets/images/logo/logo.jpg"}
                    alt={advertInfo?.advertTitle || "Sözleşmeli Emlak"}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="row justify-content-left text-left">
                  <h5>İlan No: {advertInfo?.advertNo}</h5>
                </div>
                <div className="row justify-content-left text-left">
                  <h5>İlan Fiyatı: {currencyFormatter.format(advertInfo?.advertPrice, { thousand: '.', precision: 0 }) || "-"} TL</h5>
                </div>
                <div className="row justify-content-left text-left">
                  <h5>İletişim: {advertInfo?.ownerNumber}</h5>
                </div>

                <Formik
                  initialValues={
                    { password: '' }
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
                            name="password"
                            type="password"
                            className="form-control "
                            required
                            placeholder="İlan Şifresi"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>

                        {touched.password ? (
                          errors.password ? (
                            <div className="text-danger mb-3">{errors.password}</div>
                          ) : null
                        ) : (
                          ""
                        )}
                      </div>
                      {/* End .form-group */}
                      {loadingStatus ?
                        <button class="btn btn-log w-100 btn-thm" type="button" disabled>
                          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                          Giriş Yapılıyor...
                        </button>
                        :
                        <button
                          type="submit"
                          className="btn btn-log w-100 btn-thm"
                          disabled={isSubmitting}
                        >
                          İlanı Göster
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

export default PopupAdvertPassword;
