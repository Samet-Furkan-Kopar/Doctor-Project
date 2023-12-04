import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { getCurrentUser } from "../../../utils/auth";
import masterServices from "../../../services/user.service";
const SocialMediaSchema = Yup.object().shape({
  instagram: Yup.string(),
  twitter: Yup.string(),
  facebook: Yup.string(),
  linkedln: Yup.string(),
});

import { toast } from "react-toastify";

const SocialMedia = ({ userData }) => {
  console.log(userData);
  return userData ? (
    <Formik
      validationSchema={SocialMediaSchema}
      enableReinitialize={true}
      initialValues={{
        instagram: userData?.instagram?.value || "",
        twitter: userData?.twitter?.value || "",
        facebook: userData?.facebook?.value || "",
        linkedln: userData?.linkedln?.value || "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        let data = {};

        Object.keys(values).forEach((key) => {
          if (values[key]) {
            data[key] = values[key];
          }
        });

        masterServices
          .updateOneUserWithId(userData?._id?.value, data)
          .then((res) => {
            if (res?.succedd) {
              toast("Güncelleme başarıyla gerçekleşti");
            }
          })
          .catch((err) => {
            toast("Bir hatayla karşılaşıldı.");

            console.log(err);
          });
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
            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="instagram">İnstagram</label>
                <input
                  type="text"
                  className="form-control"
                  id="instagram"
                  name="instagram"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.instagram}
                />
              </div>
            </div>

            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="twitter">Twitter</label>
                <input
                  type="text"
                  className="form-control"
                  id="twitter"
                  name="twitter"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.twitter}
                />
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="facebook">Facebook</label>
                <input
                  type="text"
                  className="form-control"
                  id="facebook"
                  name="facebook"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.facebook}
                />
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="linkedln">LinkedIn</label>
                <input
                  type="text"
                  className="form-control"
                  id="linkedln"
                  name="linkedln"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.linkedln}
                />
              </div>
            </div>

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
  ) : (
    <>Yükleniyor</>
  );
};

export default SocialMedia;
