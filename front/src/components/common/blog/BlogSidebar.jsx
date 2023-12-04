import Categories from "./Categories";
import FeaturedListings from "../listing/FeaturedListings";
import SearchBox from "./SearchBox";
import TagList from "./TagList";

const BlogSidebar = ({ features, vitrinAdvert }) => {
  return (
    <div className="blog-sidebar_widgets">
      {/* End .sidebar_search_widget */}

      <div className="terms_condition_widget">
        <h4 className="title">İlan Kategorileri</h4>
        <div className="widget_list">
          <Categories features={features} />
        </div>
      </div>
      {/* End .Categories widget */}
      {vitrinAdvert && vitrinAdvert?.lengt > 0 &&

        <div className="sidebar_feature_listing">
          <h4 className="title">Vitrin İlanları</h4>
          <FeaturedListings vitrinAdvert={vitrinAdvert} />
        </div>
      }

      {/* End .blog_tag_widget */}
    </div>
  );
};

export default BlogSidebar;
