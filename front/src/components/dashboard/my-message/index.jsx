"use client";
import { useState, useEffect } from "react";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import ChatBox from "./ChatBox";
import chatMessageServices from "../../../services/chat.message";
import { io } from 'socket.io-client';
import toast, { Toaster } from "react-hot-toast";


const Index = ({ id }) => {

  //id && post işlemi yapmak gerek // advertId ile post yapcaz galiba
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);
  const [messages, setMessage] = useState([]);
  const [socket, setSocket] = useState(null);
  // const [postData, setPostData] = useState("");
  const [advertId, setAdvertId] = useState('');
  const [conversationId, setConversationId] = useState('');
  const [senderId, setSenderId] = useState('');
  const [incomingMsg, setIncomingMsg] = useState(null)

  const getConversationList = () => {
    chatMessageServices.getUsers(search).then((res) => {
      if(res?.data){
        setUser(res?.data)
      }

    })
  } 
  // useEffect(() => {

  //   if(id){
  //     setAdvertId(id) 
  //     getUserMessages('', id)
  //   }
  //   // id varsa advertId ye ata
  // }, [id])//sadece advertId ile gönderebiliyorsun ama karşıdan mesaj gelmesi için sender ve conversation idlerde lazım
 

  const getUserMessages = (conversationId) => {
    chatMessageServices.getMessage(conversationId).then((res) => {
      if(res?.data){
        setMessage(res?.data);
        setAdvertId(advertId);
        setConversationId(conversationId);
        for (const i of res?.data) {
          if (i.type === "coming") {
            setSenderId(i.senderId)
            break;
          }
        }
      }
    })
  }


  useEffect(() => {
    setSocket(io("http://localhost:8800"))
  }, [])


  const postMessage = (msg) => {
    const fd = new FormData();
    fd.append("text", msg);
    fd.append("receiverId", id);  
    conversationId && fd.append("conversationId", conversationId);
    chatMessageServices.postMessage(fd).then((res) => { 
      if (res?.succeded) {
        console.log(res?.data);
        setConversationId(res?.data?.conversationId)
        setSenderId(res?.data?.receiverId)
        let obj = { 
          text: res?.data?.text || "",
          type: "going",
          createdAt: Date.now(),
          conversationId: res?.data?.conversationId,
        }
        setMessage([...messages, obj])
      }
    })
  }

  useEffect(() => {
    getConversationList()
  }, [search])// /mesajlarim ile gelenler kullanıcılara ulaşamıyr   ,conservationId vardı
  useEffect(() => {
    getConversationList()
  }, [search, conversationId])


  const addNewMessageToSelUser = (data) => { 
    let msgs = []

    console.log(senderId,data?.message?.senderId,conversationId,data?.message?.conversationId);
    if (data?.message?.senderId === senderId && data?.message?.conversationId === conversationId &&  (msgs?.length > 0 ? (msgs[0]?._id !== data?.message?._id) : (true))) {
      let newMessage = {
        _id: data?.message?._id || "",
        text: data?.message?.text || "",
        type: "coming",
        senderId: data?.message?.senderId || "",
        createdAt: data?.message?.createdAt || "",
        conversationId: data?.message?.conversationId || "",
        // advertId: data?.message?.advertId || "",
      };
      msgs.push(newMessage)

      setMessage((prev) => [...prev, newMessage])
      setIncomingMsg(null)

    }
  }


  useEffect(() => {
    if (incomingMsg) {
     
      addNewMessageToSelUser(incomingMsg)
    }

  }, [incomingMsg])



  useEffect(() => {

    socket?.on('connect', () => {

    });

    socket?.on("chat", (data) => {

      if (data && data?.message) {
        setIncomingMsg(data)
      }
    })

  }, [socket])


  return (
    <>
  
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">Mesajlarım</h2>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <ChatBox id={id} search={search} setSearch={setSearch} user={user} senderId={senderId} getUserMessages={getUserMessages} messages={messages} conversationId={conversationId} advertId={advertId} postMessage={postMessage} />
              {/* End message box */}

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>
                      &copy; {new Date().getFullYear()} Designed by{" "}
                      <a
                        href="https://www.sozlesmeliemlak.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Sözleşmeli Emlak
                      </a>
                      . All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
