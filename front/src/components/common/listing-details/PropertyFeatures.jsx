import { TiTick, TiDelete } from "react-icons/ti";

const PropertyFeatures = ({ feature }) => {
  return (
    <>
      {feature.features.map((item, i) => (
        <div className="col-sm-6 col-md-6 col-lg-4" key={item}>
          <ul className="order_list list-inline-item">
            <li>
              {item.status ? <TiTick size={25} /> : <TiDelete size={25} />}
              {item.feature}
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default PropertyFeatures;
