import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Contact from "../components/contact";
import { useEffect, useState } from "react";
import generalServices from "../services/general.service";
import LoadingScreen from "../components/loading-screen";
const Index = () => {
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [content, setContent] = useState({});
  const [close, setClose] = useState(false);

  useEffect(() => {
    if (!seoTitle && !seoDescription) {
      generalServices.getPageSeoData("contact").then((res) => {
        if (res?.success && res?.data?.length) {
          const targetData = res.data.find(
            (r) => r.page === "contact" && r.type === "seo"
          );
          if (targetData?.content) {
            targetData?.content?.seoTitle &&
              setSeoTitle(targetData?.content?.seoTitle);
            targetData?.content?.seoDescription &&
              setSeoDescription(targetData?.content?.seoDescription);
          }
          const contentData = res.data.find(
            (r) => r.page === "contact" && r.type === "general"
          );
          if (contentData?.content) {
            setContent(contentData?.content);
          }
        }
        setClose(true);
      });
    }
  }, []);

  return !close ? (
    <LoadingScreen close={close} />
  ) : (
    <>
      <Seo
        pageTitle={seoTitle || "İletişim"}
        pageDescription={seoDescription}
      />
      <Contact content={content} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
