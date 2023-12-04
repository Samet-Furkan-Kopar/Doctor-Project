import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import BlogDetails from "./[id]";

const index = () => {
  return (
    <>
      <Seo pageTitle="Blog Details" />
      <BlogDetails />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
