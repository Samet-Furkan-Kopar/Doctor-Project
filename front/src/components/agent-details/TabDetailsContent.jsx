import { useRouter } from "next/router";
import Team from "../agent-view/agent-v2/Team";
import Comments from "../blog-details/Comments";
import Ratings from "../blog-details/Ratings";
import ReviewBox from "../blog-details/ReviewBox";
import DescriptionsText from "./DescriptionsText";
import Listings from "./Listings";
import { getCurrentUser } from "../../utils/auth";

const TabDetailsContent = ({ officeDataDetail }) => {
  console.log(officeDataDetail);
  const currentUser = getCurrentUser();

  return (
    <>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            data-bs-toggle="tab"
            href="#description"
            role="tab"
            aria-controls="description"
            aria-selected="true"
          >
            Açıklama
          </a>
        </li>
        {/* End Description tab */}

       {currentUser && currentUser?.type === "doctor" ? " ":<li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#listing"
            role="tab"
            aria-controls="listing"
            aria-selected="false"
          >
            Randevu
          </a>
        </li>}
        {/* End Listing tab */}

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-toggle="tab"
            href="#agetns"
            role="tab"
            aria-controls="listing"
            aria-selected="false"
          >
            Temsilciler
          </a>
        </li>
        {/* End Listing tab */}
      </ul>
      {/* End .nav nav-tabs */}

      <div className="tab-content" id="myTabContent2">
        <div
          className="tab-pane fade show active"
          id="description"
          role="tabpanel"
        >
          <div className="product_single_content">
            <div className="mbp_pagination_comments">
              <div className="mbp_first media">
                <div className="media-body agent-desc">
                  <DescriptionsText officeDataDetail={officeDataDetail} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Description details content*/}
 
        <div
          className="tab-pane fade row pl15 pl0-1199 pr15 pr0-1199"
          id="listing"
          role="tabpanel"
        >
          <Listings officeDataDetail={officeDataDetail} />
        </div>
        {/* End Listing details content*/}

        <div
          className="tab-pane fade row pl15 pl0-1199 pr15 pr0-1199"
          id="agetns"
          role="tabpanel"
        >
          <div className="row  mt30">
            <Team officeDataDetail={officeDataDetail}/>
          </div>
        </div>
        {/* End aget team content*/}
      </div>
      {/* End tab-content */}
    </>
  );
};

export default TabDetailsContent;
