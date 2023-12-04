import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import NotFound from "../components/404";

const index = () => {
  return (
    <>
      <Seo pageTitle="404 Not Found" />
      <NotFound />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
