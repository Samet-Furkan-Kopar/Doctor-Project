import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyProperties from "../../components/dashboard/my-properties";
import { getCurrentUser } from "../../utils/auth";
import Secret from "../../components/Secret";

const index = () => {
  return (
    <Secret
      callback={() => {
        const user = getCurrentUser();
        if (!user ) return false;
//|| user.type === "user" bu kısmı ekle
        return true;
      }}
      error={"/login"}
      render={
        <>
          <Seo pageTitle="Kayıtlı Bloglarım" />
          <MyProperties />
        </>
      }
    />
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });



