import Router from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
// import {
//   addOfficeKeyword,
//   addDistrict,
//   addProvince,
// } from "../../../features/properties/propertiesSlice";

import generalServices from "../../../services/general.service"
const OfficesFilter = ({ className = "" }) => {
  const dispatch = useDispatch();

  const [provinces, setProvinces] = useState([]);

  const [districts, setDistricts] = useState([]);

  const [optionId, setOptionId] = useState(undefined);
  
  const [selectedProvince, setSeletedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWord, setSelectedWord] = useState("");


    useEffect(() => {
        generalServices.getProvinceList().then(res => {
          if(res?.succedd && res?.data){
            console.log(res.data)
            setProvinces(res.data);
          }
        })
      
    }, [])

    useEffect(() => {
      if(optionId){
              generalServices.getDistrictList(optionId).then(res => {
        if(res?.succedd && res?.data){
          console.log(res.data)
          setDistricts(res.data);
        }
      })
      }
      else if(districts.length>0)
      {
        setDistricts([])
      }

    
  }, [optionId])
  // submit handler
  const submitHandler = () => {
    // dispatch(addProvince(selectedProvince))
    // dispatch(addOfficeKeyword(selectedWord))
    // dispatch(addDistrict(selectedDistrict))
  };

  const onChangeProvince = (e) => {
    const selectedOption = provinces.find((option)=> option._id === e.target.value)
    setSeletedProvince(selectedOption?.cityName);
    console.log(e.target.value)


    setOptionId(e.target.value);
   };

  return (
    <div className={`home1-advnc-search ${className}`}>
      <ul className="h1ads_1st_list mb0">
        <li className="list-inline-item">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Anahtar kelimeyi girin"
              onChange={(e) =>setSelectedWord(e.target.value)}
            />
          </div>
        </li>
        {/* End li */}

        <li className="list-inline-item">
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select className="selectpicker w100 form-select show-tick" onChange={onChangeProvince}>
                <option value="">il seçiniz</option>
                {provinces.map((option) => (
                <option key={option._id} value={option._id}>{option.cityName}</option>
            ))}
              </select>
            </div>
          </div>
        </li>
        {/* End li */}
        
        <li className="list-inline-item">
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select className="selectpicker w100 form-select show-tick" onChange={(e)=> setSelectedDistrict(e.target.value)}>
                <option value="">ilçe seçiniz</option>
                  {districts.map((option)=>(
                    <option key={option._id} value = {option.districtName}>{option.districtName}</option>
                  ))}
              </select>
            </div>
          </div>
        </li>
        {/* End li */}

        <li className="list-inline-item">
          <div className="search_option_button">
            <button
              onClick={submitHandler}
              type="submit"
              className="btn btn-thm"
            >
              Ara
            </button>
          </div>
        </li>
        {/* End li */}
      </ul>
    </div>
  );
};

export default OfficesFilter;
