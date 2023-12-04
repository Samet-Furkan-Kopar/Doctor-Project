import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFeatured,
  addStatusType,
} from "../../../features/filter/filterSlice";

import Select from "react-select";
import GridListButton from "./GridListButton";

const FilterTopBar = ({setQueryVal}) => {
  const { length } = useSelector((state) => state.properties);
  const { statusType, featured } = useSelector((state) => state.filter);
  const [getStatus, setStatus] = useState(statusType);
  const [getFeatured, setFeatured] = useState(featured);

  const dispatch = useDispatch();

  // add status
  useEffect(() => {
    dispatch(addStatusType(getStatus));
  }, [dispatch, getStatus]);

  // add featured
  useEffect(() => {
    dispatch(addFeatured(getFeatured));
  }, [dispatch, getFeatured]);

  // clear filter
  useEffect(() => {
    statusType === "" && setStatus("");
    featured === "" && setFeatured("");
  }, [statusType, setStatus, featured, setFeatured]);

  return (
    <>
      <div className="col-sm-12 col-md-4 col-lg-4 col-xl-5">
        <div className="left_area tac-xsd">
          {length !== 0 ? (
            <div className="h5 h-100">{length} İlan bulundu</div>
          ) : (
            <div className="h5 text-danger">Hiç Sonuç Bulunamadı</div>
          )}
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-12 col-md-8 col-lg-8 col-xl-7">
        <div className=" text-end tac-xsd">
          <ul style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <li>
              <GridListButton />
            </li>
            <li>
              <Select
                onChange={(newVal) => {
                  setStatus(newVal.value);
                  setQueryVal(newVal.value)
                }}
                placeholder="Gelişmiş Sıralama"
                defaultValue={getStatus}
                options={[
                  { value: "", label: "Gelişmiş Sıralama" },
                  { value: "price_desc", label: "Fiyata Göre (Önce en yüksek)" },
                  { value: "price_asc", label: "Fiyata Göre (Önce en düşük)" },
                  { value: "date_desc", label: "Tarihe Göre (Önce en yeni ilan)" },
                  { value: "date_asc", label: "Tarihe Göre (Önce en eski ilan)" },
                  { value: "address_asc", label: "Adrese göre (A-Z)" },
                  { value: "address_desc", label: "Adrese göre (Z-A)" },
                ]}
              />
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}
    </>
  );
};

export default FilterTopBar;
