import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import AgentDetails from "../../components/agent-details";

const index = () => {
  return (
    <>
      <Seo pageTitle="Ofislerimiz" />
      <AgentDetails />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
