import Swal from "sweetalert2";
import SignleChatboxReply from "./SignleChatboxReply";
import { useState } from "react";

const ChatboxContent = ({id, messages, postMessage, senderId, conversationId, advertId }) => {
  const [postData, setPostData] = useState("");
  // const shouldShowSendButton = senderId && conversationId;
  console.log();
  let shouldShowSendButton;
  if (conversationId || id) {
    shouldShowSendButton = true
  }
  return (
    <>
      <div className="inbox_chatting_box">
        <ul className="chatting_content">
          <SignleChatboxReply messages={messages} />
        </ul>
      </div>
      {/* End inbox_chatting_box */}

      {shouldShowSendButton && (
        <div className="mi_text" style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <div className="message_input">
            <form className="form-inline position-relative">
              <textarea
                className="form-control"
                placeholder="Mesajınızı yazınız..."
                cols="20"
                rows="1"
                wrap="hard"
                value={postData}
                onChange={(e) => setPostData(e.target.value)}
                required
              />
              <button className="btn" type="button" onClick={() => {
                if (postData) {
                  postMessage(postData);
                  setPostData('');
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Mesaj boş olamaz!",
                  });
                }
              }}>
                Mesaj Gönder
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatboxContent;
