import Link from "next/link";
import featureContent from "../../../data/properties";
import Image from "next/image";
import Logo from "../../../../public/assets/images/logo/logo-short.png";
import imageLoader from "../../../utils/imageLoader";

const FeaturedListings = ({ vitrinAdvert }) => {
  console.log(vitrinAdvert);
  return (
    <>
      {vitrinAdvert && vitrinAdvert.length > 0 ? (
        vitrinAdvert.map((item) => (
          <div className="media d-flex" key={item._id}>
            <Link href={`/ilan-detay/${item.advertNo}`}>
              <Image
                loader={imageLoader}
                width={102}
                height={80}
                className="align-self-start me-3 w-100 h-100 cover"
                src={item.coverPhoto || Logo}
                alt="Vitrin İlanları"
              />
            </Link>

            <div className="media-body">
              <h5 className="mt-0 post_title">
                <Link href={`/ilan-detay/${item.advertNo}`}>
                  {item.adverTitle}
                </Link>
              </h5>
              <Link href={`/ilan-detay/${item.advertNo}`}>
                {item.advertPrice} ₺
              </Link>

              <ul className="mb0">
              </ul>
            </div>
          </div>
        ))
      ) : (
        <div>Yükleniyor...</div>
      )}
    </>
  );
};

export default FeaturedListings;