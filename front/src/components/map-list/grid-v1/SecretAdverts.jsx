import Image from "next/image";
import Link from "next/link";
import imageLoader from "../../../utils/imageLoader";
import createAddresStr from "../../../utils/createAddresStr";
import currencyFormatter from "currency-formatter"

const SecretAdverts = ({ adverts }) => {

  return (
    <div className="row">
      {adverts.length > 0 && (
        adverts.map((item) => (
          <Link
            href={`/ilan-detay/${item.advertNo}`}
            className="col-12"
            key={item.advertNo}
          >
            <div
              className={`feat_property home7 style4 mb-1`}
            >
              <div className="thumb">
                <Image
                  loader={imageLoader}
                  width={300}
                  height={220}
                  className="img-whp w-100 h-100 contain"
                  src={
                    item?.advertCoverPhoto ||
                    "/assets/images/logo/logo-short.png"
                  }
                  alt={item.advertTitle || ''}
                />
                <div className="thmb_cntnt">
                  <ul className="tag mb0">
                    {item?.processName &&
                      <li className="list-inline-item">
                        <a href="#" className="text-capitalize">
                          {item?.processName}
                        </a>
                      </li>
                    }
                  </ul>

                  <Link
                    href={`/ilan-detay/${item.advertNo}`}
                    className="fp_price"
                  >
                    {currencyFormatter.format(item?.advertPrice, { thousand: '.', precision: 0 }) || "-"} TL
                  </Link>
                </div>
              </div>
              <div className="details">
                <div className="tc_content">
                  <p className="text-thm">{item?.advertNo || ''}</p>
                  <h4>
                    <Link href={`/ilan-detay/${item?.advertNo}`}>
                      {item.advertTitle || ''}
                    </Link>
                  </h4>
                  <p className="grid-address">
                    <span className="flaticon-placeholder"></span>
                    {createAddresStr(item?.country, item?.city, item?.district, item?.neighbourhood) || "-"}
                  </p>
                </div>
                {/* End .tc_content */}
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default SecretAdverts;
