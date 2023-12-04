import Image from "next/image";
import { useEffect,useState } from "react";
import dateFormatter from "../../../utils/dateFormatter";

const SignleChatboxReply = ({messages}) => {
 
  const [message, setMessage ] = useState([])
  useEffect (() => {
    if(messages?.length) {
      setMessage(messages)
    }else {
      setMessage([])
    }
  }, [messages])

  return (
    <>
    {message.map((msg, i) => (
        <li className="media sent" key={i} >

          <div className="row" style={{ width: "100%" }}>
            <div className="col">
              {msg.type === "coming" && <>
                <div className="row">
                  <div className="col"> <div className="media-body">
                    <div className="date_time">{dateFormatter(msg.createdAt)}</div>
                    <p>{msg?.text}</p>
                  </div></div>
                </div>
              </>}
              
              </div>
            <div className="col">
              {msg.type === "going" && <div className="media reply first">
              <div className="media-body text-right">
                <div className="date_time">{dateFormatter(msg.createdAt)}</div>
                <p>{msg?.text}</p>
              </div>
            </div>
            }</div>
          </div>



        </li>
      ))}

      {/* {message.map((msg,i) => (
        <li className="media sent" key={i}>
          <span className="contact-status busy"></span>
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6"></div>
          </div>
 
          <Image
            width={57}
            height={57}
            className="img-fluid align-self-start mr-3"
            src="/assets/images/team/s6.jpg"
            alt="s6.jpg"
          />
          <div className="media-body">
            <div className="date_time">Today, 10:51</div>
            <p>{msg?.text}</p>
          </div>
          
         {msg.type === "going" && <div className="media reply first">
            <div className="media-body text-right">
              <div className="date_time">Today, 10:35</div>
              <p>{msg?.text}eee</p>
            </div>
          </div>
}
        </li>
      ))} */}
      

    </>
  );
};

export default SignleChatboxReply;
