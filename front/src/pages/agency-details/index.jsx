import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
// import AgencyDetails from "../../components/agency-details";

const index = () => {
  return (
    <>
      <Seo pageTitle="Agency Details" />
      {/* <AgencyDetails /> */}
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
