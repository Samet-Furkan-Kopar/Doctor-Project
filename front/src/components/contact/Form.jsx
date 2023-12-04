import { Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";

import masterServices from "../../services/user.service";

const FormShchema = Yup.object().shape({
  form_name: Yup.string()
    .min(3, "Adınız çok kısa.")
    .max(20, "Adınız çok uzun.")
    .required("Bu alan gerekli."),
  form_email: Yup.string()
    .email("Geçersiz email adresi.")
    .required("Bu alan gerekli."),
  form_phone: Yup.string()
    .matches(/^05[0-9]{9,9}$/, "Geçersiz telefon numarası.")
    .required("Bu alan gerekli."),
  form_subject: Yup.string()
    .min(5, "Mesaj başlığı çok kısa.")
    .max(50, "Mesaj başlığı çok uzun.")
    .required("Bu alan gerekli."),
  form_message: Yup.string()
    .min(25, "Mesajınız çok kısa.")
    .required("Bu alan gerekli."),
});

const Form = ({ onValid }) => {
  return (
    <Formik
      initialValues={{
        form_name: "",
        form_email: "",
        form_phone: "",
        form_subject: "",
        form_message: "",
      }}
      validationSchema={FormShchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await masterServices.postContactMsg({
            name: values.form_name,
            email: values.form_email,
            phoneNumber: values.form_phone,
            subject: values.form_subject,
            message: values.form_message,
          });

          toast("Formunuz başarıyla gönderildi");
          onValid(true);
        } catch (error) {
          toast("Bir hatayla karşılaşıldı.", { style: "danger" });
        }

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
        isSubmitting,
        /* and other goodies */
      }) => (
        <>
          <form
            className="contact_form"
            action="#"
            onSubmit={(event) => {
              Object.keys(errors).forEach((key) => {
                toast(errors[key]);
              });

              handleSubmit(event);
            }}
          >
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    id="form_name"
                    name="form_name"
                    className="form-control"
                    required="required"
                    type="text"
                    placeholder="Adınız Soyadınız"
                    value={values.form_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.form_name && touched.form_name && (
                    <p className="text-danger">{errors.form_name}</p>
                  )}
                </div>
              </div>
              {/* End .col */}

              <div className="col-md-6">
                <div className="form-group">
                  <input
                    id="form_email"
                    name="form_email"
                    className="form-control required email"
                    required="required"
                    type="email"
                    placeholder="E-posta Adresiniz"
                    value={values.form_email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.form_email && touched.form_email && (
                    <p className="text-danger">{errors.form_email}</p>
                  )}
                </div>
              </div>
              {/* End .col */}

              <div className="col-md-6">
                <div className="form-group">
                  <input
                    id="form_phone"
                    name="form_phone"
                    className="form-control required phone"
                    required="required"
                    type="phone"
                    placeholder="Telefon Numaranız"
                    value={values.form_phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.form_phone && touched.form_phone && (
                    <p className="text-danger">{errors.form_phone}</p>
                  )}
                </div>
              </div>
              {/* End .col */}

              <div className="col-md-6">
                <div className="form-group">
                  <input
                    id="form_subject"
                    name="form_subject"
                    className="form-control required"
                    required="required"
                    type="text"
                    placeholder="Mesajınızın Konusu"
                    value={values.form_subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.form_subject && touched.form_subject && (
                    <p className="text-danger">{errors.form_subject}</p>
                  )}
                </div>
              </div>
              {/* End .col */}

              <div className="col-sm-12">
                <div className="form-group">
                  <textarea
                    id="form_message"
                    name="form_message"
                    className="form-control required"
                    rows="8"
                    required="required"
                    placeholder="İletmek İstediğiniz Mesajınız"
                    value={values.form_message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></textarea>
                  {errors.form_message && touched.form_message && (
                    <p className="text-danger">{errors.form_message}</p>
                  )}
                </div>
                {/* End .col */}

                <div className="form-group mb0">
                  <button
                    type="submit"
                    className="btn btn-lg btn-thm"
                    disabled={isSubmitting}
                  >
                    Gönder
                  </button>
                </div>
                {/* End button submit */}
              </div>
            </div>
          </form>
        </>
      )}
    </Formik>
  );
};

export default Form;
