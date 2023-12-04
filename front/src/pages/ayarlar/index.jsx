import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import Settings from "../../components/dashboard/settings";
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
          <Seo pageTitle="Ayarlar" />
          <Settings />
        </>
      }
    />
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });



