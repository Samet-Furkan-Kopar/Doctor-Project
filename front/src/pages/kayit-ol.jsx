import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import SignUp from "../components/register";
import Dashboard from "./dashboard";
import Secret from "../components/Secret";
import { getCurrentUser } from "../utils/auth";
import { useEffect, useState } from "react";
import generalServices from "../services/general.service";
import LoadingScreen from "../components/loading-screen";
const Index = () => {
  const [content, setContent] = useState({});
  const [close, setClose] = useState(false);

  useEffect(() => {
    generalServices.getPageSeoData("login").then((res) => {
      if (res?.success && res?.data?.length) {
        const contentData = res.data.find(
          (r) => r.page === "login" && r.type === "page"
        );
        if (contentData?.content) {
          setContent(contentData?.content);
        }
      }
      setClose(true);
    });
  }, []);

  return !close ? (
    <LoadingScreen close={close} />
  ) : (
    <Secret
      callback={() => {
        const user = getCurrentUser();
        if (!user) return true;

        return false;
      }}
      error={"/login"}
      render={
        <>
          <Seo pageTitle="Kayıt Ol" />
          <SignUp content={content} />
        </>
      }
    />
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
