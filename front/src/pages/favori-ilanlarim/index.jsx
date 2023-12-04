import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyProperties from "../../components/dashboard/favori-ilanlar";

const index = () => {
  return (
    <>
      <Seo pageTitle="Favori İlanlarım" />
      <MyProperties />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
