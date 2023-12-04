import { use, useEffect, useState } from "react";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import AllStatistics from "./AllStatistics";
import StatisticsChart from "./StatisticsChart";
import generalServices from "../../../services/general.service";

const Index = () => {
  const [dashboardData, setDashboardData] = useState()
  const [chartDataset, setChartDataset] = useState({})

  const getUserDashboardData = () => {
    generalServices.dashboardData().then(res => {
      if (res?.succedd && res.data) {
        setDashboardData(res.data)
        if (res?.data?.numberOfAdvertClicks?.length) {
          const labels = res?.data?.numberOfAdvertClicks.map(n => n.label);
          const values = res?.data?.numberOfAdvertClicks.map(n => n.value);


          setChartDataset({
            labels,
            datasets: [
              {
                label: "Görüntülenme",
                data: values,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                fill: false,
              },
            ],
          })
        }
      }
    })
  }

  useEffect(() => {
    if (!dashboardData) getUserDashboardData()
  }, [])


  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">

              <div className="row">
                <AllStatistics dashboardData={dashboardData} />
              </div>
              {/* End .row Dashboard top statistics */}

              <div className="row justify-content-center">
                <div className="col-xl-9">
                  <div className="application_statics">
                    <h4 className="mb-4">İlan Görüntülenme</h4>
                    {Object.keys(chartDataset).length > 0 && <StatisticsChart dashboardData={dashboardData} chartDataset={chartDataset} />}
                  </div>
                </div>
                {/* End statistics chart */}
              </div>
              {/* End .row  */}

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>
                      &copy; {new Date().getFullYear()} Designed by{" "}
                      <a
                        href="https://www.sozlesmeliemlak.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Sözleşmeli Emlak
                      </a>
                      . All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;