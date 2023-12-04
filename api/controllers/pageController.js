import tryCatch from "../utils/tryCatch.js";
import Country from "../models/location/countryModel.js"
import User from "../models/user/userModel.js"
import UserRole from "../models/user/userRoleModel.js"
import City from "../models/location/cityModel.js"
import District from "../models/location/districtModel.js"
import Neighbourhood from "../models/location/neighbourhoodModel.js"
const getDoctorFilterKey = tryCatch(async (req, res) => {
 
  const country = await Country.find({}, "-createdAt -updatedAt");
  const city = await City.find({}, "-createdAt -updatedAt");
  const userRole = await UserRole.find({})
  let countryData = [];
  let cityData = [];
  let districtData = [];
  let neighbourhoodData = [];
  let roleData = [];

  if (city) {
    for (const i of city) {
      cityData.push({
        label: i.name,
        value: i._id,
      });
    }
  }
  // if (country) {
  //   for (const i of country) {
  //     countryData.push({
  //       label: i.name,
  //       value: i._id,
  //     });
  //   }
  // }
  if (req.body.city) {
    let cities = req.body.city.split(",")
    for (const city of cities) {
        const district = await District.find({ cityId: city })
        if (district.length > 0) {
            for (const i of district) {
                districtData.push({
                    "value": i._id,
                    "label": i.name
                })
            }
        }
    }

}
if (req.body.district) {
    let districts = req.body.district.split(",")
    for (const district of districts) {
        const neighbourhood = await Neighbourhood.find({ districtId: district })
        if (neighbourhood.length > 0) {
            for (const i of neighbourhood) {
                neighbourhoodData.push({
                    "value": i._id,
                    "label": i.name,
                })
            }
        }
    }

}
  if (userRole) {
    for (const i of userRole) {
      roleData.push({
        label: i.role,
        value: i._id,
      });
    }
  }
  let obj = {
    searchKey: {
      type: "text",
      label: "Arama",
      value: "searchKey",
    },
    role: {
      type: "combobox",
      label: "Kategori",
      value: "role",
      options: roleData,
    },
    // country: {
    //   type: "combobox",
    //   label: "Ülke",
    //   value: "country",
    //   options: countryData,
    // },
    city: {
      type: "combobox",
      label: "İl",
      value: "city",
      options:cityData
    },
    district: {
      type: "combobox",
      label: "İlçe",
      value: "district",
      options:districtData
    },
    neighbourhood: {
      type: "combobox",
      label: "Mahalle",
      value: "neighbourhood",
      options:neighbourhoodData
    },

  };

    

  res.status(200).json({
    succeded: true,
    data: obj,
  });
});
const getBlogFilterKey = tryCatch(async (req, res) => {
 
  const user = await User.find({isApproved:true,type:"doctor"})
  let userData = [];

 
  if (user) {
    for (const i of user) {
      userData.push({
        label: i.firstName +" "+i.lastName,
        value: i._id,
      });
    }
  }
  let obj = {
    searchKey: {
      type: "text",
      label: "Arama",
      value: "searchKey",
    },
    
    user: {
      type: "combobox",
      label: "Doktor Seç",
      value: "user",
      options: userData,
    }

  };

    

  res.status(200).json({
    succeded: true,
    data: obj,
  });
});

export {
  getDoctorFilterKey,
  getBlogFilterKey
};
