const FaqContent = ({ questions, order }) => {
  console.log("JJJ", questions);
  return (
    <>
      <div className="accordion" id={`accordionExample-${order}`}>
        {questions?.length
          ? questions.map((q, k) => (
              <div className="card" key={q._id}>
                <div id={`headingOne-${q._id}`}>
                  <button
                    className="btn btn-link accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseOne-${q._id}`}
                    aria-expanded="false"
                    aria-controls={`collapseOne-${q._id}`}
                  >
                    {q.title}
                  </button>
                </div>

                <div
                  id={`collapseOne-${q._id}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`headingOne-${q._id}`}
                  data-bs-parent={`#accordionExample-${order}`}
                >
                  <div className="card-body">{q.title}</div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </>
  );
};

export default FaqContent;
