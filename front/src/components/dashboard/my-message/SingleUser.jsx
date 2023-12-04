import Image from "next/image";
import { useEffect, useState } from "react";
import imageLoader from "../../../utils/imageLoader";
import Logo from "../../../../public/assets/images/logo/logo.jpg";


const SingleUser = ({ user, getUserMessages }) => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    setUsers(user)
  }, [user])


  return (
    <>
      {users?.map((user, i) => (
        <li className="contact" key={i} onClick={() => getUserMessages(user?.conversationId, user?.advertId)}>
          <a href="#">
            <div className="wrap">
              <Image
                loader={imageLoader}
                width={50}
                height={50}
                className="img-fluid"
                src={user?.advisorProfilePhoto !== '' ? user?.advisorProfilePhoto : Logo}
                alt="s1.jpg"
              />
              <div className="meta">
                <h5 className="name">{user?.advert_info?.adverTitle || "İlan İsmi Bulunamadı"}</h5>
                <p className="preview">{user?.userName || "Kullanıcı Adına Ulaşılamadı"}</p>
              </div>
              <div className={user?.lastMessage}>
                {user?.lastMessage}
              </div>
            </div>
          </a>
        </li>
      ))}
    </>
  );
};

export default SingleUser;
