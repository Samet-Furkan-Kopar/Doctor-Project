"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { isSinglePageActive } from "../../../../utils/daynamicNavigation";
import Image from "next/image";
import { getCurrentUser, getPresentationStatus, logoutFromSystem } from "../../../../utils/auth";
import { useEffect, useState } from "react";
import imageLoader from "../../../../utils/imageLoader";
import { useSelector } from "react-redux";

const MyAccount = ({ currentUser }) => {

  const presentationStatus = getPresentationStatus()
  const presentationMode = useSelector((state) => state.presentationMode);

  const [status, setStatus] = useState(false)

  useEffect(() => {
    if (presentationMode?.data?.status || presentationStatus?.status) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [presentationMode])

  const [checkOfficial, setCheckOfficial] = useState(false)
  useEffect(() => {
    if (currentUser && currentUser?.type === 'doctor') {
      setCheckOfficial(true)
    } else if (currentUser && currentUser?.type === 'doctor') {
      setCheckOfficial(true)
    }
  }, [currentUser])



  const [profileMenuItems, setProfileMenuItems] = useState([
    { id: 1, name: " Dashboard", ruterPath: "/dashboard" },
    { id: 2, name: currentUser?.type === 'doctor' && "Bloglarım", ruterPath: "/bloglarim" },
    { id: 3, name: " Profilim", ruterPath: "/profilim" },
    { id: 4, name: currentUser?.type === 'doctor' ? "Randevu Talepleri" : "Randevularım", ruterPath: "/randevu" },
    { id: 5, name: currentUser?.type === 'doctor' ? "Ofis Mesajları" : "Mesajlarım", ruterPath: "/mesajlarim" },
  ])


  // useEffect(() => {
  //   currentUser && currentUser?.type === 'doctor' && !profileMenuItems.find(i => i.id === 5) && setProfileMenuItems((prev) => [...prev, { id: 5, name: " Ofis Mesajları", ruterPath: "/mesajlarim" }])
  // }, [currentUser])

  const route = useRouter();

  return (
    <>
      <div className="user_set_header">
        {!currentUser?.image_url ? (
          <Image
            loader={imageLoader}
            width={40}
            height={40}
            className="float-start"
            src="/assets/images/dashboard/avatar-icon.png"
            alt="e1.png"
          />
        ) : (
          <Image
            loader={imageLoader}
            width={40}
            height={40}
            className="float-start"
            alt="e1.png"
            src={currentUser?.image_url}
          />
        )}
        <p>
          {currentUser?.firstName +" "+currentUser.lastName} <br />
          <span className="address">{currentUser?.email}</span>
          <br />
          {/* {checkOfficial && 
            <span className="address d-flex align-items-center">Sunum Modu
              <Image
                loader={imageLoader}
                width={20}
                height={20}
                className="float-start"
                src={status ? "/assets/images/icons8-green-circle-48.png" : "/assets/images/icons8-red-48.png"}
                alt="e1.png"
              />
            </span>
          } */}
        </p>
      </div>
      {/* End user_set_header */}

      <div className="user_setting_content ">
        {profileMenuItems.map((item) => (
          <Link
            href={item.ruterPath}
            key={item.id}
            className="dropdown-item"
            style={
              isSinglePageActive(`${item.ruterPath}`, route.pathname)
                ? { color: "#ff5a5f" }
                : undefined
            }
          >
            <div className="text-dark">{item.name}</div>
          </Link>
        ))}
        <Link
          href="#" onClick={() => logoutFromSystem()}
          className="dropdown-item"
        >
          <div className="text-dark">Çıkış Yap</div>
        </Link>
      </div>
    </>
  );
};

export default MyAccount;
