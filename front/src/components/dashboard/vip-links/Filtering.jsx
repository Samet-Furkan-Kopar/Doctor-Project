const Filtering = ({setSorting}) => {
  return (
    <select className="selectpicker show-tick form-select c_select" onChange={(e) => setSorting(e.target.value)}>
      <option value="price_desc">Fiyata göre (Önce en yüksek)</option>
      <option value="price_asc">Fiyata göre (Önce en düşük)</option>
      <option value="date_desc">Tarihe göre (Önce en yeni ilan)</option>
      <option value="date_asc">Tarihe göre (Önce en eski ilan)</option>
    </select>
  );
};

export default Filtering;
