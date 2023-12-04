import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import GridV2 from "../../components/listing-gridb/grid-v2"
import { useEffect, useState } from "react";
import generalServices from "../../services/general.service";
import LoadingScreen from "../../components/loading-screen";

const Index = () => {
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const [close, setClose] = useState(false);
  // useEffect(() => {
  //   if (!seoTitle && !seoDescription) {
  //     generalServices.getPageSeoData("adverts").then((res) => {
  //       if (res?.success && res?.data?.length) {
  //         const targetData = res.data.find(
  //           (r) => r.page === "adverts" && r.type === "seo"
  //         );
  //         if (targetData?.content) {
  //           targetData?.content?.seoTitle &&
  //             setSeoTitle(targetData?.content?.seoTitle);

  //           targetData?.content?.seoDescription &&
  //             setSeoDescription(targetData?.content?.seoDescription);

  //           setClose(true);
  //         }
  //       }
  //     });
  //   }
  // }, []);

  return (
    <>
      <Seo
        pageTitle={seoTitle || "Bloglar"}
        pageDescription={seoDescription}
      />
      <GridV2 />
    </>
  )
  
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
