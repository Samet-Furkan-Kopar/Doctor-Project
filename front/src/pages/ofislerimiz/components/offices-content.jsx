import Image from "next/image";
import { useState, useEffect } from "react";
import masterServices from "../../../services/user.service"; 
import { useDispatch, useSelector } from 'react-redux';
import imageLoader from "../../../utils/imageLoader";

const OfficesContent = () => {
  const {
    province,
    district,
    officeKeyWord
  } = useSelector((state) => state.properties);
 const [offices,setOffices] = useState([]);

 const officeKeyWordHandler = (item) =>
    item?.firstAndLastName.toLowerCase().includes(officeKeyWord.toLowerCase());

    const provinceHandler = (item) =>
    item?.officeCity.toLowerCase().includes(province.toLowerCase());

    const districtHandler = (item) =>
    item?.officeDistrict.toLowerCase().includes(district.toLowerCase());

 useEffect(() => {
    masterServices.getUserOfficesList().then(res => {
      if(res?.data){
        setOffices(res.data);
        console.log("offices : ", res.data)
      }
    })
  
}, [])


let content = offices
.filter(officeKeyWordHandler)
.filter(provinceHandler)
.filter(districtHandler)
.map((item)=><div
className={"col-3 list_map feature-list"}
key={item._id}
>
<div
  className={"feat_property home7 style4"}
>
  <div className="thumb">
    <Image
loader={imageLoader}
      width={250}
      height={220}
      className="img-whp w-100 h-100 cover"
      src={item.officeCoverPhoto ?  `${item?.officeCoverPhoto}` : ""}
    />
                <div className="thmb_cntnt">
              <ul className="tag mb0">
                <li className="list-inline-item">
                  <a href="#">3 listings</a>
                </li>
              </ul>
            </div>
    
  </div>
  <div className="details">
    <div className="tc_content">
     <h4>
        {item?.firstAndLastName}
      </h4>
      <p className="text-thm">Broker</p>

      <ul className="prop_details mb0">
        
          <li className="list-inline-item">
              Ofis Telefonu: {item?.taxOffice}
          </li><br/>
          <li className="list-inline-item">
              Telefon: {item?.phoneNumber}
          </li><br/>
          <li className="list-inline-item">
              Fax: {item?.officeNumber}
          </li><br/>
          <li className="list-inline-item">
              E-Posta: {item?.officeEmail}
          </li>
        
      </ul>
    </div>
    {/* End .tc_content */}

    <div className="fp_footer">
          <ul className="fp_meta float-start mb0">
            <li className="list-inline-item">
              <a href={item.officefacebook}>
                <i className="fa fa-facebook"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href={item.officetwitter}>
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href={item.officeinstagram}>
                <i className="fa fa-instagram"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href={item.officelinkedln}>
                <i className="fa fa-linkedin"></i>
              </a>
            </li>
          </ul>
          {/* <div className="fp_pdate float-end text-thm">
            View My Listings <i className="fa fa-angle-right"></i>
          </div> */}
        </div>
   
    {/* End .fp_footer */}
  </div>
</div>
</div>) 

  return (
    <>
    {content}
    </>
  );
};

export default OfficesContent;
