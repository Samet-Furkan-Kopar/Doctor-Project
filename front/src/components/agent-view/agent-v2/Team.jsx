import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import agents from "../../../data/agents";
import { addAgentItemLength } from "../../../features/agent/agentSlice";
import Image from "next/image";
import officeData from "../../../services/office-service";
import { useRouter } from "next/router";
import imageLoader from "../../../utils/imageLoader";

const Team = ({ officeDataDetail }) => {
  console.log(officeDataDetail);
  const router = useRouter();
  const id = router.query.id;
  const { name, category, city, listen } =
    useSelector((state) => state.agent) || {};
  const dispatch = useDispatch();
  const [officeDataTeam, setOfficeDataTeam] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (id !== undefined) {
  //     officeData.officeDetailTeam(id).then((data) => {
  //       setOfficeDataTeam(data.data);
  //       setIsLoading(false);
  //     });
  //   }
  // }, [id]);

  // if (isLoading) {
  //   return <div>Yükleniyor...</div>;
  // }

  return (
    <>
      {officeDataDetail && 
    
        <div className="col-lg-12" >
          <div className="feat_property list style2 agent">
            <div className="thumb">
              <Link href={`/ofis-detay/${officeDataDetail?._id}`}>
                <Image
                  loader={imageLoader}
                  width={286}
                  height={220}
                  className="img-whp"
                  src={officeDataDetail?.image_url}
                  alt="bh1.jpg"
                />
              </Link>
              <div className="thmb_cntnt">
                <ul className="tag mb0">
                  <li className="list-inline-item dn"></li>
                  <li className="list-inline-item">
                    <a href="#">{officeDataDetail?.totalNumberOfAds} </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* End .thumb */}

            <div className="details">
              <div className="tc_content">
                <h4>
                  <Link href={`#`}>{officeDataDetail?.firstName+ " "+ officeDataDetail?.lastName}</Link>
                </h4>
                <p className="text-thm">{officeDataDetail?.advisorTypeId?.advisorType}</p>
                <ul className="prop_details mb0">
                  <li>
                    <a href="#">Telefon: {officeDataDetail?.phoneNumber}</a>
                  </li>
                  <li>{/* <a href="#">Fax: {item.fax}</a> */}</li>
                  <li>
                    <a href="#">E-Posta: {officeDataDetail?.email}</a>
                  </li>
                </ul>
              </div>
              {/* End .tc_content */}

              <div className="fp_footer">
                <ul class="fp_meta float-left mb0">
                  <li class="list-inline-item">
                    <a href={officeDataDetail?.facebook}>
                      <i class="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href={officeDataDetail?.twitter}>
                      <i class="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href={officeDataDetail?.instagram}>
                      <i class="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href={officeDataDetail?.linkedln}>
                      <i class="fa fa-linkedln"></i>
                    </a>
                  </li>
                </ul>
              </div>
              {/* End .fp_footer */}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Team;
