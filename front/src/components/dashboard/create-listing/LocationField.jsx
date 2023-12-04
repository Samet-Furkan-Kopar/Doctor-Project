import { GoogleMap } from "@react-google-maps/api";
import { Field } from "formik";
import { useEffect, useState } from "react";
import MyMap from "./MyMap";
import generalServices from "../../../services/general.service";
import { Item } from "react-photoswipe-gallery";
import index from "../../register";
import createAddresStr from "../../../utils/createAddresStr";
import { updateField } from "../../../features/crudForm/crudFormSlice";
import { useDispatch } from "react-redux";

const LocationField = ({
  errors,
  handleChange,
  handleBlur,
  touched,
  values,
  setValues,
  setFieldValue,
  stepValue,
  activation
}) => {
  const [location, setLocation] = useState({});
  const [citiesList, setCitiesList] = useState();
  const [districtList, setDistrcitList] = useState();
  const [countryList, setCountryList] = useState();
  const [neighbourhoodList, setNeighbourhoodList] = useState();
  const dispatch = useDispatch();

  function getLocation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 500,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;
      setLocation({ lat: crd.latitude, lng: crd.longitude });
      //distance:crd.accuracy distance to meters
    }

    function error() {
      // console.error(`ERROR(${err.code}): ${err.message}`);
      setLocation({});
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }
  useEffect(() => {
    getLocation();
  }, []);

  const getCountryList = async () => {
    const res = await generalServices
      .getCountryList()
      .then((res) => setCountryList(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCountryList();
  }, []);

  const getCityList = async () => {
    if (values.countryId) {
      const res = await generalServices
        .getCityList(values.countryId)
        .then((res) => setCitiesList(res.data))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    values.step === 2  || values.countryId ? getCityList() : '';
  }, [values.countryId, values.step]);

  const getDistrictList = async () => {
    if (values.cityId) {
      const res = await generalServices
        .getDistrictList(values.cityId)
        .then((res) => setDistrcitList(res.data))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getDistrictList();
  }, [values.cityId]);


  const checkAddress = (type = '', val = '') => {
    let country = '';
    let city = '';
    let district = '';
    let neighbourhood = '';

    let targetCountry = values.countryId;
    let targetCity = values.cityId;
    let targetDistrict = values.districtId;
    let targetNeighbourhood = values.neighbourhoodId;

    switch (type) {
      case 'country':
        targetCountry = val
        targetCity = '';
        targetDistrict = '';
        targetNeighbourhood = '';
        break;
      case 'city':
        targetCity = val;
        targetDistrict = '';
        targetNeighbourhood = '';
        break;
      case 'district':
        targetDistrict = val;
        targetNeighbourhood = '';
        break;
      case 'neighbourhood':
        targetNeighbourhood = val;
        break;

      default:
        break;
    }

    if (targetCountry && countryList?.length) {
      const trgtCountry = countryList.find(c => c.value == targetCountry);
      if (trgtCountry) {
        country = trgtCountry.label
      }
    }

    if (targetCity && citiesList?.length) {
      const trgtCity = citiesList.find(c => c.value == targetCity);
      if (trgtCity) {
        city = trgtCity.label
      }
    }

    if (targetDistrict && districtList?.length) {
      const trgtDistrict = districtList.find(d => d.value == targetDistrict);
      if (trgtDistrict) {
        district = trgtDistrict.label
      }
    }

    if (targetNeighbourhood) {
      const trgtNeighbourhood = neighbourhoodList.find(d => d.value == targetNeighbourhood);
      if (trgtNeighbourhood) {
        neighbourhood = trgtNeighbourhood.label
      }
    }

    const newaddr = createAddresStr(country, city, district, neighbourhood)
    setFieldValue('address', newaddr)
    dispatch(updateField({ field: "address", value: newaddr }));
  }


  const getNeighbourhoodList = async () => {
    if (values.districtId) {
      const res = generalServices
        .getNeighbourhoodList(values.districtId)
        .then((res) => setNeighbourhoodList(res.data))
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    getNeighbourhoodList();
  }, [values.districtId]);

  useEffect(() => {
    if (location) {
      setValues((prev) => ({
        ...prev,
        latitude: location.lat || '',
        longitude: location.lng || '',
      }));
      dispatch(updateField({ field: "latitude", value:  location.lat || '' }));
      dispatch(updateField({ field: "longitude", value:  location.lng || '' }));
    }
  }, [location]);

  return (
    <>
      {/* Ülke */}
      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label htmlFor="propertyState">Ülke</label>
          <Field
            component="select"
            name="countryId"
            value={values.countryId}
            onChange={(e) => {
              handleChange(e)
              dispatch(updateField({ field: "country", value: e.target.value }));
              checkAddress('country', e.target.value)
            }}
            onBlur={handleBlur}
            type="text"
            className="selectpicker form-select"
            id="propertyState"
          >
            <option selected value="">
              Ülke seçiniz
            </option>
            {countryList?.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </Field>
          {touched.countryId ? (
            errors.countryId ? (
              <div className="text-danger mb-3">{errors.countryId}</div>
            ) : null
          ) : (
            ""
          )}
        </div>
      </div>

      {/* İl */}
      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label htmlFor="propertyCity">Şehir</label>
          <Field
            component="select"
            name="cityId"
            onChange={(e) => {
              handleChange(e)
              dispatch(updateField({ field: "cityId", value: e.target.value }));
              checkAddress('city', e.target.value)
            }}
            onBlur={handleBlur}
            value={values.cityId}
            type="text"
            className="selectpicker form-select"
          >
            <option selected value="">
              İl Seçiniz
            </option>
            {citiesList?.map((city, index) => (
              <option key={index} value={city.value}>
                {city.label}
              </option>
            ))}
          </Field>
          {touched.cityId ? (
            errors.cityId ? (
              <div className="text-danger mb-3">{errors.cityId}</div>
            ) : null
          ) : (
            ""
          )}
        </div>
      </div>

      {/* İlçe */}
      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label htmlFor="propertyCity">İlçe</label>
          <Field
            component="select"
            disabled={!values.cityId}
            name="districtId"
            onChange={(e) => {
              handleChange(e)
              dispatch(updateField({ field: "districtId", value: e.target.value }));
              checkAddress('district', e.target.districtId)
            }}
            onBlur={handleBlur}
            value={values.districtId}
            type="text"
            className="selectpicker form-select"
          >
            <option value="" selected>
              İlçe Seçiniz
            </option>
            {districtList?.map((distrcit, index) => (
              <option key={index} value={distrcit.value}>
                {distrcit.label}
              </option>
            ))}
          </Field>
          {touched.districtId ? (
            errors.districtId ? (
              <div className="text-danger mb-3">{errors.districtId}</div>
            ) : null
          ) : (
            ""
          )}
        </div>
      </div>

      {/* Mahalle */}
      <div className="col-lg-4 col-xl-4 ">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="neighbourhoodId">Mahalle</label>
          <Field
            name="neighbourhoodId"
            disabled={!values.districtId}
            component="select"
            onChange={(e) => {
              handleChange(e)
              dispatch(updateField({ field: "neighbourhoodId", value: e.target.value }));
              checkAddress('neighbourhood', e.target.value)
            }}
            onBlur={handleBlur}
            value={values.neighbourhoodId}
            type="text"
            className="form-control"
            id="neighbourhoodId"
          >
            <option selected value="">
              Mahalle seçiniz
            </option>
            {neighbourhoodList?.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </Field>
          {touched.neighborhood ? (
            errors.neighborhood ? (
              <div className="text-danger mb-3">{errors.neighborhood}</div>
            ) : null
          ) : (
            ""
          )}
        </div>
      </div>

      {/* Zip */}
      <div className="col-lg-4 col-xl-4">
        {/* <div className="my_profile_setting_input form-group">
          <label htmlFor="zipCode">Zip</label>
          <Field
            name="zipcode"
            onChange={handleChange}
            value={values.zipcode}
            onBlur={handleBlur}
            type="text"
            className="form-control"
            id="zipCode"
          ></Field>
          {touched.zipcode ? (
            errors.zipcode ? (
              <div className="text-danger mb-3">{errors.zipcode}</div>
            ) : null
          ) : (
            ""
          )}
        </div> */}
      </div>
      <div className="col-lg-4 col-xl-4"></div>




      {/* Adres */}
      <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyAddress">Açık Adres</label>
          <Field
            name="address"
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            className="form-control"
            id="propertyAddress"
          />
          {touched.address ? (
            errors.address ? (
              <div className="text-danger mb-3">{errors.address}</div>
            ) : null
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <input
            type="checkbox"
            id="isMapActive"
            onChange={(e) => {
              handleChange(e)
              dispatch(updateField({ field: "isMapActive", value: e.target.checked }));

            }}
            name="isMapActive"
            className="form-check-input"
            checked={values.isMapActive}
          />
          {touched.zipcode ? (
            errors.zipcode ? (
              <div className="text-danger mb-3">{errors.isMapActive}</div>
            ) : null
          ) : (
            ""
          )}
          <label htmlFor="isMapActive" className="ms-1">
            Harita Gizle
          </label>
        </div>
      </div>

      {/* Google Maps */}
      <div className="col-lg-12 maps-container mb40">
        <MyMap location={location} setLocation={setLocation} values={values} />
      </div>
    </>
  );
};

export default LocationField;
