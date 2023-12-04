import { useState } from "react";

const Categories = ({ features }) => {
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
      {features && features.length > 0 ? (
        features.map((item, index) => (
          <li key={index} className="hover:text-black">
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
              {item.advertTypeName}{" "}
              <span className="float-end">{item.sub.length} ilan</span>
            </a>
            {openSubIndex === index && (
              <ul>
                {item.sub.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <a href="" className="text-black  icon-link  link-danger">
                      {subItem.typeName}
                    </a>
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
