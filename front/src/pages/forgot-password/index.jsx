import React from "react";
import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import ForgotPassword from "../../components/forgot-password";

const index = () => {
  return (
    <>
      <Seo pageTitle="Forgot Password" />
      <ForgotPassword />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
