import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import { useState } from 'react';
import settingsServices from '../../services/settings.service';

const ProfileSettings = (props: any) => {
    const [actionLoadingStatus, setActionLoadingStatus] = useState(false)
    const SubmittedForm = Yup.object().shape({
        password: Yup.string().min(8),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords not match'),
    });


    const onSubmit = async (values: any) => {
        setActionLoadingStatus(true)
        const formObj = {
            newpassword: values.password,
            confirm_password: values.confirmPassword,
        }

        settingsServices.restartAdminPassword(formObj).then((res:any) => {
            setActionLoadingStatus(false)
            if (!res || res?.error || res?.status === 'fail' || res?.succedd === false) {
                if(res?.message){
                    Swal.fire({ title: 'Hata!', text: res?.message, icon: 'error', customClass: 'sweet-alerts' });
                }else{
                    Swal.fire({ title: 'Hata!', text: 'İşlem Gerçekleştirilirken Hata İle Karşılaşıldı.', icon: 'error', customClass: 'sweet-alerts' });
                }
            } else {
                Swal.fire({ title: 'Eklendi!', text: 'Şifre Başarılı Bir Şekilde Güncellendi.', icon: 'success', customClass: 'sweet-alerts' });
            }
        })
    }


    return (
        <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
            <h6 className="text-lg font-bold mb-5">Şifre Ayarları</h6>
            <Formik
                initialValues={{
                    password: '',
                    confirmPassword: '',
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
                                    <div className={submitCount ? (errors.password ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="password">Şifre </label>
                                        <Field name="password" type="password" id="password" placeholder="Yeni Şifrenizi Giriniz" className="form-input" />
                                        {submitCount ? errors.password ? <div className="text-danger mt-1">{errors.password}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className={submitCount ? (errors.confirmPassword ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="confirmPassword">Şifre Tekrarı </label>
                                        <Field name="confirmPassword" id="confirmPassword" type="password" placeholder="Yeni Şifrenizi Tekrar Giriniz" className="form-input" />
                                        {submitCount ? errors.confirmPassword ? <div className="text-danger mt-1">{errors.confirmPassword}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
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
                                        Güncelle
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

export default ProfileSettings;
