"use client";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import authServices from "../../services/auth.service";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { setCurrentUser } from "../../utils/auth";
import { useState } from "react";
/*
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
*/

const LoginForm = ({ isPopup }) => {
  const router = useRouter();
  const [loadingStatus, setLoadingStatus] = useState(false);
  const currentPath = router.asPath;

  const initialValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Geçerli bir e-posta adresi giriniz.")
      .required("E-posta adresi zorunludur."),
    password: Yup.string()
      .min(5, "Şifre en az 5 karakter olmalıdır.")
      .required("Şifre zorunludur."),
  });

  const onSubmit = async (values) => {
    toast.loading("Giriş Yapılıyor...");
    setLoadingStatus(true);

    try {
      const res = await authServices.login(values);
      await toast.dismiss(); // Dismiss the loading toast

      if (res?.data && res?.data?.token) {
        localStorage.setItem("userToken", res?.data?.token);
        console.log('giriş yapan kullancıı', res?.data?.user);
        setCurrentUser(res?.data?.user);
        toast.success("Giriş Başarılı");
        await router.push("/dashboard");
      } else {
        
          toast.error(res?.data?.message);
        } 
      
    } catch (err) {
      console.log(err);
      toast.error("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setLoadingStatus(false);
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        containerClassName=""
        containerStyle={{
          opacity: "100%",
        }}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
            opacity: "100%",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
            style: {
              opacity: "100%",
            },
          },
          error: {
            duration: 3000,
            style: {
              opacity: "100%!important",
            },
          },
        }}
      />

      <Formik
        initialValues={initialValues}
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
            {!isPopup && currentPath.includes("login") && (
              <div className="heading text-center">
                <h3 className="login-header"></h3>
                <p className="text-center login-header--text">
                  Hesabınız yok mu?{" "}
                  <Link href="/kayit-ol" className="text-thm">
                    Kayıt Ol!
                  </Link>
                </p>
              </div>
            )}

            {/* End .heading */}
            <div className="login-input-space">
              <div className="input-group mb-2 mr-sm-2">
                <Field
                  name="email"
                  type="text"
                  className="form-control "
                  required
                  placeholder="E-posta adresiniz"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="flaticon-user"></i>
                  </div>
                </div>
              </div>

              {touched.email ? (
                errors.email ? (
                  <div className="text-danger mb-3">{errors.email}</div>
                ) : null
              ) : (
                ""
              )}
            </div>

            {/* End .input-group */}

            <div className="login-input-space">
              <div className="input-group form-group">
                <Field
                  name="password"
                  type="password"
                  className="form-control "
                  required
                  placeholder="Şifreniz"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="flaticon-password"></i>
                  </div>
                </div>
              </div>

              {touched.password ? (
                errors.password ? (
                  <div className="text-danger mb-3">{errors.password}</div>
                ) : null
              ) : (
                ""
              )}
            </div>

            {/* End .input-group */}

            <div className="form-group form-check custom-checkbox mb-3">
              {/* <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="remeberMe"
              />
              <label
                className="form-check-label form-check-label"
                htmlFor="remeberMe"
              >
                Beni Hatırla
              </label> */}

              {/* <Link className="btn-fpswd float-end" href="/forgot-password">
                Şifremi Unuttum?
              </Link> */}
            </div>
            {/* End .form-group */}
            {loadingStatus ? (
              <button class="btn btn-log w-100 btn-thm" type="button" disabled>
                <span
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Giriş Yapılıyor...
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-log w-100 btn-thm"
                disabled={isSubmitting}
              >
                Giriş Yap
              </button>
            )}
            {/* login button */}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
