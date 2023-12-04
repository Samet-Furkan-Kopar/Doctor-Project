import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import HomeMain from "../components/home";
import { useEffect, useState } from "react";
import homePageServices from "../services/homepage.service";
import LoadingScreen from "../components/loading-screen";

const Index = () => {
  const [pageContent, setPageContent] = useState({});
  const [pageTitle, setPageTitle] = useState("Anasayfa");
  const [pageDescription, setPageDescription] = useState("");
  const [officeList, setOfficeList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [cityList, setCityList] = useState({});
  const [advertTypes, setAdvertTypes] = useState({});
  const [blog, setBlog] = useState({});
  const [initialStatus, setInitialStatus] = useState(true);
  const [advertList, setAdvertList] = useState([]);
  const [processTypes, setProcessTypes] = useState([])

  const [close, setClose] = useState(false);

  const getPageData = () => {
    setInitialStatus(false);
    homePageServices.getHomepageContent().then((res) => {
      if (res && res.succedd && res.data) {
        if (res?.data?.content) {
          setPageContent(res.data.content);
          res?.data?.content?.seo?.seoTitle &&
            setPageTitle(res?.data?.content?.seo?.seoTitle);
          res?.data?.content?.seo?.seoDescription &&
            setPageDescription(res?.data?.content?.seo?.seoDescription);
        }
        if (res?.data?.ofis?.length) setOfficeList(res?.data?.ofis);
        if (res?.data?.news?.length) setNewsList(res?.data?.news);
        if (res?.data?.advert?.length) setAdvertList(res?.data?.advert);
        if (res?.data?.blog?.length) setBlog(res?.data?.blog);
        if (res?.data?.city?.options?.length) setCityList(res?.data?.city.options);
        if (res?.data?.advertTypes?.length)
          setAdvertTypes(res?.data?.advertTypes);
        if (res?.data?.processtype?.length) setProcessTypes(res?.data?.processtype);
      }
      setClose(true);
    });
  };

  useEffect(() => {
    if (initialStatus) getPageData();
  }, []);

  return !close ? (
    <LoadingScreen close={close} />
  ) : (
    <>
      <Seo pageTitle={pageTitle} pageDescription={pageDescription} />
      <HomeMain
        content={pageContent}
        blog={blog}
        officeList={officeList}
        newsList={newsList}
        advertTypes={advertTypes}
        cityList={cityList}
        advertList={advertList}
        processTypes={processTypes}
      />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
