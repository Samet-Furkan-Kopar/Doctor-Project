import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';

import Select from 'react-select';

import { useEffect, useState } from 'react';
import settingsServices from '../../services/settings.service';


type settingsInfo = {
    apiKey?: string
}


const ChatGPTSettings = (props: any) => {
    const [settingData, setSettingData] = useState<settingsInfo>({})
    const [actionLoadingStatus, setActionLoadingStatus] = useState(false)
    const SubmittedForm = Yup.object().shape({
        apiKey: Yup.string().required('Lütfen Api Key Giriniz'),
    });


    const getCategoryList = () => {
        settingsServices.getChatGPTSetting().then((res:any) => {
            if (res?.succedd && res?.data?.length > 0) {
                setSettingData(res?.data[0]);
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
            apiKey: values.apiKey
        }
        settingsServices.chatGPTSettingAdd(formObj).then((res:any) => {
            setActionLoadingStatus(false)
            if (!res || res?.error || res?.status === 'fail' || res?.succedd === false) {
                if(res?.message){
                    Swal.fire({ title: 'Hata!', text: res?.message, icon: 'error', customClass: 'sweet-alerts' });
                }else{
                    Swal.fire({ title: 'Hata!', text: 'İşlem Gerçekleştirilirken Hata İle Karşılaşıldı.', icon: 'error', customClass: 'sweet-alerts' });
                }
            } else {
                Swal.fire({ title: 'Eklendi!', text: 'Chat GPT Ayarları Başarılı Bir Şekilde Eklendi.', icon: 'success', customClass: 'sweet-alerts' });
            }
        })

    }


    return (
        <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
            <h6 className="text-lg font-bold mb-5">Chat GPT Ayarları</h6>
            <Formik
                initialValues={{
                    apiKey: Object.keys(settingData).length > 0 && settingData.apiKey ? settingData.apiKey : '',
                }}
                validationSchema={SubmittedForm}
                enableReinitialize
                onSubmit={onSubmit}
            >
                {({ errors, submitCount }) => (
                    <div className="flex flex-col sm:flex-row">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 gap-5">
                            <Form className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className={submitCount ? (errors.apiKey ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="apiKey">API Key </label>
                                        <Field name="apiKey" type="text" id="apiKey" placeholder="API Key Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.apiKey ? <div className="text-danger mt-1">{errors.apiKey}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
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

export default ChatGPTSettings;
