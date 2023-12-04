import Link from "next/link";
import Social from "./Social";
import SubscribeForm from "./SubscribeForm";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import generalServices from "../../../services/general.service";
import { setSettings } from "../../../features/settings/generalsetting";
import imageLoader from "../../../utils/imageLoader";
import logo from "../../../../public/assets/images/logo/logo.jpg"

const Footer = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [footerShortDesc, setFooterShortDesc] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [facebookAddress, setFacebookAddress] = useState('')
  const [twitterAddress, setTwitterAddress] = useState('')
  const [linkedinAddress, setLinkedinAddress] = useState('')
  const [instagramAddress, setInstagramAddress] = useState('')
  const [youtubeAddress, setYoutubeAddress] = useState('')
  const [logoUrl, setLogoUrl] = useState("/assets/images/logo/logo.jpg");



  useEffect(() => {
    if (!state?.generalSettings?.data || !Object.keys(state.generalSettings?.data).length) {
      generalServices.getGeneralSettings().then(res => {
        if (res?.succedd && res.data) {
          dispatch(setSettings(res.data))
        }
      })
    }
    if (Object.keys(state.generalSettings?.data).length) {
      state?.generalSettings?.data?.logo_url && setLogoUrl(state?.generalSettings?.data?.logo_url)
    }
  }, [state])





  useEffect(() => {
    if (state?.generalSettings?.data?.settings && Object.keys(state.generalSettings?.data?.settings).length) {
      state.generalSettings?.data?.settings.logo_url && setLogoUrl(state.generalSettings?.data?.settings.logo_url)
      state.generalSettings?.data?.settings.footer_short_desc && setFooterShortDesc(state.generalSettings?.data?.settings.footer_short_desc)
      state.generalSettings?.data?.settings.phone && setPhoneNumber(state.generalSettings?.data?.settings.phone)
      state.generalSettings?.data?.settings.email && setEmailAddress(state.generalSettings?.data?.settings.email)
      state.generalSettings?.data?.settings.address && setCompanyAddress(state.generalSettings?.data?.settings.address)
      state.generalSettings?.data?.settings.facebook && setFacebookAddress(state.generalSettings?.data?.settings.facebook)
      state.generalSettings?.data?.settings.twitter && setTwitterAddress(state.generalSettings?.data?.settings.twitter)
      state.generalSettings?.data?.settings.linkedin && setLinkedinAddress(state.generalSettings?.data?.settings.linkedin)
      state.generalSettings?.data?.settings.instagram && setInstagramAddress(state.generalSettings?.data?.settings.instagram)
      state.generalSettings?.data?.settings.youtube && setYoutubeAddress(state.generalSettings?.data?.settings.youtube)
    }
  }, [state])

  return (
    <>
      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 pr0 pl0">
        <div className="main_logo_home2 text-left" style={{ marginLeft: '-15px', marginTop: '-38px' }}>
          <Image
            loader={imageLoader}
            width={200}
            height={45}
            className="nav_logo_img contain mt20"
            src={logo}
            alt="Sözleşmeli Emlak"
          />
        </div>
        <div className="footer_about_widget">
          <p>
            {footerShortDesc}
          </p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_qlink_widget">
          <h4>Hızlı Bağlantılar</h4>
          <ul className="list-unstyled">
            <li>
              <Link href="/portfoylerimiz">Portföylerimiz</Link>
            </li>
            <li>
              <Link href="/kullanim-sartlari">Kullanım Şartları</Link>
            </li>
            <li>
              <Link href="/satis-sozlesmesi">Satış Sözleşmesi</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_contact_widget">
          <h4>Bize Ulaşın!</h4>
          <ul className="list-unstyled">
            <li>
              <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
            </li>
            <li>
              <a href="#">{companyAddress}</a>
            </li>
            <li>
              <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_social_widget">
          <h4>Bizi Takip Edin</h4>
          <ul className="mb30">
            <Social facebookAddress={facebookAddress}
              twitterAddress={twitterAddress}
              linkedinAddress={linkedinAddress}
              instagramAddress={instagramAddress}
              youtubeAddress={youtubeAddress} />
          </ul>
          <h4>Abone Olun</h4>
          <SubscribeForm />
        </div>
      </div>
    </>
  );
};

export default Footer;
