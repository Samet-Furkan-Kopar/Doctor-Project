import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import Select from 'react-select';

import { useEffect, useState } from 'react';
import settingsServices from '../../services/settings.service';

const messageContentType = [
    { label: "Ticari", value: "ticari" },
    { label: "Bilgi", value: "bilgi" }
]
type settingsInfo = {
    api_id?: string,
    api_key?: string,
    senderName?: string,
    message_content_type?: string
}

const SmsSettings = (props: any) => {
    const [actionLoadingStatus, setActionLoadingStatus] = useState(false)
    const [settingData, setSettingData] = useState<settingsInfo>({
       
    })
    const SubmittedForm = Yup.object().shape({
        api_id: Yup.string().required('Lütfen API ID Giriniz'),
        api_key: Yup.string().required('Lütfen API Key Giriniz'),
        senderName: Yup.string().required('Lütfen Gönderici Adını Giriniz'),
        message_content_type: Yup.object().required('Lütfen Mesaj İçerik Tipini Seçiniz'),
    });


    const getCategoryList = () => {
        settingsServices.getSmsSetting().then((res:any) => {
            if (res?.succedd && res?.getAll?.length > 0) {
                setSettingData(res?.getAll[0]);
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
        const formObj = {
            api_id: values.api_id,
            api_key: values.api_key,
            senderName: values.senderName,
            message_content_type: values.message_content_type.value
        }

        settingsServices.smsSettingAdd(formObj).then((res:any) => {
            setActionLoadingStatus(false)
            if (!res || res?.error || res?.status === 'fail' || res?.succedd === false) {
                if(res?.message){
                    Swal.fire({ title: 'Hata!', text: res?.message, icon: 'error', customClass: 'sweet-alerts' });
                }else{
                    Swal.fire({ title: 'Hata!', text: 'İşlem Gerçekleştirilirken Hata İle Karşılaşıldı.', icon: 'error', customClass: 'sweet-alerts' });
                }
            } else {
                Swal.fire({ title: 'Eklendi!', text: 'Sms Ayarları Başarılı Bir Şekilde Eklendi.', icon: 'success', customClass: 'sweet-alerts' });
            }
        })
    }


    return (
        <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
            <h6 className="text-lg font-bold mb-5">Sms Ayarları</h6>
            <Formik
                initialValues={{
                    api_id: Object.keys(settingData).length > 0 && settingData.api_id ? settingData.api_id : '',
                    api_key: Object.keys(settingData).length > 0 && settingData.api_key ? settingData.api_key : '',
                    senderName: Object.keys(settingData).length > 0 && settingData.senderName ? settingData.senderName : '',
                    message_content_type: Object.keys(settingData).length > 0 && settingData.message_content_type  ? messageContentType.find(m => m.value == settingData.message_content_type) : '',
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
                                    <div className={submitCount ? (errors.api_id ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="api_id">API ID </label>
                                        <Field name="api_id" type="text" id="api_id" placeholder="Host Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.api_id ? <div className="text-danger mt-1">{errors.api_id}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.api_key ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="api_key">API Key </label>
                                        <Field name="api_key" id="api_key" type="text" placeholder="API Key Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.api_key ? <div className="text-danger mt-1">{errors.api_key}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.senderName ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="senderName">Gönderen Adı </label>
                                        <Field name="senderName" id="senderName" type="text" placeholder="Gönderici Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.senderName ? <div className="text-danger mt-1">{errors.senderName}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.message_content_type ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="message_content_type">Mesaj Tipi</label>
                                        <Select onChange={(e) => setFieldValue('message_content_type', e)}  value={values.message_content_type} className={submitCount ? (errors.message_content_type ? 'has-error' : 'has-success') : ''} options={messageContentType} name='message_content_type' placeholder="Lütfen Mesaj İçerik Tipini Belirtiniz" isSearchable={true} />
                                        {submitCount ? errors.message_content_type ? <div className="text-danger mt-1">{errors.message_content_type}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
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

export default SmsSettings;
