const AdditionalDetails = () => {
    return (
      <>
        <div className="col-md-6 col-lg-6">
          <ul className="list-inline-item">
            <li>
              <p>
                Deposit : <span>20%</span>
              </p>
            </li>
            <li>
              <p>
                Pool Size : <span>300 Sqft</span>
              </p>
            </li>
            <li>
              <p>
                Additional Rooms : <span>Guest Bath</span>
              </p>
            </li>
          </ul>
        </div>
        <div className="col-md-6 col-lg-6">
          <ul className="list-inline-item">
            <li>
              <p>
                Last remodel year : <span>1987</span>
              </p>
            </li>
            <li>
              <p>
                Amenities : <span>Clubhouse</span>
              </p>
            </li>
            <li>
              <p>
                Equipment : <span>Grill - Gas</span>
              </p>
            </li>
          </ul>
        </div>
      </>
    );
  };
  
  export default AdditionalDetails;