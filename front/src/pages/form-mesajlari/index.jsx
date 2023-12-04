import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyProperties from "../../components/dashboard/form-messages";

const index = () => {
  return (
    <>
      <Seo pageTitle="Form Mesajlarım" />
      <MyProperties />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
