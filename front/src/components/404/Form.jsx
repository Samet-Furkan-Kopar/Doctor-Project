const Form = () => {
  return (
    <form className="form-inline mailchimp_form">
      <label className="sr-only" htmlFor="inlineFormInputName">
        Name
      </label>
      <input
        type="text"
        className="form-control mb-2 mr-sm-2"
        id="inlineFormInputName"
        placeholder="Search"
      />
      <button type="submit" className="btn btn-primary mb-2">
        <span className="flaticon-magnifying-glass"></span>
      </button>
    </form>
  );
};

export default Form;
