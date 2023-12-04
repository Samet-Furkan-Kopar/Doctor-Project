import ChatboxContent from "./ChatboxContent";
import InboxUser from "./InboxUser";

const ChatBox = ({search, setSearch, user, getUserMessages,messages,conversationId,advertId,postMessage,senderId}) => {

  return (
    <div className="row" >
      <div className="col-lg-5 col-xl-4">
        <div className="message_container">
          <InboxUser search={search} setSearch={setSearch} user={user} getUserMessages={getUserMessages} />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-7 col-xl-8">
        <div className="message_container">
          <ChatboxContent  messages={messages} advertId={advertId} conversationId={conversationId} senderId={senderId} postMessage={postMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
