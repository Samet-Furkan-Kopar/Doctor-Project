import { Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import generalServices from "../../../services/general.service";


const SubscribeForm = () => {
  const FormShchema = Yup.object().shape({
    form_email: Yup.string()
      .email("Geçersiz email adresi.")
      .required("Bu alan gerekli.")
  });


  return (
    <Formik
      initialValues={{
        form_email: "",
      }}
      validationSchema={FormShchema}
      onSubmit={async (values, { setSubmitting }) => {
        const fd = new FormData()
        fd.append('email', values.form_email)
        try {
          await generalServices.setSubscriberData(fd);
          toast("Kaydınız başarıyla gönderildi");
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
        <form className="footer_mailchimp_form" onSubmit={(event) => {
          Object.keys(errors).forEach((key) => {
            toast(errors[key]);
          });

          handleSubmit(event);
        }}>
          <div className="d-flex align-items-center">
            <div className="col-auto">
              <input
                type="email"
                className="form-control mb-2"
                id="inlineFormInput"
                placeholder="E-posta Adresiniz"
                name="form_email"
                value={values.form_email}
                onChange={handleChange}
                onBlur={handleBlur}
              />

            </div>

            <div className="col-auto ms-2">
              <button type="submit" className="btn btn-primary mb-2">
                <i className="fa fa-angle-right"></i>
              </button>
            </div>
          </div>
            <div className="">
              {errors.form_email && touched.form_email && (
                <p className="text-danger">{errors.form_email}</p>
              )}

            </div>
        </form>

      )}


    </Formik>

  );
};

export default SubscribeForm;
