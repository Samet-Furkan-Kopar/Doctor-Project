import { useState } from "react";
import selectedFiles from "../../../utils/selectedFiles";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { IoMdPhotos } from "react-icons/io";
import imageLoader from "../../../utils/imageLoader";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../features/crudForm/crudFormSlice";

const PropertyMediaUploader = ({
  errors,
  handleChange,
  handleBlur,
  touched,
  setValues,
  values,
  stepValue
}) => {
  const [propertySelectedImgs, setPropertySelectedImgs] = useState([]);
  const [advertImageStatus, setAdvertImageStatus] = useState([])
  const crudFrom = useSelector(state => state.crudFrom);
  const dispatch = useDispatch()

  // multiple image select
  const multipleImage = (e) => {
    // checking is same file matched with old stored array
    const isExist = propertySelectedImgs?.some((file1) =>

      selectedFiles(e)?.some((file2) => file1.name === file2.name)
    );

    if (!isExist) {
     
      if(selectedFiles(e)){
        const tmpImgArray = [...propertySelectedImgs, ...selectedFiles(e)];
        setPropertySelectedImgs((old) => [...old, ...selectedFiles(e)]);
        setValues((prev) => ({ ...prev, blogPhoto: tmpImgArray }));
        dispatch(updateField({ field: "blogPhoto", value: tmpImgArray }));
        const newCheckArr = selectedFiles(e);
        if (newCheckArr && newCheckArr.length) {
          newCheckArr.map((im, k) => {
            setAdvertImageStatus((old) => [...old, { label: `image_${propertySelectedImgs.length + k + 1}`, status: true }])
  
          })
        }
      }
    } else {
      toast.error("Bu resmi zaten yüklediniz!");
    }
  };
  useEffect(() => {
    if (stepValue === 2 && !propertySelectedImgs.length) {
      if(crudFrom.formValues.blogPhoto){
        setPropertySelectedImgs(crudFrom.formValues.blogPhoto)
      }else if(values?.blogPhoto?.length){
        setPropertySelectedImgs(values?.blogPhoto)
      }

      if(crudFrom.formValues.photoStatus){
        setAdvertImageStatus(crudFrom.formValues.photoStatus)
      }
    }
  }, [stepValue])

  // delete image
  const deleteImage = (name) => {
    const findImgIndex = propertySelectedImgs.findIndex((f) => f.name === name);
    if (findImgIndex > -1) {
      const tmpImgArr = [...advertImageStatus];
      tmpImgArr.splice(Number(findImgIndex), 1);
      if (tmpImgArr.length) {
        const newStatusArr = tmpImgArr.map((i, k) => ({ label: `image_${k + 1}`, status: i.status }))
        setAdvertImageStatus(newStatusArr)
      } else {
        setAdvertImageStatus([])
      }

    }
    const deleted = propertySelectedImgs?.filter((file) => file.name !== name);
    setPropertySelectedImgs(deleted);
  };

  useEffect(() => {
    if (propertySelectedImgs.length > 0) {
      setValues((prev) => ({ ...prev, blogPhoto: propertySelectedImgs }));
      dispatch(updateField({ field: "blogPhoto", value: propertySelectedImgs }));
    }

  }, [propertySelectedImgs]);


  useEffect(() => {
    if (advertImageStatus.length > 0) {
      setValues((prev) => ({ ...prev, photoStatus: advertImageStatus }));
      dispatch(updateField({ field: "photoStatus", value: advertImageStatus }));
    }

  }, [advertImageStatus]);


  const checkImageStatus = (img) => {
    if (advertImageStatus.length) {
      const targetStatus = advertImageStatus.find(i => i.label === img);
      return targetStatus ? targetStatus.status : false;
    }
    return false
  }


  const toggleImageStatus = (img) => {
    if (advertImageStatus.length) {
      const oldStatusList = [];

      advertImageStatus.map(ad => {
        if (ad.label === img) {
          oldStatusList.push({
            label: ad.label,
            status: !ad.status
          })
        } else {
          oldStatusList.push(ad)
        }
      })
      setAdvertImageStatus(oldStatusList)
    }

  }




  return (
    <>
      <Toaster
        position="top-right"
        containerClassName=""
        containerStyle={{}}
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

      <div className="row">
        <div className="col-lg-12">
          <ul className="mb-0">
            {/* Yüklenen resimleri göstermek için */}
            {propertySelectedImgs.length > 0
              ? propertySelectedImgs?.map((item, index) => (
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
                    <div
                      className="edu_stats_list"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={checkImageStatus(`image_${index + 1}`) ? "Gizle" : "Göster"}
                      data-original-title="Delete"
                      style={{ right: "75px" }}
                    >
                      <a onClick={() => toggleImageStatus(`image_${index + 1}`)}>
                        {checkImageStatus(`image_${index + 1}`) ?
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="white" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.25C7.48587 3.25 4.44529 5.9542 2.68057 8.24686L2.64874 8.2882C2.24964 8.80653 1.88206 9.28392 1.63269 9.8484C1.36564 10.4529 1.25 11.1117 1.25 12C1.25 12.8883 1.36564 13.5471 1.63269 14.1516C1.88206 14.7161 2.24964 15.1935 2.64875 15.7118L2.68057 15.7531C4.44529 18.0458 7.48587 20.75 12 20.75C16.5141 20.75 19.5547 18.0458 21.3194 15.7531L21.3512 15.7118C21.7504 15.1935 22.1179 14.7161 22.3673 14.1516C22.6344 13.5471 22.75 12.8883 22.75 12C22.75 11.1117 22.6344 10.4529 22.3673 9.8484C22.1179 9.28391 21.7504 8.80652 21.3512 8.28818L21.3194 8.24686C19.5547 5.9542 16.5141 3.25 12 3.25ZM3.86922 9.1618C5.49864 7.04492 8.15036 4.75 12 4.75C15.8496 4.75 18.5014 7.04492 20.1308 9.1618C20.5694 9.73159 20.8263 10.0721 20.9952 10.4545C21.1532 10.812 21.25 11.2489 21.25 12C21.25 12.7511 21.1532 13.188 20.9952 13.5455C20.8263 13.9279 20.5694 14.2684 20.1308 14.8382C18.5014 16.9551 15.8496 19.25 12 19.25C8.15036 19.25 5.49864 16.9551 3.86922 14.8382C3.43064 14.2684 3.17374 13.9279 3.00476 13.5455C2.84684 13.188 2.75 12.7511 2.75 12C2.75 11.2489 2.84684 10.812 3.00476 10.4545C3.17374 10.0721 3.43063 9.73159 3.86922 9.1618Z" fill="white" />
                          </svg>
                          :
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.68936 6.70456C2.52619 6.32384 2.08528 6.14747 1.70456 6.31064C1.32384 6.47381 1.14747 6.91472 1.31064 7.29544L2.68936 6.70456ZM15.5872 13.3287L15.3125 12.6308L15.5872 13.3287ZM9.04145 13.7377C9.26736 13.3906 9.16904 12.926 8.82185 12.7001C8.47466 12.4742 8.01008 12.5725 7.78417 12.9197L9.04145 13.7377ZM6.37136 15.091C6.14545 15.4381 6.24377 15.9027 6.59096 16.1286C6.93815 16.3545 7.40273 16.2562 7.62864 15.909L6.37136 15.091ZM22.6894 7.29544C22.8525 6.91472 22.6762 6.47381 22.2954 6.31064C21.9147 6.14747 21.4738 6.32384 21.3106 6.70456L22.6894 7.29544ZM19 11.1288L18.4867 10.582V10.582L19 11.1288ZM19.9697 13.1592C20.2626 13.4521 20.7374 13.4521 21.0303 13.1592C21.3232 12.8663 21.3232 12.3914 21.0303 12.0985L19.9697 13.1592ZM11.25 16.5C11.25 16.9142 11.5858 17.25 12 17.25C12.4142 17.25 12.75 16.9142 12.75 16.5H11.25ZM16.3714 15.909C16.5973 16.2562 17.0619 16.3545 17.409 16.1286C17.7562 15.9027 17.8545 15.4381 17.6286 15.091L16.3714 15.909ZM5.53033 11.6592C5.82322 11.3663 5.82322 10.8914 5.53033 10.5985C5.23744 10.3056 4.76256 10.3056 4.46967 10.5985L5.53033 11.6592ZM2.96967 12.0985C2.67678 12.3914 2.67678 12.8663 2.96967 13.1592C3.26256 13.4521 3.73744 13.4521 4.03033 13.1592L2.96967 12.0985ZM12 13.25C8.77611 13.25 6.46133 11.6446 4.9246 9.98966C4.15645 9.16243 3.59325 8.33284 3.22259 7.71014C3.03769 7.3995 2.90187 7.14232 2.8134 6.96537C2.76919 6.87696 2.73689 6.80875 2.71627 6.76411C2.70597 6.7418 2.69859 6.7254 2.69411 6.71533C2.69187 6.7103 2.69036 6.70684 2.68957 6.70503C2.68917 6.70413 2.68896 6.70363 2.68892 6.70355C2.68891 6.70351 2.68893 6.70357 2.68901 6.70374C2.68904 6.70382 2.68913 6.70403 2.68915 6.70407C2.68925 6.7043 2.68936 6.70456 2 7C1.31064 7.29544 1.31077 7.29575 1.31092 7.29609C1.31098 7.29624 1.31114 7.2966 1.31127 7.2969C1.31152 7.29749 1.31183 7.2982 1.31218 7.299C1.31287 7.30062 1.31376 7.30266 1.31483 7.30512C1.31698 7.31003 1.31988 7.31662 1.32353 7.32483C1.33083 7.34125 1.34115 7.36415 1.35453 7.39311C1.38127 7.45102 1.42026 7.5332 1.47176 7.63619C1.57469 7.84206 1.72794 8.13175 1.93366 8.47736C2.34425 9.16716 2.96855 10.0876 3.8254 11.0103C5.53867 12.8554 8.22389 14.75 12 14.75V13.25ZM15.3125 12.6308C14.3421 13.0128 13.2417 13.25 12 13.25V14.75C13.4382 14.75 14.7246 14.4742 15.8619 14.0266L15.3125 12.6308ZM7.78417 12.9197L6.37136 15.091L7.62864 15.909L9.04145 13.7377L7.78417 12.9197ZM22 7C21.3106 6.70456 21.3107 6.70441 21.3108 6.70427C21.3108 6.70423 21.3108 6.7041 21.3109 6.70402C21.3109 6.70388 21.311 6.70376 21.311 6.70368C21.3111 6.70352 21.3111 6.70349 21.3111 6.7036C21.311 6.7038 21.3107 6.70452 21.3101 6.70576C21.309 6.70823 21.307 6.71275 21.3041 6.71924C21.2983 6.73223 21.2889 6.75309 21.2758 6.78125C21.2495 6.83757 21.2086 6.92295 21.1526 7.03267C21.0406 7.25227 20.869 7.56831 20.6354 7.9432C20.1669 8.69516 19.4563 9.67197 18.4867 10.582L19.5133 11.6757C20.6023 10.6535 21.3917 9.56587 21.9085 8.73646C22.1676 8.32068 22.36 7.9668 22.4889 7.71415C22.5533 7.58775 22.602 7.48643 22.6353 7.41507C22.6519 7.37939 22.6647 7.35118 22.6737 7.33104C22.6782 7.32097 22.6818 7.31292 22.6844 7.30696C22.6857 7.30398 22.6867 7.30153 22.6876 7.2996C22.688 7.29864 22.6883 7.29781 22.6886 7.29712C22.6888 7.29677 22.6889 7.29646 22.689 7.29618C22.6891 7.29604 22.6892 7.29585 22.6892 7.29578C22.6893 7.29561 22.6894 7.29544 22 7ZM18.4867 10.582C17.6277 11.3882 16.5739 12.1343 15.3125 12.6308L15.8619 14.0266C17.3355 13.4466 18.5466 12.583 19.5133 11.6757L18.4867 10.582ZM18.4697 11.6592L19.9697 13.1592L21.0303 12.0985L19.5303 10.5985L18.4697 11.6592ZM11.25 14V16.5H12.75V14H11.25ZM14.9586 13.7377L16.3714 15.909L17.6286 15.091L16.2158 12.9197L14.9586 13.7377ZM4.46967 10.5985L2.96967 12.0985L4.03033 13.1592L5.53033 11.6592L4.46967 10.5985Z" fill="#1C274C" />
                          </svg>}


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

        <div className="col-lg-12">
          <div className="portfolio_upload">
            <input
              type="file"
              onChange={multipleImage}
              multiple
              accept="image/png, image/gif, image/jpeg image/jpg"
            />
            <div className="icon">
              <span className="flaticon-download"></span>
            </div>
            <p>Yüklemek istediğiniz resimleri sürükleyiniz</p>
          </div>
        </div>
        {/* End .col */}

        <div className="col-12">
          <div className="resume_uploader mb30">
            {/* <h3>Eklenenler</h3> */}
            <form className="form-inline d-flex gap-3 flex-wrap wrap align-content-center justify-content-center">
              {/* <input className="upload-path" /> */}
              <label className="upload">
                <input type="file" onChange={multipleImage} />
                Resim Seçin
              </label>
            </form>
          </div>
        </div>
        {/* End .col */}

        {/* End .col */}
      </div>
    </>
  );
};

export default PropertyMediaUploader;
