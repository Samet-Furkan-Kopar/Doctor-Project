import dynamic from "next/dynamic";
import MyProfile from "../../components/dashboard/my-profile";
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
      error={"/login"}
      render={<MyProfile />}
    />
  );
}; 

export default dynamic(() => Promise.resolve(index), { ssr: false });
