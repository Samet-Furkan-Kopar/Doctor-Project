const MortgageFiltering = () => {
  return (
    <>
      <li className="search_area">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            placeholder="Total Amount"
          />
          <label htmlFor="exampleInputName1">
            <span className="flaticon-money-bag"></span>
          </label>
        </div>
      </li>
      {/* End li */}

      <li className="search_area">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleInputAmount"
            placeholder="Down Payment"
          />
          <label htmlFor="exampleInputAmount">
            <span className="flaticon-money-bag"></span>
          </label>
        </div>
      </li>
      {/* End li */}

      <li className="search_area">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleInputAmount2"
            placeholder="Interest Rate"
          />
          <label htmlFor="exampleInputAmount2">
            <span className="flaticon-percent"></span>
          </label>
        </div>
      </li>
      {/* End li */}

      <li className="search_area">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleInputYear"
            placeholder="Loan Term (Years)"
          />
          <label htmlFor="exampleInputYear">
            <span className="flaticon-calendar"></span>
          </label>
        </div>
      </li>
      {/* End li */}

      <li>
        <div className="search_option_two mb-3">
          <div className="candidate_revew_select">
            <select className="selectpicker w100 show-tick  form-select">
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
              <option>Daily</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </li>
      {/* End li */}
      <li>
        <div className="search_option_button style2">
          <button type="submit" className="btn btn-block btn-thm w-100">
            Search
          </button>
        </div>
      </li>
    </>
  );
};

export default MortgageFiltering;
