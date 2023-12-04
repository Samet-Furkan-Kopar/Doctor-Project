import SearchUser from "./SearchUser";
import SingleUser from "./SingleUser";

const InboxUser = ({search,setSearch, user, getUserMessages }) => {
  return (
    <div className="inbox_user_list">
      <div className="iu_heading">
        <div className="candidate_revew_search_box">
          <SearchUser search={search} setSearch={setSearch} />
        </div>
      </div>
      {/* iu_heading */}

      <ul>
        <SingleUser  user={user} getUserMessages={getUserMessages}  />
      </ul>
    </div>
  );
};

export default InboxUser;
