const Attachments = () => {
  return (
    <>
      <div className="icon_box_area style2">
        <div className="score">
          <span className="flaticon-document text-thm fz30"></span>
        </div>
        <div className="details">
          <h5>
            <span className="flaticon-download text-thm pr10"></span> Demo Word
            Document
          </h5>
        </div>
      </div>
      {/* End .icon_box_area */}

      <div className="icon_box_area style2">
        <div className="score">
          <span className="flaticon-pdf text-thm fz30"></span>
        </div>
        <div className="details">
          <h5>
            <span className="flaticon-download text-thm pr10"></span> Demo pdf
            Document
          </h5>
        </div>
      </div>
    </>
  );
};

export default Attachments;