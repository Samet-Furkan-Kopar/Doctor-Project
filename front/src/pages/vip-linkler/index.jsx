import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyProperties from "../../components/dashboard/vip-links";
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
          <Seo pageTitle="VIP Linkler" />
          <MyProperties />
        </>
      }
    />
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });



