import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import UpdateListing from "../../components/dashboard/update-listing";
import { useRouter } from "next/router";
import { getCurrentUser } from "../../utils/auth";
import Secret from "../../components/Secret";

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
          <Seo pageTitle="İlan Güncelle" />
          <UpdateListing id={id} />
        </>
      }
    />
  );

};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
