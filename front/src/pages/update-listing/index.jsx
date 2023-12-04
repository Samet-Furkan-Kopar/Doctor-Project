import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import UpdateListing from "../../components/dashboard/update-listing";

const index = () => {
  return (
    <>
      <Seo pageTitle="Update Listing" />
      <UpdateListing />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
