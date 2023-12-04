import { useState } from "react";

const Categories = ({ officeDataDetail }) => {
  const [openSubIndex, setOpenSubIndex] = useState(null);

  const toggleSub = (index) => {
    if (openSubIndex === index) {
      setOpenSubIndex(null);
    } else {
      setOpenSubIndex(index);
    }
  };
  return (
    <ul className="list_details">
      {officeDataDetail?.categories &&
      officeDataDetail?.categories.length > 0 ? (
        officeDataDetail?.categories.map((item, index) => (
          <li key={index} className="hover:text-black fw-bold">
            <a
              style={{ cursor: "pointer" }}
              className="text-black link-danger"
              onClick={() => toggleSub(index)}
            >
              <i
                className={`fa fa-caret-${
                  openSubIndex === index ? "down" : "right"
                } mr10`}
              ></i>
              {item.advertShape.label}
              <span className="float-end text-black">{item.advertShape.count}</span>
            </a>
            {openSubIndex === index && (
              <ul>
                {item.advertShape.options.map((subItem, subIndex) => (
                  <li key={subIndex} className="d-flex justify-content-between align-items-center text-black fw-bold" style={{fontSize:"13px"}}>
                    <a href="" className="text-black  icon-link  link-danger" style={{fontSize:"13px"}}>
                      {subItem.label}
                    </a>
                    <span className="float-end">{subItem.count}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))
      ) : (
        <div>Yükleniyor...</div>
      )}
    </ul>
  );
};

export default Categories;
