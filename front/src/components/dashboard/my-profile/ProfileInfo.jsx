import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useRouter } from "next/router";

const ProfileInfoSchema = Yup.object().shape({
  phoneNumber: Yup.string().required("Telefon numarasını yazmadın"),
  firstName: Yup.string().required("Lütfen İsim Giriniz"),
  lastName: Yup.string().required("Lütfen Soyisim Giriniz"),
  companyName: Yup.string(),
  companyTitle: Yup.string(),
  taxNo: Yup.number(),
  taxOffice: Yup.string(),
  countryId: Yup.string(),
  cityId: Yup.string(),
  districtId: Yup.string(),
  neighbourhoodId: Yup.string(),
  image_url: Yup.mixed(),
  coverPhoto: Yup.mixed(),
});
import { toast } from "react-toastify";

import generalServices from "../../../services/general.service";
import { useEffect, useState } from "react";

import masterServices from "../../../services/user.service";
import { useDispatch } from "react-redux";

const ProfileInfo = ({ userData }) => {
  const router = useRouter();
  const [pp, setPp] = useState();
  const [officePhoto, setOfficePhoto] = useState();
  const dispatch = useDispatch()
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
    if (userData?.advisorProfilePhoto?.value) {

    }
  }, [userData])

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
        lastName: userData?.lastName?.value || "",
        firstName: userData?.firstName?.value || "",
        countryId: userData?.countryId?.value || "",
        cityId: userData?.cityId?.value || "",
        districtId: userData?.districtId?.value || "",
        neighbourhoodId: userData?.neighbourhoodId?.value || "",
        image_url: userData?.image_url?.value || "",
        coverPhoto: userData?.coverPhoto?.value || "",
        companyName: userData?.companyName?.value || "",
        companyTitle: userData?.companyTitle?.value || "",
        taxNo: userData?.taxNo?.value || "",
        taxOffice: userData?.taxOffice?.value || "",
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
          .updateOneUserWithId(data)
          .then((res) => {
            console.log(res);
            if (res?.succeded) {
              toast("Güncelleme başarıyla gerçekleşti");
              // setTimeout(() => {
              //   router.push("/");
              // }, 700);
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
            <div className="col-lg-6">
              <div className="wrap-custom-file">
                <input
                  type="file"
                  id="image_url"
                  name="image_url"
                  onChange={(event) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(event.currentTarget.files[0]);
                    reader.onload = () => {
                      setPp(reader.result);
                    };
                    setFieldValue(
                      "image_url",
                      event.currentTarget.files[0]
                    );
                  }}
                  onBlur={handleBlur}
                />
                <label
                  style={
                    values.image_url
                      ? {
                        backgroundImage: `url(${pp})`,
                      }
                      : undefined
                  }
                  htmlFor="image_url"
                >
                  <span>
                    <i className="flaticon-download"></i>Profil Resmi Yükle
                  </span>
                </label>
              </div>
            </div>
            {userData?.type?.value === "doctor" && (
              <>
                <div className="col-lg-6">
                  <div className="wrap-custom-file">
                    <input
                      type="file"
                      id="coverPhoto"
                      name="coverPhoto"
                      onChange={(event) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(event.currentTarget.files[0]);
                        reader.onload = () => {
                          setOfficePhoto(reader.result);
                          
                        };
                        setFieldValue(
                          "coverPhoto",
                          event.currentTarget.files[0]
                        );
                      }}
                      onBlur={handleBlur}
                    />
                    <label
                      style={
                        values.coverPhoto
                          ? {
                            backgroundImage: `url(${officePhoto})`,
                          }
                          : undefined
                      }
                      htmlFor="coverPhoto"
                    >
                      <span>
                        <i className="flaticon-download"></i> Ofis Resim Yükle
                      </span>
                    </label>
                  </div>
                </div>
              </>
            )}
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
                <label htmlFor="firstName">İsim</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                {errors.firstName && touched.firstName && (
                  <span className="text-danger">{errors.firstName}</span>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-xl-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="lastName">Soyisim</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
                {errors.lastName && touched.lastName && (
                  <span className="text-danger">{errors.lastName}</span>
                )}
              </div>
            </div>
            {/* End .col */}

            {userData?.type?.value === "doctor" && (
              <>
                <div className="col-lg-6 col-xl-6">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="companyName">Ofis İsmi</label>
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
                      <span className="text-danger">{errors.companyName}</span>
                    )}
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-6 col-xl-6">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="companyTitle">Ofis Title</label>
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
                      <span className="text-danger">{errors.firstName}</span>
                    )}
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-6 col-xl-6">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="taxOffice">TaxOffice</label>
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
                      <span className="text-danger">{errors.taxOffice}</span>
                    )}
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-6 col-xl-6">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="taxNo">taxNo</label>
                    <input
                      type="number"
                      className="form-control"
                      id="taxNo"
                      name="taxNo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.taxNo}
                    />
                    {errors.taxNo && touched.taxNo && (
                      <span className="text-danger">{errors.taxNo}</span>
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
