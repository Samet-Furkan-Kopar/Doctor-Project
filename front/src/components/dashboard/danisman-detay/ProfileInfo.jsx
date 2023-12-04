import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";

const ProfileInfoSchema = Yup.object().shape({
  phoneNumber: Yup.string().required("Telefon numarasını yazmadın"),
  firstAndLastName: Yup.string().required("Telefon numarasını yazmadın"),
  countryId: Yup.string(),
  cityId: Yup.string(),
  districtId: Yup.string(),
  neighbourhoodId: Yup.string(),
  userProfilePhoto: Yup.mixed(),
});
import { toast } from "react-toastify";

import generalServices from "../../../services/general.service";
import { useEffect, useState } from "react";

import masterServices from "../../../services/user.service";

const ProfileInfo = ({ userData }) => {
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
        phoneNumber: userData?.phoneNumber?.value || "",
        firstAndLastName: userData?.firstAndLastName?.value || "",
        countryId: userData?.countryId?.value || "",
        cityId: userData?.cityId?.value || "",
        districtId: userData?.districtId?.value || "",
        neighbourhoodId: userData?.neighbourhoodId?.value || "",
        userProfilePhoto: userData?.userProfilePhoto?.value || "",
        email: userData?.email?.value || "",
      }}
      enableReinitialize={true}
      onSubmit={(values, { setSubmitting }) => {
        let data = {};

        Object.keys(values).forEach((key) => {
          if (values[key]) {
            data[key] = values[key];
          }
        });
        console.log(data);

        masterServices
          .updateOneUserWithId(userData?._id?.value, data)
          .then((res) => {
            if (res?.succedd) {
              toast("Güncelleme başarıyla gerçekleşti");
            } else {
              toast(res?.response?.data?.message);
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
            <div className="col-lg-12">
              <div className="wrap-custom-file">
                <input
                  type="file"
                  id="userProfilePhoto"
                  name="userProfilePhoto"
                  onChange={(event) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(event.currentTarget.files[0]);
                    reader.onload = () => {
                      setPp(reader.result);
                    };
                    setFieldValue(
                      "userProfilePhoto",
                      event.currentTarget.files[0]
                    );
                  }}
                  onBlur={handleBlur}
                />
                <label
                  style={
                    values.userProfilePhoto
                      ? {
                          backgroundImage: `url(${pp})`,
                        }
                      : undefined
                  }
                  htmlFor="userProfilePhoto"
                >
                  <span>
                    <i className="flaticon-download"></i> Resim Yükle
                  </span>
                </label>
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group p-0">
                <label htmlFor="phoneNumber">Telefon Numarası</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <span className="text-danger">{errors.phoneNumber}</span>
                )}
              </div>
            </div>

            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="firstAndLastName">İsim Soyisim</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstAndLastName"
                  name="firstAndLastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstAndLastName}
                />
                {errors.firstAndLastName && touched.firstAndLastName && (
                  <span className="text-danger">{errors.firstAndLastName}</span>
                )}
              </div>
            </div>
            {/* End .col */}
            {userData?.email && (
              <div className="col-lg-12 col-xl-12">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    disabled
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </div>
              </div>
            )}

            {userData?.role?.value === "officeUser" && (
              <>
                <div className="col-lg-6 col-xl-6">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="countryId">Ülke ID si</label>

                    <Select
                      id="countryId"
                      name="countryId"
                      onChange={(e) => {
                        setFieldValue("countryId", e.value);
                        setCountry(e.value);
                      }}
                      defaultValue={{
                        label: userData?.countryId?.label,
                        value: userData?.countryId?.value,
                      }}
                      placeholder={{
                        label: userData?.countryId?.label,
                        value: userData?.countryId?.value,
                      }}
                      isDisabled={""}
                      options={[
                        ...(countrys || userData?.countryId?.options).map(
                          (item) => {
                            return {
                              label: item?.label,
                              value: item?.value,
                            };
                          }
                        ),
                      ]}
                    />
                    {errors.countryId && touched.countryId && (
                      <span className="text-danger">{errors.countryId}</span>
                    )}
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-6 col-xl-6">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="cityId">İl ID si</label>
                    <Select
                      id="cityId"
                      name="cityId"
                      onChange={(e) => {
                        setCity(e.value);
                        setFieldValue("cityId", e.value);
                      }}
                      defaultValue={{
                        label: userData?.cityId?.label,
                        value: userData?.cityId?.value,
                      }}
                      placeholder={{
                        label: userData?.cityId?.label,
                        value: userData?.cityId?.value,
                      }}
                      options={(citys || userData?.cityId?.options)?.map(
                        (item) => {
                          return {
                            label: item?.label,
                            value: item?.value,
                          };
                        }
                      )}
                    />
                    {errors.cityId && touched.cityId && (
                      <p className="text-danger">{errors.cityId}</p>
                    )}
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-6 col-xl-6">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="districtId">İlçe ID si</label>
                    <Select
                      id="districtId"
                      name="districtId"
                      onChange={(e) => {
                        setDistrict(e.value);
                        setFieldValue("districtId", e.value);
                      }}
                      defaultValue={{
                        label: userData?.districtId?.label,
                        value: userData?.districtId?.value,
                      }}
                      placeholder={{
                        label: userData?.districtId?.label,
                        value: userData?.districtId?.value,
                      }}
                      options={(districts || userData?.districtId?.options).map(
                        (item) => {
                          return {
                            label: item?.label,
                            value: item?.value,
                          };
                        }
                      )}
                    />
                    {errors.districtId && touched.districtId && (
                      <p className="text-danger">{errors.districtId}</p>
                    )}
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-6 col-xl-6">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="neighbourhoodId">Mahalle IDsi</label>
                    <Select
                      id="neighbourhoodId"
                      name="neighbourhoodId"
                      onChange={(e) => {
                        setNeighbourhood(e.value);
                        setFieldValue("neighbourhoodId", e.value);
                      }}
                      defaultValue={{
                        label: userData?.neighbourhoodId?.label,
                        value: userData?.neighbourhoodId?.value,
                      }}
                      placeholder={{
                        label: userData?.neighbourhoodId?.label,
                        value: userData?.neighbourhoodId?.value,
                      }}
                      options={(
                        neighbourhoods || userData?.neighbourhoodId?.options
                      ).map((item) => {
                        return {
                          label: item?.label,
                          value: item?.value,
                        };
                      })}
                    />
                    {errors.neighbourhoodId && touched.neighbourhoodId && (
                      <p className="text-danger">{errors.neighbourhoodId}</p>
                    )}
                  </div>
                </div>
              </>
            )}
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
  ) : (
    <>Yükleniyor</>
  );
};

export default ProfileInfo;
