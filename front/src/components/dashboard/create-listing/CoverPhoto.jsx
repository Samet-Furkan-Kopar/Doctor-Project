import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { IoMdPhotos } from "react-icons/io";
import selectedFiles from "../../../utils/selectedFiles";
import imageLoader from "../../../utils/imageLoader";

export default function CoverPhoto({
  errors,
  handleChange,
  handleBlur,
  touched,
  setValues,
  values,
}) {
  const [coverImage, setCoverImage] = useState(null);

  const setAsCoverImage = (e) => {
    setCoverImage(selectedFiles(e));
    console.log("Kapak Fotoğrafı : ", coverImage);

    if (coverImage) {
      setValues((prev) => ({
        ...prev,
        coverPhoto: coverImage,
      }));
    }
  };

  const deleteImage = (name) => {
    const deleted = coverImage?.filter((file) => file.name !== name);
    setCoverImage(deleted);
  };

  useEffect(() => {
    if (coverImage) {
      setValues((prev) => ({ ...prev, coverPhoto: coverImage }));
    }
  }, [coverImage]);

  return (
    <div>
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

        <div className="col-lg-12">
          <div className="portfolio_upload">
            <input
              type="file"
              onChange={setAsCoverImage}
              multiple
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
    </div>
  );
}


