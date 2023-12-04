import React, { useState, useEffect } from "react";
import { Formik, useField } from "formik";
import * as Yup from "yup";
import Select from "react-select";

const ProfileInfoSchema = Yup.object().shape({
  userName: Yup.string(),
  email: Yup.string().email(),
  phoneNumber: Yup.string(),
  firstAndLastName: Yup.string(),
  password: Yup.string(),
  countryId: Yup.string(),
  cityId: Yup.string(),
  districtId: Yup.string(),
  neighbourhoodId: Yup.string(),
  advisorTypeId: Yup.string(),
});
import { toast } from "react-toastify";
import generalServices from "../../../services/general.service";
import RegisterService from "../../../services/register.service";
import { useRouter } from "next/router";
export default function Form() {
  const router = useRouter();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [district, setDistrict] = useState();
  const [neighbourhood, setNeighbourhood] = useState();
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [countrys, setCountrys] = useState([]);
  const [citys, setCitys] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighbourhoods, setNeighbourhoods] = useState([]);

  const [advisorTypes, setAdvisorTypes] = useState([]);

  useEffect(() => {
    RegisterService.getAdvisorType().then((res) => {
      if (res?.data?.succedd) {
        setAdvisorTypes(res.data.data);
      }
    });
  }, []);

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
        console.log(res);
        if (res?.succedd) {
          console.log(country);
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
        if (res?.succedd) {
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

  return (
    <Formik
      validationSchema={ProfileInfoSchema}
      initialValues={{
        userName: "",
        email: "",
        phoneNumber: "",
        firstAndLastName: "",
        password: "",
        countryId: "",
        cityId: "",
        districtId: "",
        neighbourhoodId: "",
        advisorTypeId: "",
      }}
      enableReinitialize={true}
      onSubmit={(values, { setSubmitting }) => {
        setLoadingStatus(true)
        RegisterService.addNewAdvisor(values).then((res) => {
          setLoadingStatus(false)
          if (!res.succedd) {
            toast("Kullanıcı başarıyla eklendi.");
            router.push("/danismanlarim");
          } else {
            toast(res.response.data.message);
          }
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
              <div className="my_profile_setting_input form-group p-0">
                <label htmlFor="userName">Kullanıcı Adı</label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  name="userName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userName}
                />
                {errors.userName && touched.userName && (
                  <span className="text-danger">{errors.userName}</span>
                )}
              </div>
            </div>

            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <span className="text-danger">{errors.email}</span>
                )}
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="phoneNumber">Telefon numarası</label>
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
                <label htmlFor="firstAndLastName">İsim & Soyisim</label>
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

            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="password">Şifre</label>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <span className="text-danger">{errors.password}</span>
                )}
              </div>
            </div>

            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="advisorTypeId">Kullanıcı Tipi</label>

                <Select
                  id="advisorTypeId"
                  name="advisorTypeId"
                  onChange={(e) => {
                    setFieldValue("advisorTypeId", e.value);
                    setCountry(e.value);
                  }}
                  options={advisorTypes?.map((item) => {
                    return {
                      label: item?.advisorType,
                      value: item?._id,
                    };
                  })}
                />
                {errors.advisorTypeId && touched.advisorTypeId && (
                  <span className="text-danger">{errors.advisorTypeId}</span>
                )}
              </div>
            </div>

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
                  options={countrys?.map((item) => {
                    return {
                      label: item?.label,
                      value: item?.value,
                    };
                  })}
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
                  options={citys?.map((item) => {
                    return {
                      label: item?.label,
                      value: item?.value,
                    };
                  })}
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
                  options={districts.map((item) => {
                    return {
                      label: item?.label,
                      value: item?.value,
                    };
                  })}
                />
                {errors.districtId && touched.districtId && (
                  <p className="text-danger">{errors.districtId}</p>
                )}
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="neighbourhoodId">Mahalle ID si</label>
                <Select
                  id="neighbourhoodId"
                  name="neighbourhoodId"
                  onChange={(e) => {
                    setNeighbourhood(e.value);
                    setFieldValue("neighbourhoodId", e.value);
                  }}
                  options={neighbourhoods.map((item) => {
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

            {/* End .col */}

            <div className="col-xl-12 text-right">
              <div className="my_profile_setting_input">
                {loadingStatus ?

                  <button
                    className="btn btn2"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    Ekleniyor...
                  </button>
                  :
                  <button
                    className="btn btn2"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Danışman Ekle
                  </button>}
              </div>
            </div>
            {/* End .col */}
          </div>
        </form>
      )}
    </Formik>
  );
}
