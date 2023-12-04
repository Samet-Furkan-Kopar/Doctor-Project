// // import { useState, useEffect } from "react";
// const GlobalSelectBox = ({cityList}) => {
//   console.log(cityList)
//   // const [cities, setCities] = useState([])
//   // useEffect(() => {
//   //   if(cityList){
//   //     setCities(cityList)
//   //   }
//   // }, [cityList])

//   return (

//     <>
//       <li className="list-inline-item">
//         <div className="candidate_revew_select">

//   <select className="selectpicker w100 show-tick form-select">

//     <option>İl Seçiniz</option>
//     {cityList && cityList.length > 0 && (
//     cityList.map((city) => (
//       <option key={city._id} value={city._id}>
//         {city.cityName}
//       </option>)
//     ))
// }
//   </select>

//         </div>
//       </li>
//       {/* End li */}

//       <li className="list-inline-item">
//         <div className="candidate_revew_select">
//           <select className="selectpicker w100 show-tick form-select">
//             <option>İlçe seçiniz</option>
//             <option>1</option>
//             <option>2</option>
//           </select>
//         </div>
//       </li>
//       {/* End li */}
//       <li className="list-inline-item">
//         <div className="form-group">
//           <input
//             type="number" // input türünü "number" olarak değiştiriyoruz.
//             className="form-control"
//             placeholder="Min. Fiyat" // placeholder'ı "Price" olarak güncelliyoruz.
//           // onChange={(e) => dispatch(addPrice(parseFloat(e.target.value)))} 
//           />
//           <label>
//             <span className="flaticon-money"></span> {/* Para simgesi */}
//           </label>
//         </div>
//       </li>

//       {/* End li */}
//       <li className="list-inline-item">
//         <div style={{display:"flex",padding:"2px"}} className="form-group">
//           <input
//             type="number" // input türünü "number" olarak değiştiriyoruz.
//             className="form-control"
//             placeholder="Max. Fiyat" // placeholder'ı "Price" olarak güncelliyoruz.
//           // onChange={(e) => dispatch(addPrice(parseFloat(e.target.value)))} 
//           />
//           <label>
//             <span className="flaticon-money"></span> {/* Para simgesi */}
//           </label>
//         </div>
//       </li>


//       {/* <li className="list-inline-item">
//         <div className="candidate_revew_select">
//           <select className="selectpicker w100 show-tick form-select">
//             <option>Year built</option>
//             <option>2013</option>
//             <option>2014</option>
//             <option>2015</option>
//             <option>2016</option>
//             <option>2017</option>
//             <option>2018</option>
//             <option>2019</option>
//             <option>2020</option>
//           </select>
//         </div>
//       </li>


//       <li className="list-inline-item">
//         <div className="candidate_revew_select">
//           <select className="selectpicker w100 show-tick form-select">
//             <option>Built-up Area</option>
//             <option>Adana</option>
//             <option>Ankara</option>
//             <option>Antalya</option>
//             <option>Bursa</option>
//             <option>Bodrum</option>
//             <option>Gaziantep</option>
//             <option>İstanbul</option>
//             <option>İzmir</option>
//             <option>Konya</option>
//           </select>
//         </div>
//       </li> */}
//     </>
//   );
// };

// export default GlobalSelectBox;
import React, { useState, useEffect } from "react";
import Select from "react-select";
import homePageServices from "../../services/homepage.service";


const GlobalSelectBox = ({ cityList }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  useEffect(() => {
    if (selectedCity) {
      setIsLoading(true);
      homePageServices.getDistricts(selectedCity.value)
        .then((data) => {
          const districtOptions = data.data.map((district) => ({
            value: district._id,
            label: district.districtName,
          }));
          setDistricts(districtOptions);
        })
        .catch((error) => {
          console.error("İlçe verileri alınamadı:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedCity]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <li className="list-inline-item">
          <div className="candidate_revew_select">
            {cityList && cityList.length > 0 ? (
              <Select
              styles={{minWidth:"70px"}}
                // className="selectpicker w100 show-tick form-select "
                value={selectedCity}
                onChange={handleCityChange}
                options={cityList.map((city) => ({
                  value: city._id,
                  label: city.cityName,
                }))}
                placeholder="İl Seçiniz"
              />) : (<Select
                value={selectedCity}
                options={[]}
                placeholder="İl Seçiniz"
              />)
            }
          </div>
        </li>

        <li className="list-inline-item">
          <div className="candidate_revew_select">
            <Select
              // className="selectpicker w100 show-tick form-select"
              options={districts}
              placeholder="İlçe seçiniz"
              isDisabled={!selectedCity}
              isLoading={isLoading}
            />
          </div>
        </li>

         <li style={{display:"flex",marginLeft:"7px"}} className="list-inline-item" >  {/* style={{ margin: "10px" }} */}
          <div >{/* className="form-group" */}
            <input
              type="number"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="form-control"
              placeholder="Min. Fiyat"
            />
            <label>
              <span className="flaticon-money"></span>
            </label>
          </div>
        </li>


       <li  className="list-inline-item">    {/*style={{ display: "flex", paddingTop: "10px" }} */}
          <div > {/* className="form-group" */}
            <input
              type="number"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="form-control"
              placeholder="Max. Fiyat"

            />
            <label>
              <span className="flaticon-money"></span>
            </label>
          </div>
        </li>
      </div>

    </>
  );
};

export default GlobalSelectBox;

