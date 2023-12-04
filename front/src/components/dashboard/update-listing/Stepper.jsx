import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import CreateList from "./CreateList";
import LocationField from "./LocationField";
import DetailedInfo from "./DetailedInfo";
import PropertyMediaUploader from "./PropertyMediaUploader";
import * as Yup from "yup";
import advertServices from "../../../services/adver-service";
import CoverPhoto from "./CoverPhoto";
import { Stepper } from 'react-form-stepper';
import SeoManagement from "./SeoManagement";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import OldImages from "./OldImages";
import { useDispatch, useSelector } from "react-redux";
import { resetFields } from "../../../features/crudForm/crudFormSlice";



export default function StepperForm({ id, loadingStatus, setLoadingStatus }) {
  const [newStep, setNewStep] = useState(0)
  const [blogInfo, setBlogInfo] = useState({})
  const [oldFeatures, setOldFeatures] = useState([])
  const [oldImages, setOldImages] = useState([])

  const dispatch = useDispatch()
  const formStoreValues = useSelector(state => state.crudFrom)
  const initialValueList = {
    step: 1,
    lastStep: 3,

    seoTitle: "",
    seoUrl: "",
    seoDescription: "",

    // step 1
   
    title: "",
    content: "",
    short_description: "",

   
    // step 3 - Detail Information
    features: [],

    // step 4  Upload Photo
    blogPhoto: "",

    // step 5 Cover Photo
    coverPhoto: "",
  }
  const router = useRouter();

  const steps = [
    {
      step: 1,
      label: "Blog Bilgileri",
    },
    {
      step: 2,
      label: "Fotoğraf Yükleyin",
    },
    {
      step: 3,
      label: "Seo Ayarları",
    },
  ];

  const validationSchema = {
  
    title: Yup.string().when("step", {
      is: 1,
      then: (schema) => schema.required("İlan başlığı zorunludur"),
    }),
    content: Yup.string().when("step", {
      is: 1,
      then: (schema) => schema.required("İlan açıklaması zorunludur"),
    }),
    short_description: Yup.string().when("step", {
      is: 1,
      then: (schema) => schema.required("İlanın Kısa Açıklaması Zorunludur"),
    }),
  

    // Step - 2



    // Step - 5
    seoTitle: Yup.string().when("step", {
      is: 3,
      then: (schema) => schema.required("SEO Başlık kısmı zorunludur"),
    }),

    seoUrl: Yup.string().when("step", {
      is: 3,
      then: (schema) => schema.required("Url Kısmı zorunludur"),
    }),

    seoDescription: Yup.string().when("step", {
      is: 3,
      then: (schema) => schema.required("Seo açıklama kısmı zorunludur"),
    }),
  };

  const stepperSchema = Yup.object().shape(validationSchema);

  const onSubmit = async (values) => {
    setLoadingStatus(true)
    const formValues = values;
    if (Object.keys(formValues).length > 0 && formValues.features) {
      formValues.features = JSON.stringify(formValues.features)
    }

    if (Object.keys(formValues).length > 0 && formValues.photoStatus && formValues.photoStatus.length) {
      const newObj = [];
      formValues.photoStatus.map(f => {
        newObj.push({ [f.label]: f.status })
      })
      formValues.photoStatus = JSON.stringify(newObj)
    }

    const res = advertServices
      .updateBlog(formValues, blogInfo._id)
      .then((res) => {
        setLoadingStatus(false)
        if (res && res.succedd) {
          Swal.fire({ title: 'Eklendi!', text: 'İlan Başarılı Bir Şekilde Gönderildi.', icon: 'success', customClass: 'sweet-alerts' });
          router.push("/ilanlarim");
        } else {
          Swal.fire({ title: 'Hata!', text: 'İşlem Gerçekleştirilirken Hata İle Karşılaşıldı.', icon: 'error', customClass: 'sweet-alerts' });
        }
      })
      .catch((err) => {
        Swal.fire({ title: 'Hata!', text: err, icon: 'error', customClass: 'sweet-alerts' });
      });
  };


  useEffect(() => {
    if (id) {
      advertServices.getBlogDetails(id).then(res => {
        console.log(res);
        if (res && res.succeded && res.data) {
          console.log(res.data);
          // res.data && setOldImages(res.data.image)
          res.data && setBlogInfo(res.data)
          res.data && setOldFeatures(res.data?.coverPhoto)
        }
      })
    }
  }, [id])

  return (
    <Formik
      initialValues={initialValueList}
      onSubmit={async (formsData, { setSubmitting, setFieldValue }) => {
        setSubmitting(true)
        const formValues = formsData;
        if (Object.keys(formValues).length > 0 && formValues.features) {
          formValues.features = JSON.stringify(formValues.features)
        }

        if (Object.keys(formValues).length > 0 && formValues.photoStatus && formValues.photoStatus.length) {
          const newObj = [];
          formValues.photoStatus.map(f => {
            newObj.push({ [f.label]: f.status })
          })
          formValues.photoStatus = JSON.stringify(newObj)
        }

        await advertServices
          .updateBlog(formValues, blogInfo._id)
          .then((res) => {
            setLoadingStatus(false)
            if (res && res.succeded) {
              console.log(res);
              Swal.fire({ title: 'Güncellendi!', text: 'Blog Başarılı Bir Şekilde Gönderildi.', icon: 'success', customClass: 'sweet-alerts' });
              dispatch(resetFields());
              router.push("/ilanlarim");
            } else {
              setFieldValue("step", 1);
              Swal.fire({ title: 'Hata!', text: res, icon: 'error', customClass: 'sweet-alerts' });
            }
          })
          .catch((err) => {
            console.log("esdsef");
            setFieldValue("step", 1);
            Swal.fire({ title: 'Hata!', text: err, icon: 'error', customClass: 'sweet-alerts' });
          });
        setSubmitting(false)
      }}
      enableReinitialize
      validationSchema={stepperSchema}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        isSubmitting,
        submitCount,
        touched,
        setFieldValue,
        isValid,
        dirty,
        setValues,
        setSubmitting,
        validateForm,
        setFieldTouched
      }) => {
        const prevHandle = () => {
          Object.entries(formStoreValues.formValues).map(([k, v]) => {
            if (k !== "step") {
              setFieldValue(k, v)
            } else {
              setFieldValue("step", values.step - 1);
              setNewStep(values.step - 1)
            }
          })
        };

        const nextHandle = async (errors) => {
          const isError = [Object.values(errors)];
          if (!isValid || !dirty) {

          } else {
            setFieldValue("step", values.step + 1);
            setNewStep(values.step + 1)
          }

          const err = await validateForm();
          if (Object.keys(err).length > 0) {
            Object.keys(err).map(k => {
              setFieldTouched(k)
            })
            Swal.fire({ title: 'Hata!', text: 'Lütfen zorunlu alanları doldurunuz', icon: 'error', customClass: 'sweet-alerts' });
          } else {
            setFieldValue("step", values.step + 1);
            setNewStep(values.step + 1)
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }

        };

        return (
          <Form>
            {/* Progess Bar */}

            <Stepper
              steps={steps}
              activeStep={values.step - 1}
            />
            {values.step === 1 && (
              <>
                {/* 1. Stepte Gözükecek Kodlar */}
                <div className="my_dashboard_review">
                  <div className="row">
                    <div className="col-lg-12">
                      <h3 className="mb30">Blog Oluşturun</h3>
                    </div>

                    <CreateList
                      errors={errors}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      isSubmitting={isSubmitting}
                      setFieldValue={setFieldValue}
                      values={values}
                      touched={touched}
                      isValid={isValid}
                      setValues={setValues}
                      setSubmitting={setSubmitting}
                      stepValue={values.step}
                      initialValueList={initialValueList}
                      blogInfo={blogInfo}
                      validationSchema={validationSchema}
                    />
                  </div>
                </div>
              </>
            )}

        
            {values.step === 2 && (
              <>
                {/* 4. Step  */}

                <div className="my_dashboard_review mt30">
                  <div className="col-lg-12">
                    <h3 className="mb30">Resim Yükleyin</h3>
                  </div>
                  <div className="mb40" style={{ marginBottom: '40px' }}>
                    <OldImages images={oldImages} advertId={id} />
                  </div>
                  <PropertyMediaUploader
                    errors={errors}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    values={values}
                    setValues={setValues}
                    stepValue={values.step}
                  />
                </div>
              </>
            )}
            {values.step === 3 && (
              <>
                {/* 5. Step  */}

                <div className="my_dashboard_review mt30">
                  <div className="col-lg-12">
                    <h3 className="mb30">Seo Yönetimi</h3>
                  </div>
                  <SeoManagement
                    errors={errors}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    values={values}
                    setValues={setValues}
                    stepValue={values.step}
                  />
                </div>
              </>
            )}


            {/* İleri Geri Button */}
            <div className="col-xl-12 stepper-buttons">
              <div className="my_profile_setting_input">
                {values.step > 1 ? (
                  <button
                    className="btn btn1 float-start"
                    type="button"
                    onClick={prevHandle}
                  >
                    Geri
                  </button>
                ) : (
                  <div />
                )}

                {values.step !== values.lastStep && (
                  <button
                    className="btn btn2 float-end"
                    type="button"
                    onClick={() => {
                      nextHandle(errors)
                    }}
                  // disabled={!isValid || !dirty}
                  >
                    İleri
                  </button>
                )}

                {values.step === values.lastStep && (
                  <>
                    {isSubmitting ?
                      <button
                        className="btn btn2 float-end"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        Ekleniyor...
                      </button>
                      :
                      <button className="btn btn2 float-end" type="submit">
                        Güncelle
                      </button>}

                  </>
                )}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
