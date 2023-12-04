import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addLength,
  setAllFilter,
  setAllLocation,
  setAllQuery
} from "../../../features/properties/propertiesSlice";

import Select from "react-select";
import { components } from 'react-select';
import AdvertService from "../../../services/advert.service";
import CurrencyInput from 'react-currency-input-field';

const FilteringItem = () => {
  const [filterSideBar, setFilterSideBar] = useState();

  const [allOptions, setAllOptions] = useState({});//aynı yapıyı kullan diğer tarafı çalıştırdıktan sonra
  const [location, setLocation] = useState({});



  const checkKey = (k) => {
    if (k === 'district' || k === 'neighbourhood') {
      return true;
    }
    return false
  }

  const dispatch = useDispatch(); 

  const handleGetFilterSideBar = (val, location) => {
    AdvertService.getFilterSideBarBlog(val).then((res) => {
      console.log('res', res);
      if (res?.data?.succeded) setFilterSideBar(res?.data?.data);
      else setFilterSideBar({});
    });
  };

  function clearAdvanced() {
    setAllOptions({});
    setLocation({});
    dispatch(setAllFilter({}));
    dispatch(setAllLocation({}));
  }

  // Clear selects
  const clearAllFilters = () => {
    setAllOptions({});
    handleGetFilterSideBar();
    clearAdvanced();
  };

  useEffect(() => {
    if (allOptions) {
      const newTmpObj = {};
      const locationObj = {};
      if (Object.keys(allOptions).length) {
        Object.entries(allOptions).map(([k, v]) => {
          if (v.value) {
            if (k === 'city') {
              locationObj[k] = v.value ?? ''
            }
            newTmpObj[k] = v.value ?? ''
          } else if (typeof v === 'object' && v.length) {
            const strArr = [];
            v.map(l => strArr.push(l.value))
            let idStr = strArr.length ? strArr.toString() : '';
            if (k === 'district') {
              locationObj[k] = idStr
            }
            newTmpObj[k] = idStr
          } else {
            newTmpObj[k] = v ?? ''
          }
        })
      }
      Object.keys(newTmpObj).length > 0 && dispatch(setAllFilter(newTmpObj));
      handleGetFilterSideBar(newTmpObj)
      Object.keys(locationObj).length > 0 && dispatch(setAllLocation(locationObj));
    }

  }, [allOptions]);

  useEffect(() => {
    if (location) {
      const locationObj = {};
      if (Object.keys(location).length) {
        Object.entries(location).map(([k, v]) => {
          if (v.value) {
            if (k === 'city') {
              locationObj[k] = v.value ?? ''
            }
            newTmpObj[k] = v.value ?? ''
          } else if (typeof v === 'object' && v.length) {
            const strArr = [];
            v.map(l => strArr.push(l.value))
            let idStr = strArr.length ? strArr.toString() : '';
            if (k === 'district') {
              locationObj[k] = idStr
            }
            newTmpObj[k] = idStr
          }
        })
        dispatch(setAllLocation(location));
      }
    }
  }, [location]);


  const filterStates = useSelector((state) => state.advertFilters)
  useEffect(() => {
    if (filterStates?.filterValues) {
      setAllOptions(filterStates?.filterValues)
      // handleGetFilterSideBar();
    }
  }, [filterStates])


  const LimitedChipsContainer = ({ children, hasValue, ...props }) => {
    let selectionLabel = '';
    switch (props.selectProps.name) {
      case 'advertShape':
        selectionLabel = 'Emlak Seçildi'
        break;
      case 'neighbourhood':
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

    return (
      <components.ValueContainer {...props}>

        {`${overflowCounter} ${selectionLabel}`}

      </components.ValueContainer>
    );
  };

  const getFieldValue = (val, options) => {
    if (typeof val === 'object') {
      return val;
    } else {
      const checkArr = val?.split(',');
      if (checkArr?.length > 1) {
        const newList = [];
        checkArr.map(c => {
          const trgt = options.find(o => o.value === c);
          if (trgt) {
            newList.push(trgt);
          }
        })
        return newList.length ? newList : '';
      } else {
        if (checkArr?.length && options?.length && checkArr[0]) {
          const trgt = options.find(o => o.value === checkArr[0]);
          if (trgt) {
            return trgt;
          }
          return '';
        }
      }

    }
    return '';
  }

  return (
    <ul className="sasw_list mb0">
      {/* New Advert Filter Title's Start*/}

      {filterSideBar && filterSideBar ? (
        Object.keys(filterSideBar).map((key) => {
          console.log(filterSideBar[key]);
          const filterField = filterSideBar[key];
          if (
            key == "country" ||
            key == "city" ||
            key == "district" ||
            key == "neighbourhood"
          ) {
            return (
              <li key={key}>
                <div className="search_option_two">
                  <div className="candidate_revew_select">
                    <Select
                      onChange={(e) => {
                        if (e?.value) {
                          if (key === "city") {
                            setAllOptions(
                              (state) => (state = { ...state, [key]: e.value, ['district']: '', ['neighbourhood']: '' })
                            );
                            setLocation((state) => {
                              state = { ...state, [key]: e.value, ['district']: '', ['neighbourhood']: '' };
                              return state;
                            });
                          } else if (key === "district") {
                            setAllOptions(
                              (state) => (state = { ...state, [key]: e.value, ['district']: '' })
                            );
                            setLocation((state) => {
                              state = { ...state, [key]: e.value, ['district']: '' };
                              return state;
                            });
                          } else {
                            setAllOptions(
                              (state) => (state = { ...state, [key]: e.value })
                            );
                            setLocation((state) => {
                              state = { ...state, [key]: e.value };
                              return state;
                            });
                          }

                        } else if (e?.length) {
                          const strArr = [];
                          e.map(l => strArr.push(l.value))
                          let idStr = strArr.length ? strArr.toString() : '';
                          if (key === "city") {
                            setAllOptions(
                              (state) => (state = { ...state, [key]: idStr, ['district']: '', ['neighbourhood']: '' })
                            );
                            setLocation((state) => {
                              state = { ...state, [key]: idStr, ['district']: '', ['neighbourhood']: '' };
                              return state;
                            });
                          } else if (key === 'district') {
                            setAllOptions(
                              (state) => (state = { ...state, [key]: idStr, ['neighbourhood']: '' })
                            );
                            setLocation((state) => {
                              state = { ...state, [key]: idStr, ['neighbourhood']: '' };
                              return state;
                            });
                          } else {
                            setAllOptions(
                              (state) => (state = { ...state, [key]: idStr })
                            );
                            setLocation((state) => {
                              state = { ...state, [key]: idStr };
                              return state;
                            });
                          }

                        } else {
                          if (key === "city") {
                            setAllOptions(
                              (state) => (state = { ...state, [key]: '', ['district']: '', ['neighbourhood']: '' })
                            );
                            setLocation((state) => {
                              state = { ...state, [key]: '', ['district']: '', ['neighbourhood']: '' };
                              return state;
                            });
                          } else if (key === 'district') {
                            setAllOptions(
                              (state) => (state = { ...state, [key]: '', ['neighbourhood']: '' })
                            );
                            setLocation((state) => {
                              state = { ...state, [key]: '', ['neighbourhood']: '' };
                              return state;
                            });
                          } else {
                            setAllOptions(
                              (state) => (state = { ...state, [key]: '' })
                            );
                            setLocation((state) => {
                              state = { ...state, [key]: '' };
                              return state;
                            });
                          }

                        }
                      }}
                      value={getFieldValue(allOptions[key], filterField?.options)}
                      placeholder={allOptions[key] || filterField.label}
                      options={
                        filterField?.options
                          ? filterField.options.map((option) => {
                            return {
                              value: option["value"],
                              label: option["label"],
                            };
                          })
                          : []
                      }
                      isClearable={true}
                      name={key}
                      isMulti={key === 'neighbourhood' || key === 'district'}
                      components={checkKey(key) && { ValueContainer: LimitedChipsContainer }}
                    />
                  </div>
                </div>
              </li>
            );
          }

          switch (filterField.type) {
            case "text" || "number":
              return (
                <li key={key}>
                  <div className="form-group mb-4">
                    {key === 'maxPrice' || key === 'minPrice' ?
                      <CurrencyInput
                        id="input-example"
                        placeholder={filterField.label}
                        defaultValue={1000}
                        decimalsLimit={0}
                        value={allOptions[key] || ""}
                        onValueChange={(value) => {
                          if (value) {
                            setAllOptions(
                              (state) =>
                                (state = { ...state, [key]: value })
                            );
                          } else {
                            setAllOptions(
                              (state) => (state = { ...state, [key]: '' })
                            );
                          }
                        }}
                        className="form-control"
                        decimalSeparator=","
                        groupSeparator="."
                      />
                      :
                      <input
                        type={filterField.type}
                        className="form-control"
                        id={filterField.label}
                        placeholder={filterField.label}
                        value={allOptions[key] || ""}
                        onChange={(e) => {
                          if (e?.target?.value) {
                            setAllOptions(
                              (state) =>
                                (state = { ...state, [key]: e.target.value })
                            );
                          } else {
                            setAllOptions(
                              (state) => (state = { ...state, [key]: '' })
                            );
                          }
                        }}
                      />
                    }

                  </div>
                </li>
              );
            case "combobox":
              return (
                <li key={key}>
                  <div className="search_option_two">
                    <div className="candidate_revew_select">
                      <Select
                        isMulti={checkKey(key)}
                        onChange={(selectedOption) => {
                          if (selectedOption) {
                            setAllOptions((state) => ({ ...state, [key]: selectedOption.value }));
                          } else {
                            setAllOptions((state) => ({ ...state, [key]: '' }));
                          }
                        }}
                        // value={allOptions[key] || ""}
                        value={getFieldValue(allOptions[key], filterField?.options)}
                        placeholder={allOptions[key] || filterField.label}
                        name={key}
                        isClearable={true}
                        options={
                          filterField?.options
                            ? filterField.options.map((option) => ({
                              value: option.value,
                              label: option.label,
                            }))
                            : []
                        }
                      />
                    </div>
                  </div>
                </li>
              );
            case "dropdown":
              return (
                <li key={key}>
                  <div className="search_option_two">
                    <div className="candidate_revew_select">
                      <Select
                        isMulti={checkKey(key)}
                        onChange={(e) => {
                          if (e?.value) {
                            setAllOptions(
                              (state) => (state = { ...state, [key]: e.value })
                            );

                          } else {
                            setAllOptions(
                              (state) => (state = { ...state, [key]: '' })
                            );
                          }

                        }}
                        defaultValue={allOptions[key] || ""}
                        placeholder={allOptions[key] || filterField.label}
                        name={key}
                        // isDisabled={
                        //   filterField?.options &&
                        //   filterField.options?.length > 0
                        //     ? false
                        //     : true
                        // }
                        isClearable={true}
                        options={
                          filterField?.options
                            ? filterField.options.map((option) => {
                              return {
                                value: option["value"],
                                label: option["label"],
                              };
                            })
                            : []
                        }
                      />
                    </div>
                  </div>
                </li>
              );
          }
        })
      ) : (
        <>Yükleniyor</>
      )}

      {/* New Advert Filter Title's End*/}

      <li>
        <div className="search_option_button">
          <button
            onClick={clearAllFilters}
            type="button"
            className="btn btn-block btn-thm w-100"
          >
            Filtreyi temizle
          </button>
        </div>
      </li>

      {/* End li */}
    </ul>
  );
};

export default FilteringItem;
