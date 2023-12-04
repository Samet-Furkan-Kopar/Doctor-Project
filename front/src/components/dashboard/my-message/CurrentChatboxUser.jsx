import Image from "next/image";

const CurrentChatboxUser = () => {
  return (
    <div className="user_heading">
      <a href="#">
        <div className="wrap">
          <span className="contact-status online"></span>
          <Image
            width={45}
            height={45}
            className="img-fluid"
            src="/assets/images/team/s5.jpg"
            alt="s5.jpg"
          />
          <div className="meta">
            <h5 className="name">Joanne Davies</h5>
            <p className="preview">was online today at 11:43</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default CurrentChatboxUser;
