const ReviewBox = () => {
  return (
    <form className="comments_form">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Review Title"
          required
        />
      </div>
      {/* End .form-group */}

      <div className="form-group">
        <textarea
          className="form-control"
          rows="6"
          placeholder="Your Review"
          required
        ></textarea>
      </div>
      {/* End .form-group */}

      <button type="submit" className="btn btn-thm">
        Submit Review
      </button>
      {/* End .btn */}
    </form>
  );
};

export default ReviewBox;
