import { Field } from "formik";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import dynamic from "next/dynamic";
import advertServices from "../../../services/adver-service";
import generalServices from "../../../services/general.service";
import "quill/dist/quill.snow.css";
import "react-quill/dist/quill.snow.css";
import selectedFiles from "../../../utils/selectedFiles";
import Image from "next/image";
import imageLoader from "../../../utils/imageLoader";
import CurrencyInput from 'react-currency-input-field';
import { addvertGeneralInputs } from "../../../utils/defaultValues";
import * as Yup from "yup";
import LoadingScreen from "../../loading-screen";
import { useDispatch, useSelector } from "react-redux";
import { setFormValues, updateField } from "../../../features/crudForm/crudFormSlice";
import slugify from 'react-slugify';

const CreateList = ({
  errors,
  handleChange,
  handleBlur,
  touched,
  values,
  setValues,
  isValid,
  setFieldValue,
  stepValue,
  initialValueList,
  validationSchema,
}) => {

  const dispatch = useDispatch();
  const crudFrom = useSelector(state => state.crudFrom);

  const [advertTypes, setAdvertTypes] = useState();
  const [processType, setProcessType] = useState();
  const [advertShapes, setAdvertShapes] = useState();
  const [currencyList, setCurrencyList] = useState();
  const [newInputList, setNewInputList] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [targetAdvertShape, setTargetAdvertShape] = useState('')

  const [loadingStepStatus, setLoadingStepStatus] = useState(false)

  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
  const getAdvertTypes = async () => {
    const res = await advertServices
      .getAdvertTypes()
      .then((res) => setAdvertTypes(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAdvertTypes();
  }, []);

  const getProcessTypes = async () => {
    const res = await advertServices
      .getProcessType()
      .then((res) => setProcessType(res.data))
      .catch((err) => console.log(err));
  };


  const getAdvertShapes = async () => {
    const res = await advertServices
      .getAdvertShapes(values.advertTypeId)
      .then((res) => {
        setAdvertShapes(res.data)
        setLoadingStepStatus(false)
      })
      .catch((err) => console.log(err));
  };
  const getAdvertShapeInputs = async () => {
    const res = await advertServices
      .getAdvertTypeInputs(values.advertTypeId)
      .then((res) => {
        if (res?.succedd && res?.data && Object.keys(res?.data).length) {
          Object.keys(initialValueList).map(k => {

            if (!res?.data?.hasOwnProperty(k) && !addvertGeneralInputs.includes(k)) {
              delete initialValueList[k]
              setFieldValue(k, undefined)
            }
          })

          const newInputs = [];
          Object.entries(res.data).map(([k, v]) => {
            if (v.relatedField) {
              if(crudFrom?.formValues && Object.keys(crudFrom.formValues).length > 0 && crudFrom.formValues[v.relatedField.value]){
                initialValueList[v.relatedField.value] = crudFrom.formValues[v.relatedField.value]
                setFieldValue(v.relatedField.value, crudFrom.formValues[v.relatedField.value])
              }else {
                initialValueList[v.relatedField.value] = false
                setFieldValue(v.relatedField.value, false)
              }
            }
            if (!addvertGeneralInputs.includes(k)) {
              if(crudFrom?.formValues && Object.keys(crudFrom.formValues).length > 0 && crudFrom.formValues[k]){
                initialValueList[k] = crudFrom.formValues[k]
                setFieldValue(k, crudFrom.formValues[k])
              }else {
                initialValueList[k] = ''
                setFieldValue(k, '')
              }
             
              newInputs.push(v)
              if (v.isRequired) {
                switch (v.type) {
                  case 'string':
                    validationSchema[k] = Yup.string().when("step", {
                      is: 1,
                      then: (schema) => schema.required(`${v.label} alanı zorunludur`),
                    })
                    break;
                  case 'number':
                    validationSchema[k] = Yup.number().when("step", {
                      is: 1,
                      then: (schema) => schema.required(`${v.label} alanı zorunludur`),
                    })
                    break;
                  case 'combobox':
                    validationSchema[k] = Yup.object().when("step", {
                      is: 1,
                      then: (schema) => schema.required(`${v.label} alanı zorunludur`),
                    })
                    break;

                  default:
                    break;
                }

              }
            }
          })

          setNewInputList(newInputs)
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (values.advertTypeId) {
      setLoadingStepStatus(true)
      // getProcessTypes();
      // getAdvertShapes();
      // getAdvertShapeInputs();

    }
  }, [values.advertTypeId]);


  useEffect(() => {
    if (values.advertShapeId) setTargetAdvertShape(values.advertShapeId)
  }, [values.advertShapeId])

  const getCurrencyList = async () => {
    const res = generalServices
      .getCurrencyList()
      .then((res) => setCurrencyList(res.data))
      .catch((err) => console.log(err));
  };



  // URL'e çevirmeik için
  const handleConvert = () => {
    if (values.seoTitle) {
      const encoded = encodeURIComponent(values.seoTitle);
      setValues((prev) => ({
        ...prev,
        seoUrl: encoded,
      }));
    }
  };
  useEffect(() => {
    handleConvert();
  }, [values.seoTitle]);

  const setAsCoverImage = (e) => {
    setCoverImage(selectedFiles(e));

    if (e && selectedFiles(e)) {
      setValues((prev) => ({
        ...prev,
        coverPhoto: selectedFiles(e),
      }));
      dispatch(updateField({ field: "coverPhoto", value: selectedFiles(e) }));
    }
  };

  const deleteImage = (name) => {
    const deleted = coverImage?.filter((file) => file.name !== name);
    setCoverImage(deleted);
    dispatch(updateField({ field: "coverPhoto", value: null }));
  };

  useEffect(() => {
    if (stepValue === 1 && !coverImage) {
      if(crudFrom.formValues.coverPhoto){
        setCoverImage(crudFrom.formValues.coverPhoto)
      }else if(values?.coverPhoto){
        setCoverImage(values?.coverPhoto)
      }
    }
  }, [stepValue])

  const checkSquareMeterPrice = (sqr) => {
    if (values.advertPrice && sqr) {
      setFieldValue('squareMeterPrice', Number(values.advertPrice) / Number(sqr))
      dispatch(updateField({ field: "squareMeterPrice", value: Number(values.advertPrice) / Number(sqr) }));
    } else {
      dispatch(updateField({ field: "squareMeterPrice", value: 1 }));
    }
  }

  const detectDynamicLabel = (data) => {

    if (targetAdvertShape && targetAdvertShape == "6526636bf8f7d57518bf5287") {
      if (data.value === "squareMeterNet") {
        return "Açık Alan"
      } else if (data.value === "squareMeterGross") {
        return "Kapalı Alan"
      } else {
        return data.label
      }

    } else {
      return data.label;
    }
  }


  return (
    <>
    

      {/* Blog Başlığı */}
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Blog Başlığı*</label>
          <Field
            name="title"
            onBlur={handleBlur}
            onChange={(e) => {

              setFieldValue('title', e.target.value)
              setFieldValue('seoTitle', e.target.value)
              dispatch(updateField({ field: "title", value: e.target.value }));
              dispatch(updateField({ field: "seoTitle", value: e.target.value }));
              setFieldValue('seoUrl', slugify(e.target.value, { delimiter: '-' }))
              dispatch(updateField({ field: "seoUrl", value:slugify(e.target.value, { delimiter: '-' }) }));
              handleChange(e)
            }}
            value={values.title}
            type="text"
            className="form-control"
            id="propertyTitle"
          />
          {touched.title ? (
            errors.title ? (
              <div className="text-danger mb-3">{errors.title}</div>
            ) : null
          ) : (
            ""
          )}
        </div>
      </div>

    


     


      {loadingStepStatus ? (

        <LoadingScreen close={loadingStepStatus} backStatus={true} />)
        :

        <>
          {newInputList.length > 0 &&
            newInputList.map((n, k) => (
              (() => {
                switch (n.type) {
                  case 'string':
                    return <div key={k} className={n.value == "propertyOwnerNumber" || n.value == "propertyOwnerName" ? "col-lg-6 col-xl-6" : "col-lg-3 col-xl-3"}>
                      <div className="my_profile_setting_input form-group">
                        {
                          n.relatedField ?
                            <div className="d-flex justify-content-between">
                              <label htmlFor={n.value}>{n.isRequired ? `${detectDynamicLabel(n)}*` : detectDynamicLabel(n)}</label>
                              <div className="form-check custom-checkbox">
                                <label className="form-check-label" htmlFor={n.relatedField.value}>
                                  {n.relatedField.label}
                                </label>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={n.relatedField.value}
                                  onChange={(e) => {
                                    handleChange(e)
                                    dispatch(updateField({ field: n.relatedField.value, value: e.target.checked }));
                      
                                  }}
                                  name={n.relatedField.value}
                                  checked={values[n.relatedField.value]}
                                />
                              </div>
                            </div> :
                            <label htmlFor={n.value}>{n.isRequired ? `${detectDynamicLabel(n)}*` : detectDynamicLabel(n)}</label>
                        }

                        <Field
                          name={n.value}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e)
                            dispatch(updateField({ field: n.value, value: e.target.value }));
              
                          }}
                          value={values[n.value]}
                          type="text"
                          className="form-control"
                          id={n.value}
                        />
                        {touched[n.value] ? (
                          errors[n.value] ? (
                            <div className="text-danger mb-3">{errors[n.value]}</div>
                          ) : null
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  case 'boolean':
                    return <div key={k} className="col-lg-3 col-xl-3">
                      <div className="my_profile_setting_input form-group">
                        <input
                          type="checkbox"
                          id={n.value}
                          onChange={(e) => {
                            handleChange(e)
                            dispatch(updateField({ field: n.value, value: e.target.checked   }));
              
                          }}
                          name={n.value}
                          className="form-check-input"
                          checked={values[n.value]}
                        />
                        <label htmlFor={n.value} className="ms-1">
                          {n.label}
                        </label>
                        {touched[n.value] ? (
                          errors[n.value] ? (
                            <div className="text-danger mb-3">{errors[n.value]}</div>
                          ) : null
                        ) : (
                          ""
                        )}
                      </div>

                    </div>
                  case 'number':
                    return <div key={k} className="col-lg-3 col-xl-3">
                      <div className="my_profile_setting_input form-group">
                        {
                          n.relatedField ?
                            <div className="d-flex justify-content-between">
                              <label htmlFor={n.value}>{n.isRequired ? `${detectDynamicLabel(n)}*` : detectDynamicLabel(n)}</label>
                              <div className="form-check custom-checkbox">
                                <label className="form-check-label" htmlFor={`${n.relatedField.value}`}>
                                  {n.relatedField.label}
                                </label>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={n.relatedField.value}
                                  onChange={(e) => {
                                    handleChange(e)
                                    dispatch(updateField({ field: n.relatedField.value, value: e.target.checked  }));
                      
                                  }}
                                  name={n.relatedField.value}
                                  checked={values[n.relatedField.value]}
                                />
                              </div>
                            </div> :
                            <label htmlFor={n.value}>{n.isRequired ? `${detectDynamicLabel(n)}*` : detectDynamicLabel(n)}</label>
                        }
                        <Field
                          name={n.value}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e)
                            if (n.value === 'squareMeterNet') {
                              checkSquareMeterPrice(e.target.value)
                            }
                            dispatch(updateField({ field: n.value, value: e.target.value }));
                          }}
                          value={values[n.value]}
                          type="number"
                          min="0"
                          readOnly={n.value === "squareMeterPrice" ? true : false}
                          className="form-control"
                          id={n.value}
                        />
                        {touched[n.value] ? (
                          errors[n.value] ? (
                            <div className="text-danger mb-3">{errors[n.value]}</div>
                          ) : null
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  case 'combobox':
                    return <div key={k} className="col-lg-3 col-xl-3">
                      <div className="my_profile_setting_input ui_kit_select_search form-group">
                        {
                          n.relatedField ?
                            <div className="d-flex justify-content-between">
                              <label htmlFor={n.value}>{n.isRequired ? `${detectDynamicLabel(n)}*` : detectDynamicLabel(n)}</label>
                              <div className="form-check custom-checkbox">
                                <label className="form-check-label" htmlFor={n.relatedField.value}>
                                  {n.relatedField.label}
                                </label>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={n.relatedField.value}
                                  onChange={(e) => {
                                    handleChange(e)
                                    dispatch(updateField({ field: n.relatedField.value, value: e.target.checked  }));
                      
                                  }}
                                  name={n.relatedField.value}
                                  checked={values[n.relatedField.value]}
                                />
                              </div>
                            </div> :
                            <label htmlFor={n.value}>{n.isRequired ? `${detectDynamicLabel(n)}*` : detectDynamicLabel(n)}</label>
                        }
                        <Field
                          component="select"
                          name={n.value}
                          className="selectpicker form-select"
                          data-live-search="true"
                          data-width="100%"
                          value={values[n.value]}
                          onChange={(e) => {
                            handleChange(e)
                            dispatch(updateField({ field: n.value, value: e.target.value }));
              
                          }}
                        >
                          <option selected value="">
                            {n.label}
                          </option>
                          {n.options && n.options?.length > 0 &&
                            n.options.map((o, ind) => (
                              <option key={ind} value={o.value}>{o.label}</option>
                            ))
                          }

                        </Field>
                        {touched[n.value] ? (
                          errors[n.value] ? (
                            <div className="text-danger mb-3">{errors[n.value]}</div>
                          ) : null
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                  case 'textarea':
                    return <div key={k} className="col-lg-12">
                      <div className="my_profile_setting_input form-group">
                        {
                          n.relatedField ?
                            <div className="d-flex justify-content-between">
                              <label htmlFor={n.value}>{n.isRequired ? `${detectDynamicLabel(n)}*` : detectDynamicLabel(n)}</label>
                              <div className="form-check custom-checkbox">
                                <label className="form-check-label" htmlFor={n.relatedField.value}>
                                  {n.relatedField.label}
                                </label>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={n.relatedField.value}
                                  onChange={(e) => {
                                    handleChange(e)
                                    dispatch(updateField({ field: n.relatedField.value, value: e.target.checked  }));
                      
                                  }}
                                  name={n.relatedField.value}
                                  checked={values[n.relatedField.value]}
                                />
                              </div>
                            </div> :
                            <label htmlFor={n.value}>{n.isRequired ? `${detectDynamicLabel(n)}*` : detectDynamicLabel(n)}</label>
                        }

                        <Field
                          name={n.value}
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e)
                            dispatch(updateField({ field: n.value, value: e.target.value }));
              
                          }}
                          value={values[n.value]}
                          type="text"
                          as="textarea"
                          className="form-control"
                          id={n.value}
                        />
                        {touched[n.value] ? (
                          errors[n.value] ? (
                            <div className="text-danger mb-3">{errors[n.value]}</div>
                          ) : null
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                }
              })()
            ))

          }


          {/* Blog Kısa Açıklaması */}
          <div className="col-lg-12">
            <div className="my_profile_setting_textarea">
              <label htmlFor="propertyDescription">Bloğun Kısa Açıklaması*</label>
              <Field
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e)
                  dispatch(updateField({ field: "short_description", value: e.target.value }));
    
                }}
                value={values.short_description}
                name="short_description"
                className="form-control"
                id="propertyDescription"
                rows="7"
              />
              {touched.short_description ? (
                errors.short_description ? (
                  <div className="text-danger mb-3">{errors.short_description}</div>
                ) : null
              ) : (
                ""
              )}
            </div>
          </div>


          {/* İlan Açıklaması */}
          <div className="col-lg-12 mb100" style={{ minHeight: "300px" }}>
            <div className="my_profile_setting_textarea" style={{ height: "100%" }}>
              <label htmlFor="propertyDescription">Blog Açıklaması*</label>
              <ReactQuill theme="snow" value={values.content} style={{ height: "100%" }} onChange={(value) => {
                setFieldValue('content', value)
                  handleChange(value)
                  dispatch(updateField({ field: "content", value: value }));

              }} />
              {touched.content ? (
                errors.content ? (
                  <div className="text-danger mb-3">{errors.content}</div>
                ) : null
              ) : (
                ""
              )}
            </div>
          </div>


          <div className="row  w-100 p-0 m-auto pt50 justify-content-center">
            <div className="col-lg-12 d-flex justify-content-center mt20">
              <ul className="mb-0">
                {/* Yüklenen resimleri göstermek için */}
                {coverImage?.length > 0
                  ? coverImage?.map((item, index) => (
                    <li key={index} className="list-inline-item">
                      <div className="portfolio_item">
                        <Image
                          loader={imageLoader}
                          width={200}
                          height={200}
                          className="img-fluid cover"
                          src={URL.createObjectURL(item)}
                          alt="fp1.jpg"
                        />
                        <div
                          className="edu_stats_list"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Sil"
                          data-original-title="Delete"
                        >
                          <a onClick={() => deleteImage(item.name)}>
                            <span className="flaticon-garbage"></span>
                          </a>
                        </div>
                      </div>
                    </li>
                  ))
                  : undefined}

                {/* End li */}
              </ul>
            </div>
            {/* End .col */}

            <div className="col-lg-12 ">
              <div className="portfolio_upload">
                <input
                  type="file"
                  onChange={setAsCoverImage}
                  multiple={false}
                  accept="image/png, image/gif, image/webp, image/jpeg image/jpg"
                />
                <div className="icon">
                  <span className="flaticon-download"></span>
                </div>
                <p>Yüklemek istediğiniz kapak resmini sürükleyiniz</p>
              </div>
            </div>
            {/* End .col */}

            <div className="col-12">
              <div className="resume_uploader mb30">
                {/* <h3>Eklenenler</h3> */}
                <form className="form-inline d-flex gap-3 flex-wrap wrap align-content-center justify-content-center">
                  {/* <input className="upload-path" /> */}
                  <label className="upload">
                    <input type="file" onChange={setAsCoverImage} />
                    Kapak Resmi Seçin
                  </label>

                  <div
                    className="propertyMedia"
                    style={{
                      position: "absolute",
                      top: "O",
                    }}
                  ></div>
                </form>
              </div>
            </div>
          </div>

        </>

      }


    </>
  );
};

export default CreateList;
