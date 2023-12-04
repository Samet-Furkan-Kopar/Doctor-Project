import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { getCurrentUser } from "../../../utils/auth";
import Select from "react-select";
import masterServices from "../../../services/user.service";
const ProfileInfoSchema = Yup.object().shape({
  companyName: Yup.string(),
  companyTitle: Yup.string(),
  taxNo: Yup.string(),
  taxOffice: Yup.string(),
  officeDescription: Yup.string(),
  officeNumber: Yup.string(),
  aboutUs: Yup.string(),
  officeEmail: Yup.string().email(),
  address: Yup.string(),
  officeCountryId: Yup.string(),
  officeCityId: Yup.string(),
  officeDistrictId: Yup.string(),
  officeNeighbourhoodId: Yup.string(),
  officeLogo: Yup.mixed(),
  officeCoverPhoto: Yup.mixed(),
});
import { toast } from "react-toastify";
import generalServices from "../../../services/general.service";
const Institutional = ({ userData }) => {
  const [pp, setPp] = useState();

  const [country, setCountry] = useState(userData?.countryId?.value);
  const [city, setCity] = useState(userData?.cityId?.value);
  const [district, setDistrict] = useState(userData?.districtId?.value);
  const [neighbourhood, setNeighbourhood] = useState(
    userData?.neighbourhoodId?.value
  );

  const [countrys, setCountrys] = useState(null);
  const [citys, setCitys] = useState(null);
  const [districts, setDistricts] = useState(null);
  const [neighbourhoods, setNeighbourhoods] = useState(null);

  useEffect(() => {
    generalServices.getCountryList().then((res) => {
      if (res?.succeded) {
        setCountrys(res.data);
      }
    });
  }, [country]);

  useEffect(() => {
    if (country)
      generalServices.getCityList(country).then((res) => {
        if (res?.succeded) {
          setCitys(res.data);
          setCity(null);
          setDistrict(null);
          setNeighbourhood(null);
        }
      });
  }, [country]);

  useEffect(() => {
    if (city) {
      generalServices.getDistrictList(city).then((res) => {
        if (res?.succeded) {
          setDistricts(res.data);
          setDistrict(null);
          setNeighbourhood(null);
        }
      });
    }
  }, [city]);

  useEffect(() => {
    if (district) {
      generalServices.getNeighbourhoodList(district).then((res) => {
        if (res?.succeded) {
          setNeighbourhoods(res.data);
          setNeighbourhood(null);
        }
      });
    }
  }, [district]);

  return userData ? (
    <Formik
      validationSchema={ProfileInfoSchema}
      initialValues={{
        companyName: userData?.companyName?.value || "",
        companyTitle: userData?.companyTitle?.value || "",
        taxNo: userData?.taxNo?.value || "",
        taxOffice: userData?.taxOffice?.value || "",
        officeDescription: userData?.officeDescription?.value || "",
        officeNumber: userData?.officeNumber?.value || "",
        aboutUs: userData?.aboutUs?.value || "",
        officeEmail: userData?.officeEmail?.value || "",
        address: userData?.address?.value || "",
        officeCountryId: userData?.officeCountryId?.value || "",
        officeCityId: userData?.officeCityId?.value || "",
        officeDistrictId: userData?.officeDistrictId?.value || "",
        officeNeighbourhoodId: userData?.officeNeighbourhoodId?.value || "",
        officeLogo: userData?.officeLogo?.value || "",
        officeCoverPhoto: userData?.officeCoverPhoto?.value || "",
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
        isSubmitting,
        setFieldValue,
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
            {/* End .col */}

            <div className="col-lg-6">
              <div className="wrap-custom-file">
                <input
                  type="file"
                  id="officeLogo"
                  name="officeLogo"
                  onChange={(event) => {
                    const reader = new FileReader();
                    setFieldValue(event.currentTarget.files[0]);
                    reader.readAsDataURL(event.currentTarget.files[0]);
                    reader.onload = () => {
                      setPp(reader.result);
                    };
                  }}
                  onBlur={handleBlur}
                />
                <label
                  style={
                    values.officeLogo
                      ? {
                          backgroundImage: `url(${pp})`,
                        }
                      : undefined
                  }
                  htmlFor="officeLogo"
                >
                  <span>
                    <i className="flaticon-download"></i> Logo Yükle
                  </span>
                </label>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="wrap-custom-file">
                <input
                  type="file"
                  id="officeCoverPhoto"
                  name="officeCoverPhoto"
                  onChange={(event) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(event.currentTarget.files[0]);
                    reader.onload = () => {
                      setFieldValue("officeCoverPhoto", reader.result);
                    };
                  }}
                  onBlur={handleBlur}
                />
                <label
                  style={
                    values.officeCoverPhoto
                      ? {
                          backgroundImage: `url(${values.officeCoverPhoto})`,
                        }
                      : undefined
                  }
                  htmlFor="officeCoverPhoto"
                >
                  <span>
                    <i className="flaticon-download"></i> Cover Yükle
                  </span>
                </label>
              </div>
            </div>

            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="companyName">Kurum İsmi</label>
                <input
                  type="text"
                  className="form-control"
                  id="companyName"
                  name="companyName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyName}
                />
                {errors.companyName && touched.companyName && (
                  <p className="text-danger">{errors.companyName}</p>
                )}
              </div>
            </div>

            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="companyTitle">Kurum Başlığı</label>
                <input
                  type="text"
                  className="form-control"
                  id="companyTitle"
                  name="companyTitle"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyTitle}
                />
                {errors.companyTitle && touched.companyTitle && (
                  <p className="text-danger">{errors.companyTitle}</p>
                )}
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="taxNo">Tax No</label>
                <input
                  type="text"
                  className="form-control"
                  id="taxNo"
                  name="taxNo"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.taxNo}
                />
                {errors.taxNo && touched.taxNo && (
                  <p className="text-danger">{errors.taxNo}</p>
                )}
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="taxOffice">Tax Ofisi</label>
                <input
                  type="text"
                  className="form-control"
                  id="taxOffice"
                  name="taxOffice"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.taxOffice}
                />
                {errors.taxOffice && touched.taxOffice && (
                  <p className="text-danger">{errors.taxOffice}</p>
                )}
              </div>
            </div>
            {/* End .col */}

            {/* End .col */}
            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="officeNumber">Ofis Numarası</label>
                <input
                  type="text"
                  className="form-control"
                  id="officeNumber"
                  name="officeNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.officeNumber}
                />
                {errors.officeNumber && touched.officeNumber && (
                  <p className="text-danger">{errors.officeNumber}</p>
                )}
              </div>
            </div>

            <>
              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="officeCountryId">Ülke ID si</label>

                  <Select
                    id="officeCountryId"
                    name="officeCountryId"
                    onChange={(e) => {
                      setFieldValue("officeCountryId", e.value);
                      setCountry(e.value);
                    }}
                    defaultValue={{
                      label: userData?.officeCountryId?.label,
                      value: userData?.officeCountryId?.value,
                    }}
                    placeholder={{
                      label: userData?.officeCountryId?.label,
                      value: userData?.officeCountryId?.value,
                    }}
                    isDisabled={""}
                    options={[
                      ...(countrys || userData?.officeCountryId?.options).map(
                        (item) => {
                          return {
                            label: item?.label,
                            value: item?.value,
                          };
                        }
                      ),
                    ]}
                  />
                  {errors.officeCountryId && touched.officeCountryId && (
                    <span className="text-danger">
                      {errors.officeCountryId}
                    </span>
                  )}
                </div>
              </div>
              {/* End .col */}

              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="officeCityId">İl ID si</label>
                  <Select
                    id="officeCityId"
                    name="officeCityId"
                    onChange={(e) => {
                      setCity(e.value);
                      setFieldValue("officeCityId", e.value);
                    }}
                    defaultValue={{
                      label: userData?.officeCityId?.label,
                      value: userData?.officeCityId?.value,
                    }}
                    placeholder={{
                      label: userData?.officeCityId?.label,
                      value: userData?.officeCityId?.value,
                    }}
                    options={(citys || userData?.officeCityId?.options)?.map(
                      (item) => {
                        return {
                          label: item?.label,
                          value: item?.value,
                        };
                      }
                    )}
                  />
                  {errors.officeCityId && touched.officeCityId && (
                    <p className="text-danger">{errors.officeCityId}</p>
                  )}
                </div>
              </div>
              {/* End .col */}

              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="officeDistrictId">İlçe ID si</label>
                  <Select
                    id="officeDistrictId"
                    name="officeDistrictId"
                    onChange={(e) => {
                      setDistrict(e.value);
                      setFieldValue("officeDistrictId", e.value);
                    }}
                    defaultValue={{
                      label: userData?.officeDistrictId?.label,
                      value: userData?.officeDistrictId?.value,
                    }}
                    placeholder={{
                      label: userData?.officeDistrictId?.label,
                      value: userData?.officeDistrictId?.value,
                    }}
                    options={(
                      districts || userData?.officeDistrictId?.options
                    ).map((item) => {
                      return {
                        label: item?.label,
                        value: item?.value,
                      };
                    })}
                  />
                  {errors.officeDistrictId && touched.officeDistrictId && (
                    <p className="text-danger">{errors.officeDistrictId}</p>
                  )}
                </div>
              </div>
              {/* End .col */}

              <div className="col-lg-6 col-xl-6">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="officeNeighbourhoodId">Mahalle ID si</label>
                  <Select
                    id="officeNeighbourhoodId"
                    name="officeNeighbourhoodId"
                    onChange={(e) => {
                      setNeighbourhood(e.value);
                      setFieldValue("officeNeighbourhoodId", e.value);
                    }}
                    defaultValue={{
                      label: userData?.officeNeighbourhoodId?.label,
                      value: userData?.officeNeighbourhoodId?.value,
                    }}
                    placeholder={{
                      label: userData?.officeNeighbourhoodId?.label,
                      value: userData?.officeNeighbourhoodId?.value,
                    }}
                    options={(
                      neighbourhoods || userData?.officeNeighbourhoodId?.options
                    ).map((item) => {
                      return {
                        label: item?.label,
                        value: item?.value,
                      };
                    })}
                  />
                  {errors.officeNeighbourhoodId &&
                    touched.officeNeighbourhoodId && (
                      <p className="text-danger">
                        {errors.officeNeighbourhoodId}
                      </p>
                    )}
                </div>
              </div>
            </>

            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="officeEmail">Ofis E-Mail</label>
                <input
                  type="text"
                  className="form-control"
                  id="officeEmail"
                  name="officeEmail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.officeEmail}
                />
                {errors.officeEmail && touched.officeEmail && (
                  <p className="text-danger">{errors.officeEmail}</p>
                )}
              </div>
            </div>

            <div className=" col-xl-12">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="address">Adres</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                />
                {errors.address && touched.address && (
                  <p className="text-danger">{errors.address}</p>
                )}
              </div>
            </div>

            {/* End .col */}

            <div className="col-xl-12">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="aboutUs">Hakkımızda</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="aboutUs"
                  name="aboutUs"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.aboutUs}
                />
                {errors.aboutUs && touched.aboutUs && (
                  <p className="text-danger">{errors.aboutUs}</p>
                )}
              </div>
            </div>

            <div className="col-xl-12">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="officeDescription">Ofis Açıklaması</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="officeDescription"
                  name="officeDescription"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.officeDescription}
                />
                {errors.officeDescription && touched.officeDescription && (
                  <p className="text-danger">{errors.officeDescription}</p>
                )}
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

export default Institutional;
