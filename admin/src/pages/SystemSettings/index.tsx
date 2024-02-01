import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import MaskedInput from 'react-text-mask';

import { useEffect, useState } from 'react';
import settingsServices from '../../services/settings.service';

type settingsInfo = {
    email?: string,
    title?: string,
    seo_description?: string,
    phone?: string,
    address?: string,
    twitter?: string,
    facebook?: string,
    instagram?: string,
    youtube?: string,
    linkedin?: string,
    copyright?: string,
    footer_short_desc?: string,
    footer_news_desc?: string,
    mobile_menu_desc?: string,
    latitude?: string,
    longitude?: string,
    head_head?: string,
    body_body?: string,
}


const SystemSettings = (props: any) => {
    const [settingData, setSettingData] = useState<settingsInfo>({})
    const [shorticonPreview, setShorticonPreview] = useState('');
    const [logoPreview, setLogoPreview] = useState('');
    const [logoImage, setLogoIconImage] = useState(null)
    const [shortIconImage, setShortIconImage] = useState(null)
    const [actionLoadingStatus, setActionLoadingStatus] = useState(false)

    const SubmittedForm = Yup.object().shape({
        email: Yup.string().email('Lütfen e-posta adresinizi kontrol ediniz').required('Lütfen API ID Giriniz'),
        title: Yup.string().required('Lütfen Site Başlığını Giriniz'),
        phone: Yup.string().required('Lütfen İletişim Numarasını Giriniz'),
        address: Yup.string().required('Lütfen Adres Bilgisini Giriniz'),
    });


    const getCategoryList = () => {
        settingsServices.getSystemSetting().then((res: any) => {
            if (res?.succedd && res?.data?.settings) {
                setSettingData(res?.data.settings);
                if (Object.keys(res?.data.settings).length > 0 && res?.data.settings.shorticon) {
                    setShorticonPreview(res?.data.settings.shorticon)
                }
                if (Object.keys(res?.data.settings).length > 0 && res?.data.settings.logo_url) {
                    setLogoPreview(res?.data.settings.logo_url)
                }
            }
        })
    }

    useEffect(() => {
        const fetchSettingData = () => {
            getCategoryList();
        }

        if (Object.keys(settingData).length == 0) fetchSettingData()
    }, [])


    const onSubmit = async (values: any) => {
        setActionLoadingStatus(true)
        const fd = new FormData();
        fd.append('email', values.email);
        fd.append('title', values.title);
        fd.append('seo_description', values.seo_description);
        fd.append('phone', values.phone);
        fd.append('address', values.address);
        fd.append('twitter', values.twitter);
        fd.append('facebook', values.facebook);
        fd.append('instagram', values.instagram);
        fd.append('linkedin', values.linkedin);
        fd.append('youtube', values.youtube);
        fd.append('copyright', values.copyright);
        fd.append('footer_short_desc', values.footer_short_desc);
        fd.append('footer_news_desc', values.footer_news_desc);
        fd.append('mobile_menu_desc', values.mobile_menu_desc);
        fd.append('latitude', values.latitude);
        fd.append('longitude', values.longitude);
        fd.append('head_head', values.head_head);
        fd.append('body_body', values.body_body);


        settingsServices.systemSettingAdd(fd).then((res: any) => {
            setActionLoadingStatus(false)
            if (!res || res?.error || res?.status === 'fail' || res?.succedd === false) {
                if (res?.message) {
                    Swal.fire({ title: 'Hata!', text: res?.message, icon: 'error', customClass: 'sweet-alerts' });
                } else {
                    Swal.fire({ title: 'Hata!', text: 'İşlem Gerçekleştirilirken Hata İle Karşılaşıldı.', icon: 'error', customClass: 'sweet-alerts' });
                }
            } else {
                Swal.fire({ title: 'Eklendi!', text: 'Sistem Ayarları Başarılı Bir Şekilde Eklendi.', icon: 'success', customClass: 'sweet-alerts' });
            }
        })
    }

    return (
        <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
            <h6 className="text-lg font-bold mb-5">Genel Site Ayarları</h6>
            <Formik
                initialValues={{
                    email: Object.keys(settingData).length > 0 && settingData.email ? settingData.email : '',
                    title: Object.keys(settingData).length > 0 && settingData.title ? settingData.title : '',
                    seo_description: Object.keys(settingData).length > 0 && settingData.seo_description ? settingData.seo_description : '',
                    phone: Object.keys(settingData).length > 0 && settingData.phone ? settingData.phone : '',
                    address: Object.keys(settingData).length > 0 && settingData.address ? settingData.address : '',
                    twitter: Object.keys(settingData).length > 0 && settingData.twitter ? settingData.twitter : '',
                    facebook: Object.keys(settingData).length > 0 && settingData.facebook ? settingData.facebook : '',
                    instagram: Object.keys(settingData).length > 0 && settingData.instagram ? settingData.instagram : '',
                    linkedin: Object.keys(settingData).length > 0 && settingData.linkedin ? settingData.linkedin : '',
                    youtube: Object.keys(settingData).length > 0 && settingData.youtube ? settingData.youtube : '',
                    copyright: Object.keys(settingData).length > 0 && settingData.copyright ? settingData.copyright : '',
                    footer_short_desc: Object.keys(settingData).length > 0 && settingData.footer_short_desc ? settingData.footer_short_desc : '',
                    footer_news_desc: Object.keys(settingData).length > 0 && settingData.footer_news_desc ? settingData.footer_news_desc : '',
                    mobile_menu_desc: Object.keys(settingData).length > 0 && settingData.mobile_menu_desc ? settingData.mobile_menu_desc : '',
                    latitude: Object.keys(settingData).length > 0 && settingData.latitude ? settingData.latitude : '',
                    longitude: Object.keys(settingData).length > 0 && settingData.longitude ? settingData.longitude : '',
                    head_head: Object.keys(settingData).length > 0 && settingData.head_head ? settingData.head_head : '',
                    body_body: Object.keys(settingData).length > 0 && settingData.body_body ? settingData.body_body : '',
                }}
                validationSchema={SubmittedForm}
                enableReinitialize
                onSubmit={onSubmit}
            >
                {({ errors, submitCount, setFieldValue, values }) => (
                    <div className="flex flex-col sm:flex-row">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 gap-5">
                            <Form className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className={submitCount ? (errors.email ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="email">E-posta Adresi </label>
                                        <Field name="email" type="text" id="email" placeholder="E-posta Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.email ? <div className="text-danger mt-1">{errors.email}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.title ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="title">Site Başlığı </label>
                                        <Field name="title" id="title" type="text" placeholder="Site Başlık Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.title ? <div className="text-danger mt-1">{errors.title}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.seo_description ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="seo_description">Seo Description </label>
                                        <Field name="seo_description" id="seo_description" type="text" placeholder="Seo Description Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.seo_description ? <div className="text-danger mt-1">{errors.seo_description}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.phone ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="phone">Site İletişim Numarası </label>
                                        <MaskedInput
                                            id="phoneMask"
                                            type="text"
                                            placeholder="(___) ___-____"
                                            className="form-input"
                                            name='phone'
                                            defaultValue={values.phone}
                                            onChange={(e) => setFieldValue('phone', e.target.value)}
                                            mask={['(', /[0-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                                        />
                                        {/* <Field name="phone" id="phone" type="text" placeholder="İletişim Bilgisini Giriniz" className="form-input" /> */}
                                        {submitCount ? errors.phone ? <div className="text-danger mt-1">{errors.phone}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.address ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="address">Adres </label>
                                        <Field name="address" id="address" type="text" placeholder="Adres Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.address ? <div className="text-danger mt-1">{errors.address}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.twitter ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="twitter">Twitter Adresi </label>
                                        <Field name="twitter" id="twitter" type="text" placeholder="Twitter Hesap Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.twitter ? <div className="text-danger mt-1">{errors.twitter}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.facebook ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="facebook">Facebook Adresi </label>
                                        <Field name="facebook" id="facebook" type="text" placeholder="Facebook Hesap Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.facebook ? <div className="text-danger mt-1">{errors.facebook}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.instagram ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="instagram">Instagram Adresi </label>
                                        <Field name="instagram" id="instagram" type="text" placeholder="Instagram Hesap Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.instagram ? <div className="text-danger mt-1">{errors.instagram}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.linkedin ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="linkedin">Linkedin Adresi </label>
                                        <Field name="linkedin" id="linkedin" type="text" placeholder="Linkedin Hesap Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.linkedin ? <div className="text-danger mt-1">{errors.linkedin}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.youtube ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="youtube">Youtube Adresi </label>
                                        <Field name="youtube" id="youtube" type="text" placeholder="Youtube Hesap Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.youtube ? <div className="text-danger mt-1"><>{errors.youtube}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.copyright ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="copyright">Copyright Metni </label>
                                        <Field name="copyright" id="copyright" type="text" placeholder="Copyright Metin Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.copyright ? <div className="text-danger mt-1">{errors.copyright}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.footer_short_desc ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="footer_short_desc">Footer Logo Altı Metni </label>
                                        <Field name="footer_short_desc" id="footer_short_desc" type="text" placeholder="Footer Logo Altı Metin Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.footer_short_desc ? <div className="text-danger mt-1">{errors.footer_short_desc}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.footer_news_desc ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="footer_news_desc">Footer Haberler Metni </label>
                                        <Field name="footer_news_desc" id="footer_news_desc" type="text" placeholder="Footer Haberler Metin Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.footer_news_desc ? <div className="text-danger mt-1">{errors.footer_news_desc}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.mobile_menu_desc ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="mobile_menu_desc">Mobil Menü Açıklama Metni </label>
                                        <Field name="mobile_menu_desc" id="mobile_menu_desc" type="text" placeholder="Mobil Menu Metin Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.mobile_menu_desc ? <div className="text-danger mt-1">{errors.mobile_menu_desc}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.latitude ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="latitude">Latitude </label>
                                        <Field name="latitude" id="latitude" type="text" placeholder="Konum Latitude Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.latitude ? <div className="text-danger mt-1">{errors.latitude}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.longitude ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="longitude">Longitude </label>
                                        <Field name="longitude" id="longitude" type="text" placeholder="Konum Longitude Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.longitude ? <div className="text-danger mt-1">{errors.longitude}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                    <div className={submitCount ? (errors.head_head ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="head_head">Head Head Scripts </label>
                                        <Field name="head_head" id="head_head" as="textarea" type="text" placeholder="Head Head Script Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.head_head ? <div className="text-danger mt-1">{errors.head_head}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                    <div className={submitCount ? (errors.body_body ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="body_body">Body Body Scripts </label>
                                        <Field name="body_body" id="body_body" as="textarea" type="text" placeholder="Body Body Script Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.body_body ? <div className="text-danger mt-1">{errors.body_body}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                </div>

                                {actionLoadingStatus ?
                                    <button
                                        type="submit"
                                        className="btn btn-primary !mt-6"
                                        disabled
                                    >
                                        <span className="animate-spin border-4 border-warning border-l-transparent rounded-full w-10 h-10 inline-block align-middle m-auto me-2"></span>
                                        Yükleniyor
                                    </button> :
                                    <button
                                        type="submit"
                                        className="btn btn-primary !mt-6"
                                    >
                                        Kaydet
                                    </button>
                                }
                            </Form>
                        </div>
                    </div>
                )}
            </Formik>
        </div >
    );
};

export default SystemSettings;
