import { Field } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import advertServices from "../../../services/adver-service";
import generalServices from "../../../services/general.service";
import slugify from 'react-slugify';
import { useDispatch } from "react-redux";

const SeoManagement = ({
  errors,
  handleChange,
  handleBlur,
  touched,
  values,
  setFieldValue,
  setValues,
  isValid,
  stepValue
}) => {
const [seoURL, setSeoURL] = useState('')
const dispatch = useDispatch();

  useEffect(() => {
    if(stepValue == 5){
      setSeoURL(slugify(values.seoTitle, { delimiter: '-' }))
    }
  }, [stepValue])


  return (
    <>
      {/* Seo Title */}
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Seo Başlık</label>
          <Field
            name="seoTitle"
            readOnly={true}
            onBlur={handleBlur}
            onChange={(e) => {
              setFieldValue('seoTitle', e.target.value)
              setFieldValue('seoUrl', slugify(e.target.value, { delimiter: '-' }))
              dispatch(updateField({ field: "seoTitle", value: e.target.value }));
              dispatch(updateField({ field: "seoUrl", value:slugify(e.target.value, { delimiter: '-' }) }));
              setSeoURL(slugify(e.target.value, { delimiter: '-' }))
            }}
            value={values.seoTitle}
            type="text"
            className="form-control"
            id="seoTitle"
          />
          {touched.seoTitle ? (
            errors.seoTitle ? (
              <div className="text-danger mb-3">{errors.seoTitle}</div>
            ) : null
          ) : (
            ""
          )}
        </div>
      </div>

      {/* Seo Url */}
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Url</label>
          <input
            readOnly={true}
            name="seoUrl"
            onBlur={handleBlur}
            value={seoURL}
            type="text"
            className="form-control"
            id="propertyTitle"
          />
          {touched.seoUrl ? (
            errors.seoUrl ? (
              <div className="text-danger mb-3">{errors.seoUrl}</div>
            ) : null
          ) : (
            ""
          )}
        </div>
      </div>

      {/* SEO Description */}
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Seo Açıklaması</label>
          <Field
            name="seoDescription"
            onBlur={handleBlur}
            onChange={(e) => {
              handleChange(e)
              dispatch(updateField({ field: 'seoDescription', value: e.target.value }));

            }}
            value={values.seoDescription}
            type="text"
            className="form-control"
            id="propertyTitle"
          />
          {touched.seoDescription ? (
            errors.seoDescription ? (
              <div className="text-danger mb-3">{errors.seoDescription}</div>
            ) : null
          ) : (
            ""
          )}
        </div>
      </div>

    </>
  );
};

export default SeoManagement;
