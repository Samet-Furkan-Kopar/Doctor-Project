import { useSelector } from "react-redux";
import Social from "../common/footer/Social";
import { useEffect, useState } from "react";

const AddressSidebar = () => {
  const state = useSelector((state) => state);
  const [phoneNumber, setPhoneNumber] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [facebookAddress, setFacebookAddress] = useState('')
  const [twitterAddress, setTwitterAddress] = useState('')
  const [linkedinAddress, setLinkedinAddress] = useState('')
  const [instagramAddress, setInstagramAddress] = useState('')
  const [youtubeAddress, setYoutubeAddress] = useState('')
  useEffect(() => {
    if (state?.generalSettings?.data?.settings && Object.keys(state.generalSettings?.data?.settings).length) {
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
    <div className="contact_localtion">
      <h4>Bize Ulaşın</h4>
      <div className="content_list">
        <h5>Adres</h5>
        <p>{companyAddress}</p>
      </div>
      <div className="content_list">
        <h5>Telefon</h5>
        <p>{phoneNumber}</p>
      </div>
      <div className="content_list">
        <h5>E-posta Adresi</h5>
        <p>{emailAddress}</p>
      </div>
      <h5>Follow Us</h5>
      <ul className="contact_form_social_area">
        <Social 
        facebookAddress={facebookAddress}
        twitterAddress={twitterAddress}
        linkedinAddress={linkedinAddress}
        instagramAddress={instagramAddress}
        youtubeAddress={youtubeAddress}
        />
      </ul>
    </div>
  );
};

export default AddressSidebar;
