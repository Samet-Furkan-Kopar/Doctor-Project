import Router from "next/router";
// import {
//   addKeyword,
//   addLocation,
// } from "../../features/properties/propertiesSlice";

import CheckBoxFilter from "./CheckBoxFilter"; //bunu sil
import GlobalSelectBox from "./GlobalSelectBox";
import Select from "react-select";
import { components } from 'react-select';
import homePageServices from "../../services/homepage.service";
import { useEffect, useState } from "react";
import generalServices from "../../services/general.service";
import filterService from "../../services/filter.service";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../features/advertFilter/advertFilterSlice";
import CurrencyInput from 'react-currency-input-field';

const GlobalFilter = ({
  className = "",
  processTypes,
  officeList,
  advertTypes,
  cityList,
}) => {
  // submit handler
  const [selectedAdvertType, setSelectedAdvertType] = useState(null);
  const [selectedAdvertShape, setSelectedAdvertShape] = useState(null);

  const [advertShape, setAdvertShape] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProcessType, setSelectedProcessType] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [advertNo, setAdvertNo] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };
  const districtValues = selectedDistrict ? selectedDistrict.map(item => item.value) : [];
  const neighborhoodsValues = neighborhoods ? neighborhoods.map(item => item.value) : [];
  const dispatch = useDispatch();


  const data = {
    advertNo: advertNo,
    processType: selectedProcessType ? selectedProcessType.value : "",
    advertType: selectedAdvertType ? selectedAdvertType.value : "",
    propertyType: "",
    city: selectedCity ? selectedCity.value : "",
    district: districtValues ? districtValues : "",
    neighbourhood: neighborhoodsValues ? neighborhoodsValues : "",
    minPrice: minPrice ? minPrice : "",
    maxPrice: maxPrice ? maxPrice : "",
  };

  const selectedText =
    selectedOptions.length === 0
      ? "Emlak Seçiniz"
      : selectedOptions.length === 1
        ? "1 öğe seçildi"
        : `${selectedOptions.length} öğe seçildi`;

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    dispatch(updateField({ field: "city", value: selectedOption }))
  };

  const handleNeighbourhoodChange = (selectedOption) => {
    dispatch(updateField({ field: "neighbourhood", value: selectedOption }))
  }

  const handleInputChange = (e) => {
    setAdvertNo(e.target.value);
    dispatch(updateField({ field: "advertNo", value: e.target.value }))
  };


  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    dispatch(updateField({ field: "district", value: selectedOption }))
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
    dispatch(updateField({ field: "minPrice", value:value }))
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
    dispatch(updateField({ field: "maxPrice", value: value }))
  };

  useEffect(() => {
    if (selectedCity) {
      setIsLoading(true);
      generalServices
        .getDistrictList(selectedCity.value)
        .then((res) => {
          if (res?.succedd && res?.data?.length > 0) {
            setDistricts(res?.data);
          }
        })
        .catch((error) => {
          console.error("İlçe verileri alınamadı:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict && selectedDistrict.length) {
      let idStr = "";
      selectedDistrict.map((sd, k) => {
        if (k < selectedDistrict.length - 1) {
          idStr += `${sd.value},`;
        } else {
          idStr += sd.value;
        }
      });
      setIsLoading(true);
      generalServices
        .getNeighbourhoodList(idStr)
        .then((res) => {
          if (res?.succeded && res?.data?.length > 0) {
            setNeighborhoods(res?.data);
          }
        })
        .catch((error) => {
          console.error("İlçe verileri alınamadı:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedDistrict]);

  const handleAdvertChange = (selectedOption) => {
    setSelectedAdvertType(selectedOption);
    dispatch(updateField({ field: "advertType", value: selectedOption }))
  };

  const handleAdvertShape = (selectedOption) => {
    setSelectedAdvertShape(selectedOption);
    dispatch(updateField({ field: "advertShape", value: selectedOption }))
  }

  const handleProcessTypeChange = (selectedOption) => {
    setSelectedProcessType(selectedOption);
    dispatch(updateField({ field: "processType", value: selectedOption }))
  };

  const submitHandler = async () => {
    // await filterService.getFilteredContent(data)
    setLoadingStatus(true);
    Router.push("/portfoylerimiz");
  };
  const submitHandlerMap = async () => {
    // await filterService.getFilteredContent(data)
    setLoadingStatus(true);
    Router.push("/harita");
  };
  useEffect(() => {
    if (selectedAdvertType) {
      setIsLoading(true);
      // API'den ilçeleri çekmek için bir işlev kullanın
      homePageServices
        .getAdvertShape(selectedAdvertType.value)
        .then((data) => {
          console.log(data);
          // API'den gelen ilçe verilerini options formatına dönüştürün
          const advertShapeOptions = data.data.map((advert) => ({
            value: advert._id,
            label: advert.typeName,
          }));
          setAdvertShape(advertShapeOptions);
        })
        .catch((error) => {
          console.error("AdvertShape alınamadı:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedAdvertType]);

  const LimitedChipsContainer = ({ children, hasValue, ...props }) => {
    let selectionLabel = '';
    switch (props.selectProps.name) {
      case 'advertShape':
        selectionLabel = 'Emlak Seçildi'
        break;
      case 'neighborhood':
        selectionLabel = 'Mahalle Seçildi'
        break;
      case 'district':
        selectionLabel = 'İlçe Seçildi'
        break;
      default:
        selectionLabel = 'Emlak Seçildi'
        break;
    }

    if (!hasValue) {
      return (
        <components.ValueContainer {...props}>
          {children}
        </components.ValueContainer>
      );
    }

    const CHIPS_LIMIT = 2;
    const [chips, otherChildren] = children;
    const overflowCounter = chips.length;
    const displayChips = chips.slice(overflowCounter, overflowCounter + CHIPS_LIMIT);

    return (
      <components.ValueContainer {...props}>

        {`${overflowCounter} ${selectionLabel}`}

      </components.ValueContainer>
    );
  };

  return (
    <div
      style={{ fontSize: "12px" }}
      className={`home1-advnc-search w-100 ${className}`}
    >
      <ul className="h1ads_1st_list mb0 w-100">
        {" "}
        {/*mobile-layout */}
        <div className="row w-100">
          <li className="list-inline-item col-sm-12 col-md-3 me-0">
            <div className="search_option_two w-100">
              {/* <div className="candidate_revew_select"> */}

              {advertTypes && advertTypes.length > 0 ? (
                <Select
                  className="custom-select"
                  value={selectedProcessType}
                  onChange={handleProcessTypeChange}
                  isClearable={true}
                  options={processTypes.map((p) => ({
                    value: p._id,
                    label: p.processName,
                  }))}
                  placeholder="Emlak Tipini Seçiniz..."
                />
              ) : (
                <Select
                  value={selectedProcessType}
                  options={[]}
                  isClearable={true}
                  placeholder="Emlak Tipini Seçiniz..."
                />
              )}
            </div>
          </li>

          <li className="list-inline-item col-sm-12 col-md-3 me-0">
            <div className="search_option_two w-100">
              {/* <div className="candidate_revew_select"> */}

              {advertTypes && advertTypes.length > 0 ? (
                <Select
                  className="custom-select"
                  value={selectedAdvertType}
                  onChange={handleAdvertChange}
                  isClearable={true}
                  options={advertTypes.map((advert) => ({
                    value: advert._id,
                    label: advert.advertTypeName,
                  }))}
                  placeholder="Emlak Şeklini Seçiniz..."
                />
              ) : (
                <Select
                  isClearable={true}
                  value={selectedAdvertType}
                  options={[]}
                  placeholder="Emlak Şeklini Seçiniz..."
                />
              )}
            </div>
          </li>

          <li className="list-inline-item col-sm-12 col-md-3 me-0">
            <div className="search_option_two w-100">
              <Select
                options={advertShape}
                isDisabled={!selectedAdvertType}
                isLoading={isLoading}
                isMulti={true}
                hideSelectedOptions={false}
                onChange={handleAdvertShape}
                value={selectedAdvertShape}
                placeholder={selectedText}
                name="advertShape"
                components={{ ValueContainer: LimitedChipsContainer }}
              />
            </div>
          </li>

          <li className="list-inline-item col-sm-12 col-md-3 me-0">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="İlan No veya Anahtar Kelimeler"
                value={advertNo}
                onChange={handleInputChange}
              />
            </div>
          </li>
          {/* End li */}
        </div>
        <div className="row mt20 mb20 w-100">
          <li className="list-inline-item col-sm-12 col-md-3 me-0">
            <div className="search_option_two w-100">
              {cityList && cityList.length > 0 ? (
                <Select
                  className="custom-select"
                  value={selectedCity}
                  onChange={handleCityChange}
                  options={cityList}
                  placeholder="İl Seçiniz"
                  isClearable={true}
                  name="city"
                />
              ) : (
                <Select
                  value={selectedCity}
                  options={[]}
                  placeholder="İl Seçiniz"
                  isClearable={true}
                />
              )}
            </div>
          </li>
          <li className="list-inline-item col-sm-12 col-md-3 me-0">
            <div className="search_option_two w-100">
              <Select
                options={districts}
                isMulti={true}
                placeholder="İlçe seçiniz"
                onChange={handleDistrictChange}
                isDisabled={!selectedCity}
                isLoading={isLoading}
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                name="district"
                components={{ ValueContainer: LimitedChipsContainer }}
              />
            </div>
          </li>

          <li className="list-inline-item col-sm-12 col-md-3 me-0">
            <div className="search_option_two w-100">
              <Select
                isMulti={true}
                options={neighborhoods}
                closeMenuOnSelect={false}
                placeholder="Mahalle seçiniz"
                isDisabled={!selectedDistrict}
                onChange={handleNeighbourhoodChange}
                isLoading={isLoading}
                allowSelectAll={true}
                hideSelectedOptions={false}
                name="neighborhood"
                components={{ ValueContainer: LimitedChipsContainer }}
              />
            </div>
          </li>
          <li className="list-inline-item col-sm-12 col-md-3 me-0 pe-0 ">
            <div className="search_option_two w-100 row">
              <div className="col-sm-12 col-md-6 me-0 pe-0 mb-2">
              <CurrencyInput
                  placeholder="Min. Fiyat"
                  defaultValue={1000}
                  decimalsLimit={0}
                  value={minPrice}
                  onValueChange={(value) => {
                    handleMinPriceChange(value)
                  }}
                  className="form-control"
                  decimalSeparator=","
                  groupSeparator="."
                />
              </div>
              <div className="col-sm-12 col-md-6 me-0 pe-0">
                <CurrencyInput
                  placeholder="Max. Fiyat"
                  defaultValue={1000}
                  decimalsLimit={0}
                  value={maxPrice}
                  onValueChange={(value) => {
                    handleMaxPriceChange(value)
                  }}
                  className="form-control"
                  decimalSeparator=","
                  groupSeparator="."
                />
              </div>
            </div>
          </li>
        </div>
        <div className="row mt20 mb20 w-100">
          <li className="list-inline-item col-sm-12 col-md-3 me-0">
            <div className="search_option_two  w-100">
              {/* <div className="candidate_revew_select"> */}
              {officeList && officeList.length > 0 ? (
                <Select
                  // className="selectpicker w100 show-tick form-select"
                  options={officeList.map((office) => ({
                    value: office._id,
                    label: office.companyName,
                  }))}
                  placeholder="Bayi Seçiniz"
                  isClearable={true}
                />
              ) : (
                <Select
                  // className="selectpicker w100 show-tick form-select"
                  options={[]}
                  placeholder="Bayi Seçiniz"
                  isClearable={true}
                />
              )}
            </div>
          </li>
        </div>
        <div className="row mt20 mb20 w-100 justify-content-end">
          <li className="list-inline-item col-sm-12 col-md-12 mb-2 d-md-flex justify-content-end">
            {/*search-section */}
            <div className="search_option_button row">
              <div className="col-sm-12 col-md-6">
                {loadingStatus ? (
                  <button class="btn btn-primary mb-2" type="button" disabled>
                    <span
                      class="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Yükleniyor...
                  </button>
                ) : (
                  <button
                    onClick={submitHandlerMap}
                    type="submit"
                    className="btn btn-thm mb-2"
                  >
                    Harita Ara
                  </button>
                )}
              </div>
              <div className="col-sm-12 col-md-6">
                {loadingStatus ? (
                  <button class="btn btn-secondary" type="button" disabled>
                    <span
                      class="spinner-grow spinner-grow-sm"
                      style={{ backgroundColor: "#0d6efd" }}
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Yükleniyor...
                  </button>
                ) : (
                  <button
                    onClick={submitHandler}
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#0d6efd" }}
                  >
                    Detaylı Yap
                  </button>
                )}
              </div>
            </div>

            <div className="search_option_button ms-4 me-1 row">

            </div>
          </li>

          {/* End li */}
        </div>
        {/* End li */}
      </ul>
    </div>
  );
};

export default GlobalFilter;
