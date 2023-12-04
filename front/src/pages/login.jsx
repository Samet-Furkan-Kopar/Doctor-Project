import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Login from "../components/login";
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
    <>
      <Seo pageTitle="Giriş Yap" />
      <Login content={content} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
