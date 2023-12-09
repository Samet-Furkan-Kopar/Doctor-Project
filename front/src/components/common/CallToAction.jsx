import Link from "next/link";

const CallToAction = () => {
  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="start_partner tac-smd">
          <h2>Bizimle Çalışmak İster Misin ?</h2>
          <p>Çok daha geniş portföyde Kişilere ulaşabilir ve daha hızlı sonuç alabilirsiniz.</p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4">
        <div className="parner_reg_btn text-right tac-smd">
          <Link href="/kayit-ol" className="btn btn-thm2">
            Şimdi Başla!
          </Link>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default CallToAction;
