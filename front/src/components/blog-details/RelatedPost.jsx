import Link from "next/link";
import relatedPostContent from "../../data/blogs";
import Image from "next/image";
import dateFormatter from "../../utils/dateFormatter"
import imageLoader from "../../utils/imageLoader";
const RelatedPost = ({ randomBlog }) => {

  return (
    <>
      {randomBlog && randomBlog.length > 0 ? (
        randomBlog.slice(0, 2).map((item) => (
          <div className="col-md-6 col-lg-6" key={item.seoUrl}>
            <div className="for_blog feat_property">
              <div className="thumb">
                <Link href={`/blog-details/${item.seoUrl}`}>
                  <Image
                    loader={imageLoader}
                    width={343}
                    height={220}
                    className="img-whp w-100 h-100 cover"
                    src={item.coverPhoto}
                    alt={item.alt_text[0]}
                  />
                </Link>
              </div>
              <div className="details">
                <div className="tc_content">
                  <h4>
                    <Link href={`/blog-details/${item.seoUrl}`}>
                      {item.title}
                    </Link>
                  </h4>
                  <ul className="bpg_meta">
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="flaticon-calendar"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">{dateFormatter(item.updatedAt)}</a>
                    </li>
                  </ul>
                  <p>{item.short_decription.slice(0, 65)}</p>
                </div>
                {/* End . tc_content */}

                <div className="fp_footer">
                  <a className="fp_pdate float-end text-thm" href="#">
                    Daha Fazla <span className="flaticon-next"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Yükleniyor...</div>
      )}
    </>
  );
};

export default RelatedPost;
