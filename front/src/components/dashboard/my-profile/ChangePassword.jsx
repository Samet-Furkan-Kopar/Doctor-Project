import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import masterServices from "../../../services/user.service";
const ChangePasswordSchema = Yup.object().shape({
  currentpassword: Yup.string().required("Geçerli şifreyi yazmalısınız."),
  password: Yup.string().required("Yeni şifre'yi yazmalısınız"),
  confirm_password: Yup.string()
    .required("Yeni şifre tekrarını yazmalısınız.")
    .oneOf([Yup.ref("password")], "Yeni şifreler eşleşmiyor."),
});

const ChangePassword = ({ userData }) => {
  return (
    <Formik
      validationSchema={ChangePasswordSchema}
      initialValues={{
        currentpassword: "",
        password: "",
        confirm_password: "",
      }}
      onSubmit={(values, { setSubmitting }) => {

        masterServices.restartPassword(values).then((res) => {
          if (res?.succedd === true) {
            toast(res?.message);
          } else {
            toast(res?.response?.data?.message);
          }
        })

        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form
          onSubmit={(e) => {
            Object.keys(errors).forEach((key) => {
              toast(errors[key]);
            });

            handleSubmit(e);
          }}
        >
          <div className="row">
            <div className="col-lg-12 col-xl-12">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="currentpassword">Geçerli Şifre</label>
                <input
                  type="password"
                  className="form-control"
                  id="currentpassword"
                  name="currentpassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.currentpassword}
                />
              </div>
            </div>

            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="password">Yeni Şifre</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="confirm_password">Yeni Şifre Tekrarı</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm_password"
                  name="confirm_password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirm_password}
                />
              </div>
            </div>
            {/* End .col */}

            <div className="col-xl-12 text-right">
              <div className="my_profile_setting_input">
                <button
                  className="btn btn2"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Profili Güncelle
                </button>
              </div>
            </div>
            {/* End .col */}
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ChangePassword;
