import { useEffect, useState } from "react";
import advertServices from "../../../services/adver-service";
import { Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../../features/stepper/stepperSlice";
import { updateField } from "../../../features/crudForm/crudFormSlice";

const DetailedInfo = ({
  errors,
  handleChange,
  handleBlur,
  touched,
  values,
  setValues,
  setSubmitting,
  oldFeatures
}) => {
  const [features, setFeatures] = useState();
  const [formData, setFormData] = useState();
  const dispatch = useDispatch()
  const formStoreValues = useSelector(state => state.crudFrom)

  // AdvertType ile tüm features'ları çek!
  const getFeaturesWithId = async () => {
    if (values.advertTypeId) {
      const res = advertServices
        .getFeaturesWithId(values.advertTypeId)
        .then((res) => {
          setFeatures(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    getFeaturesWithId();
  }, [values.advertTypeId]);

  // FormData'yı backend'in istediği yapıya çevirmek için
  const convertData = (data) => {
    return data.map((item) => {
      return {
        subtitle_id: item._id,
        content: item.feature.map((featureItem) => {
          return {
            features_id: featureItem._id,
            status: false,
          };
        }),
      };
    });
  };

   // FormData'yı backend'in istediği yapıya çevirmek için
   const convertOldData = (data) => {
    return data.map((item) => {
      return {
        subtitle_id: item.subtitleId,
        content: item.features.map((featureItem) => {
          return {
            features_id: featureItem.featureId,
            status: featureItem.status,
          };
        }),
      };
    });
  };

  useEffect(() => {
    let newArr;
    if (features && values.features?.length <= 0) {
      newArr = convertData(features);
    } else {
      newArr = values.features
    }

    if (newArr) {
      setFormData(newArr);
      // setValues((prev) => ({ ...prev, features: newArr }));
    }
  }, [features]);

  const handleCheckboxChange = (subtitleId, featuresId) => {
    setFormData((prevData) => {
      return prevData?.map((item) => {
        if (item.subtitle_id === subtitleId) {
          return {
            ...item,
            content: item.content.map((contentItem) => {
              if (contentItem.features_id === featuresId) {
                return {
                  ...contentItem,
                  status: !contentItem.status,
                };
              }
              return contentItem;
            }),
          };
        }
        return item;
      });
    });
  };

  // FormData her değiştiğinde Formikteki initialValues'ları değiştir
  useEffect(() => {
    if (formData) {
      setValues((prev) => ({ ...prev, features: formData }));
      dispatch(updateField({ field: "features", value: formData }));
    }
  }, [formData]);

  useEffect(() => {
    if (oldFeatures) {
      const updateFeatureData = convertOldData(oldFeatures)
      if (updateFeatureData) {
        setFormData(updateFeatureData);
      }
    }
  },[oldFeatures])

  useEffect(() => {
    if(values.step === 3 && formStoreValues?.formValues?.features) setFormData(formStoreValues?.formValues?.features)
  }, [values.step]);
  

  // // Checked değeri true mu false mu?
  const getStatusBySubtitleAndFeaturesId = (subtitle_id, features_id) => {
    // if (values.features.length) {
    //   const item = values.features.find(
    //     (item) => item.subtitle_id === subtitle_id
    //   );
    //   if (item) {
    //     const contentItem = item.content.find(
    //       (content) => content.features_id === features_id
    //     );
    //     if (contentItem) {
    //       return contentItem.status;
    //     }
    //   }
    //   return null;
    // }
    if (formData) {
      const entry = formData?.find((item) => item.subtitle_id === subtitle_id);

      if (entry) {
        const content = entry.content.find(
          (item) => item.features_id === features_id
        );
        if (content) {
          return content.status;
        }
        return false;
      }
      return false;
    }
    return false;
  };


  return (
    <div className="row">
      <>
        {features?.map((item, index) => (
          <div
            key={item._id}
            className="accordion mb-3"
            id={`accordionExample-${index}`}
          >
            <div className="card" key={item._id}>
              <div id={`headingOne-${item._id}`}>
                <button
                  className="btn btn-link accordion-button collapsed text-decoration-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseOne-${item._id}`}
                  aria-expanded="false"
                  aria-controls={`collapseOne-${item._id}`}
                >
                  {item.subtitleOfFeaturesName}
                </button>
              </div>

              <div
                id={`collapseOne-${item._id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`headingOne-${item._id}`}
                data-bs-parent={`#accordionExample-${index}`}
              >
                <div className="col-xxs-6 col-sm col-lg col-xl px-3">
                  <ul className="ui_kit_checkbox selectable-list col-lg-12 row py-2">
                    {/* Özellik  */}
                    {item.feature?.map((el, i) => (
                      <li key={i} className="col-md-3 col-xs-12">

                        <div className="form-check custom-checkbox">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`${el.subtitleId}-${el._id}`}
                            checked={formData ? getStatusBySubtitleAndFeaturesId(el.subtitleId, el._id) : false}
                            onChange={() =>
                              handleCheckboxChange(el.subtitleId, el._id)
                            }
                          />
                          <label className="form-check-label" htmlFor={`${el.subtitleId}-${el._id}`}>
                            {el.feature}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>

      {/* <CheckBoxFilter /> */}
    </div>
  );
};

export default DetailedInfo;

