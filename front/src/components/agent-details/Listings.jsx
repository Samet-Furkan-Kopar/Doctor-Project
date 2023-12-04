import Link from "next/link";
import properties from "../../data/properties";
import Image from "next/image";
import Pagination from "../common/blog/Pagination";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import officeData from "../../services/office-service";
import currencyFormatter from "currency-formatter"


const Listings = (officeDataDetail) => {
  // İki tarih arasındaki farkı hesaplayan fonksiyon
  function calculateTimeAgo(date) {
    const currentDate = new Date(); // Günümüz tarihi
    const postDate = new Date(date); // Verilen tarih
    const timeDifference = currentDate - postDate; // İki tarih arasındaki milisaniye farkı

    // Milisaniyeyi yıl, ay veya gün cinsinden dönüştürmek için hesaplamalar yapılır
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    // Hesaplamalara göre uygun metni döndürün
    if (years > 0) {
      return `${years} yıl önce`;
    } else if (months > 0) {
      return `${months} ay önce`;
    } else if (days > 0) {
      return `${days} gün önce`;
    } else if (hours > 0) {
      return `${hours} saat önce`;
    } else if (minutes > 0) {
      return `${minutes} dakika önce`;
    } else {
      return `${seconds} saniye önce`;
    }
  }
  const router = useRouter();
  const id = router.query.id;
  const [officeAdvert, setOfficeAdvert] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const paginate = 4;
  useEffect(() => {
    const fetchData = async () => {
      try {
        // officeResponse
        const response = await officeData.officeAdvertResponse(
          id,
          page,
          paginate
        );
        setOfficeAdvert(response.data.adverts);

        // totalPages
        const data = await officeData.officeAllData();
        const totalBlogCount = data.data.length;
        const calculatedTotalPages = Math.ceil(totalBlogCount / paginate);
        setTotalPages(calculatedTotalPages);
      } catch (error) {
        console.error("API isteği başarısız:", error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <>
      {officeAdvert.map((item) => (
        <div className="col-lg-12" key={item._id}>
          <div className="feat_property list style2 hvr-bxshd bdrrn mb10 mt20">
            <div className="thumb">
              <Image
                width={275}
                height={240}
                // className="img-whp contain"
                src={item.advertCoverPhoto}
                alt={item.advertCoverPhoto}
              />
            </div>

            <div className="details">
              <div className="tc_content">
                <div className="dtls_headr">
                  <Link
                    href={`/ilan-detay/${item.advertNo}`}
                    className="fp_price"
                  >
                     {item?.advertPrice ? currencyFormatter.format(Number(item?.advertPrice), {thousandsSeparator: '.', decimalDigits: 0}) : 0 } TL
                  </Link>
                </div>
                <p className="text-thm">{item.advertType}</p>
                <h4>
                  {" "}
                  <Link href={`/ilan-detay/${item.advertNo}`}>
                    {item.advertTitle}
                  </Link>
                </h4>
                <p>
                  <span className="flaticon-placeholder"></span>
                  {item.address}
                </p>
              </div>

              <div className="fp_footer">
                <ul className="fp_meta float-start mb0">
                  <li className="list-inline-item">
                    <a href="#">
                      <Image
                        width={40}
                        height={40}
                        src={item.advisorPhoto}
                        alt={item.advisorPhoto}
                      />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">{item.advisorName}</a>
                  </li>
                </ul>
                <div className="fp_pdate float-end">
                  {calculateTimeAgo(item.createdAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {officeAdvert.length === 0 ? (
        <div className="row">
          <div className="col-lg-12 mt20">
            <p className="text-center">Henüz kayıtlı ilan yok.</p>
          </div>
        </div>
      ) : (
        <>
          {officeAdvert.map((item) => (
            <div className="col-lg-12" key={item._id}>
              {/* Mevcut kodunuz */}
            </div>
          ))}
          <div className="row">
            <div className="col-lg-12 mt20">
              <div className="mbp_pagination">
                <Pagination
                  setPage={setPage}
                  page={page}
                  totalPages={totalPages}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Listings;
