import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import CreateListing from "../../components/dashboard/create-listing";
import { getCurrentUser } from "../../utils/auth";
import Secret from "../../components/Secret";

const index = () => {
  return (
    <Secret
      callback={() => {
        const user = getCurrentUser();
        if (!user) return false;

        return true;
      }}
      error={"/login"}
      render={
        <>
          <Seo pageTitle="İlan Ekle" />
          <CreateListing />
        </>
      }
    />
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });


