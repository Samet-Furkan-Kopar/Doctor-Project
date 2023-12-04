import ContactWithAgent from "../common/agent-view/ContactWithAgent";
import Categorie from "../common/listing/Categorie";
import ListingCreator from "../common/listing/ListingCreator";
import FeaturedListings from "../common/listing/FeaturedListings";
import FeatureProperties from "../common/listing/FeatureProperties";
import Image from "next/image";
import imageLoader from "../../utils/imageLoader";

const Sidebar = ({ property, advertType, setAdvertType }) => {
  return (
    <>
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <div className="vip-icon" onClick={() => {
            if(advertType === 'standart'){
              setAdvertType('vip')
            }else {
              setAdvertType('standart')
            }
          }}>
            <i class="fa fa-bookmark"></i>
          </div>
          <div className="sl_creator">
            <h4 className="mb25">Tarafından</h4>
            <ListingCreator property={property?.data} advertType={advertType} />
          </div>
          {/* End .sl_creator */}
        </div>
      </div>
      {/* End .sidebar_listing_list */}

      {property.isVitrinData && property.isVitrinData.length > 0 && (
        <div className="terms_condition_widget">
          <h4 className="title">Popüler ilanlar</h4>
          <div className="sidebar_feature_property_slider">
            <FeatureProperties property={property} />
          </div>
        </div>
      )}

      {/* End .Featured Properties */}

      <div className="terms_condition_widget">
        <h4 className="title">İlan Kategorileri</h4>
        <div className="widget_list">
          <ul className="list_details">
            <Categorie officeDataDetail={property} />
          </ul>
        </div>
      </div>
      {/* End .Categories Property */}

      {/* End .Recently Viewed */}
    </>
  );
};

export default Sidebar;
