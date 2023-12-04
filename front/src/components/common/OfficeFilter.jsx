import Router from "next/router";
import Select from "react-select";
import { useState } from "react";
import officeData from "../../services/office-service";

const GlobalFilter = ({ className = "", officeList, setFilterData }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [buttonLoadingStatus, setButtonLoadingStatus] = useState(false)

  const submitHandler = () => {
    setButtonLoadingStatus(true)
    const officeCountryId = selectedCountry ? selectedCountry.value : "";
    const officeCityId = selectedCity ? selectedCity.value : "";
    const officeDistrictId = selectedDistrict ? selectedDistrict.value : "";
    const searchKey = searchInput;

    officeData
      .filterOfficeData(
        officeCountryId,
        officeCityId,
        officeDistrictId,
        searchKey
      )
      .then((filteredData) => {
        setButtonLoadingStatus(false)
        console.log('KKKKKBUradayız', filteredData)
        setFilterData(filteredData);
        // Router.push("/ofislerimiz");
      })
      .catch((error) => {
        console.error("Filtering error:", error);
      });
  };

  const uniqueCountries = Array.from(
    new Set(officeList?.map((office) => office.officeCountry))
  ).map((country) => ({
    value: country,
    label: country,
  }));

  const uniqueCities = Array.from(
    new Set(officeList?.map((office) => office.officeCity))
  ).map((city) => ({
    value: city,
    label: city,
  }));

  const uniqueDistricts = Array.from(
    new Set(officeList?.map((office) => office.officeDistrict))
  ).map((district) => ({
    value: district,
    label: district,
  }));

  return (
    <div style={{ fontSize: "12px" }} className={`home1-advnc-search ${className}`}>
      <ul className="h1ads_1st_list mb0">
        <li className="list-inline-item">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="İlan No veya Anahtar Kelimeler"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
          </div>
        </li>
        <li className="list-inline-item">
          <div className="search_option_two">
            <Select
              options={uniqueCountries}
              placeholder="Ülke Seçiniz"
              onChange={(selectedOption) => {
                setSelectedCountry(selectedOption);
                setSelectedCity(null);
                setSelectedDistrict(null);
              }}
            />
          </div>
        </li>
        <li className="list-inline-item">
          <div className="search_option_two">
            <Select
              options={uniqueCities}
              placeholder="İl Seçiniz"
              isDisabled={!selectedCountry}
              onChange={(selectedOption) => {
                setSelectedCity(selectedOption);
                setSelectedDistrict(null);
              }}
            />
          </div>
        </li>
        <li className="list-inline-item">
          <div className="search_option_two">
            <Select
              options={uniqueDistricts}
              placeholder="İlçe Seçiniz"
              isDisabled={!selectedCity}
              onChange={(selectedOption) => {
                setSelectedDistrict(selectedOption);
              }}
            />
          </div>
        </li>
        <li className="list-inline-item">
          <div className="search_option_button">
            {buttonLoadingStatus ?
              <button class="btn btn-primary" type="button" disabled>
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                Yükleniyor...
              </button>
              :
              <button onClick={submitHandler} type="submit" className="btn btn-thm">
                Arama Yap
              </button>
            }
          </div>
        </li>
      </ul>
    </div>
  );
};

export default GlobalFilter;
