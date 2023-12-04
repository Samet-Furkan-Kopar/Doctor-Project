import ContactWithAgent from "../../components/common/agent-view/ContactWithAgent";
import Categorie from "../../components/common/listing/Categorie";
import FeatureProperties from "../../components/common/listing/FeatureProperties";

const SidebarListings = ({ officeDataDetail }) => {
  console.log(officeDataDetail);
  return (
    <div className="sidebar_listing_grid1">
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <h4 className="mb25">Bizimle İletişime Geçin</h4>
          <ContactWithAgent />
        </div>
      </div>
      {/* End filter and search area */}
      {officeDataDetail?.isVitrinData?.length == 0 ? (
        <div className="terms_condition_widget style_two-pro">
          <h4 className="title">Öne Çıkan İlanlar</h4>
          <FeatureProperties officeDataDetail={officeDataDetail} />
        </div>
      ) : null}
      {/* End Recently Viewed widget */}
    </div>
  );
};

export default SidebarListings;
