import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyProfile from "../../components/dashboard/my-profile";
import { useRouter } from "next/router";
import Secret from "../../components/Secret";
import Login from "../login";
import { getCurrentUser } from "../../utils/auth";
const Index = () => {
  const router = useRouter();
  const id = router.query.id;

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
          <Seo pageTitle="My Profile" />
          <MyProfile id={id} />
        </>
      }
    />
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
