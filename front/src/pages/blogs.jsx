import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import BlogV3 from "../components/blog-list-3";

const index = () => {
  return (
    <>
      <Seo pageTitle="Blog Yazılarımız" />
      <BlogV3 />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
