import Image from "next/image";
import imageLoader from "../../../utils/imageLoader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser, getPresentationStatus } from "../../../utils/auth";

const Creaator = ({ property, advertType, sendMsgStatus }) => {
  console.log(property);
  const state = useSelector((state) => state);
  const [phoneNumber, setPhoneNumber] = useState('')
  const [emailAddress, setEmailAddress] = useState('')

  useEffect(() => {
    if (state?.generalSettings?.data?.settings && Object.keys(state.generalSettings?.data?.settings).length) {
      state.generalSettings?.data?.settings.phone && setPhoneNumber(state.generalSettings?.data?.settings.phone)
      state.generalSettings?.data?.settings.email && setEmailAddress(state.generalSettings?.data?.settings.email)
    }
  }, [state])

  const presentationStatus = getPresentationStatus()
  const presentationMode = useSelector((state) => state.presentationMode);
  const [presentMode, setPresentMode] = useState(false)
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (presentationMode?.data?.status || presentationStatus?.status) {
      setPresentMode(true)
    } else {
      setPresentMode(false)
    }
  }, [presentationMode])

  return (
    <>
      {advertType === 'vip' ?
        <div className="media d-flex">
          <Image
            loader={imageLoader}
            width={90}
            height={90}
            className="me-3"
            src="/assets/images/logo/logo-short.png"
            alt="lc1.png"
          />
          <div className="media-body d-flex align-items-center">
            <h5 className="mt-0 mb0">
              Sözleşmeli Emlak
            </h5>
          </div>
        </div> :
        <div className="media d-flex flex-column">
          <div className="d-flex">
            {presentMode ?
              <Image
                loader={imageLoader}
                width={90}
                height={90}
                className="me-3"
                src={property?.image || '/assets/images/logo/logo-short.png'}
                alt={property?.firstName +" "+property.lastName || ''}
              /> :
              <Image
                loader={imageLoader}
                width={90}
                height={90}
                className="me-3"
                src={
                  property?.image ||
                  "/assets/images/logo/logo-short.png"
                }
                alt={property?.image || "-"}
              />
            }
            <div className="media-body">
              {presentMode ?
                <>
                  <h5 className="mt-0 mb0">
                    {property?.firstName +" "+property.lastName|| "-"}
                  </h5>
                  <p className="mb0">
                    {property?.phoneNumber || "-"}
                  </p>
                  <p className="mb0">
                    {currentUser?.email || "-"}
                  </p>
                </> :
                <>
                  <h5 className="mt-0 mb0">
                    {property?.advertDetail?.ownerName.options || "-"}
                  </h5>
                  <p className="mb0">
                    {property?.advertDetail?.ownerPhoneNumber.options || "-"}
                  </p>
                  <p className="mb0">
                    {property?.advertDetail?.ownerEmail.options || "-"}
                  </p>
                </>
              }
            </div>
          </div>

          {sendMsgStatus && !presentMode && 
            <div className="row d-flex justify-content-center media-footer w-100">
              <Link
                href={`/ilana-yaz/${property?._id}`}
                className="d-block mx-auto text-center"
              >
                Mesaj Gönder
              </Link>
            </div>
          }
        </div>


      }
    </>
  );
};

export default Creaator;
