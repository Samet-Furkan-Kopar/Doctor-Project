import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import Dashboard from "../../components/dashboard/my-dashboard/index";
import Secret from "../../components/Secret";
import Login from "../../pages/login";
import { getCurrentUser } from "../../utils/auth";

const index = () => {
  return (
    <Secret
      callback={() => {
        const user = getCurrentUser();
        if (!user) return false;

        return true;
      }}
      error="/login"
      render={
        <>
          <Seo pageTitle="Dashboard" />
          <Dashboard />
        </>
      }
    />
  
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
