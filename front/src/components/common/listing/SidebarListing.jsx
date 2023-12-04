import Categorie from "./Categorie";
import FeaturedListings from "./FeaturedListings";
import FilteringItem from "./FilteringItem";

const SidebarListing = () => {
  return (
    <div className="sidebar_listing_grid1">
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <FilteringItem />
        </div>
      </div>
      {/* End .sidebar_listing_list */}

    </div>
  );
};

export default SidebarListing;
