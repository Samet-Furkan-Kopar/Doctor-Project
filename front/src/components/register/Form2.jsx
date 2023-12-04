
import Link from "next/link";
import { useEffect, useState } from "react";
import index from ".";
import { useRouter } from "next/router";
import generalServices from "../../services/general.service";
import authServices from "../../services/auth.service";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import Select from 'react-select';

export default function Form2({ isPopup }) {
  const [districtList, setDistrcitList] = useState();
  const [countryList, setCountryList] = useState();
  const [neighbourhoodList, setNeighbourhoodList] = useState();
  const [categoriesList, setCategoriesList] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState();
  const [cityList, setCityList] = useState();


  // Kullanıcı tipini seçmek için
  const [selectedUserType, setSelectedUserType] =
    useState("Bireysel Kullanıcı");

  const router = useRouter();
  const currentPath = router.asPath;

  const options = [
    { value: "Bireysel Kullanıcı" },
    { value: "Doktor Kullanıcı" },
  ];

  const getCategoryList = async () => {
    const res = await authServices
      .getDoctorCategoryList()
      .then((res) => setCategoriesList(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCategoryList();
  }, []);


  const getValidationSchemaForUserType = (selectedUserType) => {
    const commonSchema = {
      firstName: Yup.string().required("İsim zorunludur."),
      lastName: Yup.string().required("Soy isimı zorunludur."),
      email: Yup.string()
        .email("Lütfen geçerli bir e-posta adresi giriniz.")
        .required("E-posta adresi zorunludur."),
      phoneNumber: Yup.number()
        .positive("Telefon Numarası pozitif sayı olmak zorundadır.")
        .integer()
        .required("Telefon numarası zorunludur."),
      password: Yup.string()
        .min(6, "En az 6 karakter gerekli.")
        .required("Şifre zorunludur."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Şifreler uyuşmamaktadır.")
        .required("Lütfen oluşturmuş olduğunuz şifrenizi tekrar giriniz"),

    };

    if (selectedUserType === "Bireysel Kullanıcı") {
      return Yup.object(commonSchema);
    }

    return Yup.object({
      ...commonSchema,
      companyName: Yup.string().required("Ofis Adı zorunludur."),
      companyTitle: Yup.string().required("Ofis Ünvanı zorunludur."),
      taxNo: Yup.number().required("Vergi numarası zorunludur."),
      taxOffice: Yup.string().required("Vergi Dairesi zorunludur"),
      officeEmail: Yup.string()
        .email("Lütfen geçerli bir e-posta adresi giriniz.")
        .required("Şirketinizin e-posta adresi zorunludur."),
      // address: Yup.string().required("Ofisinizin adresi zorunludur."),
      categoryId: Yup.string().required("Kategori seçimi zorunludur."),


    });
  };

  const onSubmit = async (values) => {
    toast.loading("Kayıt olunuyor...");

    if (selectedUserType === "Bireysel Kullanıcı") {
      const register = await authServices
        .addIndividualUser(values)
        .then((res) => {
          console.log("Kayıttan Gelen response : ", res.succeded);
          if (res.succeded === true) {
            console.log("Kayıttan Gelen response : ", res);
            toast.dismiss();
            toast.success("Kayıt İşlemi Başarılı");
            setTimeout(() => {
              router.push("/login");
            }, 1000);
          } else {
            console.log(
              toast.error(res.message)
            );
            toast.dismiss();
            toast.error(res.message);
          }
        })
        .catch((err) => toast.error(err));
      return register;
    } else {


      const register = await authServices
        .addDoctorUser(values)
        .then((res) => {
          console.log("Kayıttan Gelen response : ", res);
          if (res.succeded === true) {
            toast.dismiss();
            toast.success("Kayıt İşlemi Başarılı");
            setTimeout(() => {
              router.push("/login");
            }, 1000);
          } else {

            toast.dismiss();
            toast.error(res.message);

          }
        })
        .catch((err) => setErrorsFromApi(err));
      return register;
    }
  };

  let initialValues =
    selectedUserType === "Bireysel Kullanıcı"
      ? {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",

      }
      : {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        companyName: "",
        companyTitle: "",
        categoryId: "",
        officeEmail: "",
        taxNo: "",
        taxOffice: "",
        // address: "",
        confirmPassword: "",
      };
  return (
    <>
      <Toaster
        position="top-right"
        containerClassName=""
        containerStyle={{ opacity: "100%" }}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />

      <Formik
        initialValues={initialValues}
        //   validate={(values) => {
        //     const errors = {};
        //     if (!values.email) {
        //       errors.email = "Required";
        //     } else if (
        //       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //     ) {
        //       errors.email = "Invalid email address";
        //     }
        //     return errors;
        //   }}
        onSubmit={onSubmit}
        enableReinitialize
        validationSchema={getValidationSchemaForUserType(selectedUserType)}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          isSubmitting,
          submitCount,
          touched,
        }) => (
          <Form>
            {!isPopup && currentPath.includes("register") && (
              <div className="heading text-center">
                <h3 className="login-header">Hesabınıza kaydolun</h3>
                <p className="text-center login-header--text">
                  Zaten hesabınız var mı?{" "}
                  <Link href="/login" className="text-thm">
                    Giriş Yap!
                  </Link>
                </p>
              </div>
            )}

            {/* Kullanıcı tipini seçme */}
            <div className="form-group input-group mb-2">
              <select
                class="form-select form-control"
                aria-label="Default select example"
                value={values.selectedUserType}
                onChange={(e) => setSelectedUserType(e.target.value)}
                onBlur={handleBlur}
              >
                {options.map((option, index) => (
                  <option
                    key={index}
                    selected={option.value === "Bireysel Kullanıcı"}
                  >
                    {option.value}
                  </option>
                ))}
              </select>
            </div>

            {/* firstName */}
            <div className="mb-2">
              <div className="form-group input-group ">
                <Field
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  className="form-control"
                  required
                  placeholder="Adı"
                  onBlur={handleBlur}
                />
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="flaticon-user"></i>
                  </div>
                </div>
              </div>

              {touched.firstName ? (
                errors.firstName ? (
                  <div className="text-danger mb-3">
                    {errors.firstName}
                  </div>
                ) : null
              ) : (
                ""
              )}
            </div>

            {/* userNmae */}
            <div className="mb-2">
              <div className="form-group input-group ">
                <Field
                  type="text"
                  className="form-control"
                  required
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                  placeholder="SoyAdı"
                  onBlur={handleBlur}
                />
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="flaticon-user"></i>
                  </div>
                </div>
              </div>

              {touched.lastName ? (
                errors.lastName ? (
                  <div className="text-danger mb-3">{errors.lastName}</div>
                ) : null
              ) : (
                ""
              )}
            </div>

            {/* Doktor Kullanıcı ise form'a ekstra 4 input eklemek için  */}
            {selectedUserType === "Doktor Kullanıcı" && (
              <>
                {/* categoryId */}
                <div className="mb-2">
                  <div className="form-group input-group">
                    <select
                      name="categoryId"
                      className="form-control"
                      value={values.categoryId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="" disabled>
                        Kategori Seçiniz
                      </option>
                      {categoriesList.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.role}
                        </option>
                      ))}
                    </select>
                  </div>

                  {touched.categoryId && errors.categoryId && (
                    <div className="text-danger mb-3">{errors.categoryId}</div>
                  )}
                </div>


                {/* Company Name */}
                <div className="mb-2">
                  <div className="form-group input-group ">
                    <Field
                      name="companyName"
                      type="text"
                      className="form-control"
                      required
                      placeholder="Ofis Adı"
                      value={values.companyName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-user"></i>
                      </div>
                    </div>
                  </div>

                  {touched.companyName ? (
                    errors.companyName ? (
                      <div className="text-danger mb-3">
                        {errors.companyName}
                      </div>
                    ) : null
                  ) : (
                    ""
                  )}
                </div>

                {/* Company Title */}
                <div className="mb-2">
                  <div className="form-group input-group ">
                    <Field
                      name="companyTitle"
                      type="text"
                      className="form-control"
                      required
                      placeholder="Ofis Title"
                      value={values.companyTitle}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-user"></i>
                      </div>
                    </div>
                  </div>

                  {touched.companyTitle ? (
                    errors.companyTitle ? (
                      <div className="text-danger mb-3">
                        {errors.companyTitle}
                      </div>
                    ) : null
                  ) : (
                    ""
                  )}
                </div>

                {/* Tax No */}
                <div className="mb-2">
                  <div className="form-group input-group ">
                    <Field
                      type="number"
                      className="form-control"
                      required
                      placeholder="Vergi Numarası"
                      onBlur={handleBlur}
                      name="taxNo"
                      value={values.taxNo}
                      onChange={handleChange}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-user"></i>
                      </div>
                    </div>
                  </div>

                  {touched.taxNo ? (
                    errors.taxNo ? (
                      <div className="text-danger mb-3">{errors.taxNo}</div>
                    ) : null
                  ) : (
                    ""
                  )}
                </div>

                {/* Tax Office */}
                <div className="mb-2">
                  <div className="form-group input-group ">
                    <Field
                      type="text"
                      className="form-control"
                      required
                      placeholder="Vergi Dairesi"
                      onBlur={handleBlur}
                      name="taxOffice"
                      value={values.taxOffice}
                      onChange={handleChange}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-user"></i>
                      </div>
                    </div>
                  </div>

                  {touched.taxOffice ? (
                    errors.taxOffice ? (
                      <div className="text-danger mb-3">{errors.taxOffice}</div>
                    ) : null
                  ) : (
                    ""
                  )}
                </div>

                {/* Office Email */}
                <div className="mb-2">
                  <div className="form-group input-group ">
                    <Field
                      type="email"
                      className="form-control"
                      required
                      placeholder="Şirketiniz e-mail adresini giriniz"
                      onBlur={handleBlur}
                      name="officeEmail"
                      value={values.officeEmail}
                      onChange={handleChange}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-user"></i>
                      </div>
                    </div>
                  </div>

                  {touched.officeEmail ? (
                    errors.officeEmail ? (
                      <div className="text-danger mb-3">
                        {errors.officeEmail}
                      </div>
                    ) : null
                  ) : (
                    ""
                  )}
                </div>

                {/* Office Address */}
                {/* <div className="mb-3">
                  <div className="form-group input-group ">
                    <Field
                      type="text"
                      className="form-control"
                      required
                      placeholder="Şirketinizin adresini giriniz"
                      onBlur={handleBlur}
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-user"></i>
                      </div>
                    </div>
                  </div>

                  {touched.address ? (
                    errors.address ? (
                      <div className="text-danger mb-3">{errors.address}</div>
                    ) : null
                  ) : (
                    ""
                  )}
                </div> */}
              </>
            )}

            {/* email*/}
            <div className="mb-2">
              <div className="form-group input-group  ">
                <Field
                  type="email"
                  className="form-control"
                  required
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="E-posta Adresi"
                  onBlur={handleBlur}
                />
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="fa fa-envelope-o"></i>
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

            {/* phoneNumber */}
            <div className="mb-2">
              <div className="form-group input-group  ">
                <Field
                  type="number"
                  className="form-control"
                  required
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  placeholder="Telefon Numarası"
                  onBlur={handleBlur}
                />
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <img src="/assets/images/register/phone-icon.png" />
                  </div>
                </div>
              </div>

              {touched.phoneNumber ? (
                errors.phoneNumber ? (
                  <div className="text-danger mb-3">{errors.phoneNumber}</div>
                ) : null
              ) : (
                ""
              )}
            </div>

            {/* password*/}
            <div className="mb-2">
              <div className="form-group input-group  ">
                <Field
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className="form-control"
                  required
                  placeholder="Şifre"
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

            {/* re-password */}
            <div className="mb-2">
              <div className="form-group input-group  ">
                <Field
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  required
                  placeholder="Şifre Tekrarı"
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  onChange={handleChange}
                />
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="flaticon-password"></i>
                  </div>
                </div>
              </div>
              {touched.confirmPassword ? (
                errors.confirmPassword ? (
                  <div className="text-danger mb-3">
                    {errors.confirmPassword}
                  </div>
                ) : (
                  <div className="text-success mb-3">
                    Şifreler uyuşmaktadır!
                  </div>
                )
              ) : (
                ""
              )}
            </div>



            {/* terms-conditions */}
            <div className="mb-2">
              <div className="form-group form-check custom-checkbox mb-3">
                <Field
                  className="form-check-input"
                  type="checkbox"
                  name="terms-conditions"
                  required
                  id="terms"
                />
                <label
                  className="form-check-label form-check-label login-terms-and-conditions--title"
                  htmlFor="terms"
                >
                  Kullanım Şartları ve Gizlilik Politikasını kabul ettim.
                </label>
              </div>
            </div>

            {/* End .form-group */}

            {/* login button */}
            <button
              type="submit"
              className="btn btn-log w-100 btn-thm"
              disabled={isSubmitting}
            >
              Kayıt Ol
            </button>

            <div>
              <p className="text-center login-header--text ">
                Zaten hesabınız var mı?{" "}
                <Link href="/login" className="text-thm">
                  Giriş Yap!
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
