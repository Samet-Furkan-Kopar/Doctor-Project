import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import 'tippy.js/dist/tippy.css';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import userServices from '../../../../services/user.service';
import MaskedInput from 'react-text-mask';
import Select from 'react-select';
import locationServices from '../../../../services/location.service';

const statusOpt:any = [
    { label: 'Pasif', value: false },
    { label: 'Aktif', value: true },
];
const languageOpt:any = [
    { label: 'TR', value: "TR" },
    { label: 'EN', value: "EN" },
];


const AddNewUser = (props: any) => {
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
    const [actionLoadingStatus, setActionLoadingStatus] = useState(false)
    const [countryList, setCountryList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [neighbourhoodList, setNeighbourhoodList] = useState([]);
    const [roleList, setRoleList] = useState([]);
    const [imgPreview, setImgPreview] = useState<string>('')
    const [targetImage, setTargetImage] = useState(null)

    const SubmittedForm = Yup.object().shape({
        phoneNumber: Yup.string().required('Lütfen Kullanıcı Telefon Bilgisini Giriniz'),
        firstName: Yup.string().required('Lütfen Kullanıcı İsim Bilgisini Giriniz'),
        lastName: Yup.string().required('Lütfen Kullanıcı Soyisim Bilgisini Giriniz'),
        password: Yup.string().min(8, 'Şifre en az 8 karakter içermeli').required('Lütfen Kullanıcı Şifresini Bilgisini Giriniz'),
        email: Yup.string().email('Lütfen E-posta adresinizi kontrol ediniz').required('Lütfen E-posta Adresinizi Giriniz'),
        isApproved: Yup.object().required('Lütfen Hesap Aktivasyon Bilgisini Giriniz'),
        advisorTypeId: Yup.object().required('Lütfe Kullanıcı Rol Bilgisini Giriniz'),
        language: Yup.object().required('Lütfen Kullanıcı Dil Bilgisini Giriniz'),
        isStatus: Yup.object().required('Lütfen Hesap Durum Bilgisini Giriniz'),
    });

    useEffect(() => {
        if(props.addModal && props.corporateAdminId){

            userServices.getUserRoleList(props.corporateAdminId).then((res:any) => {
                if (res.succeded && res.data?.length) {
                    console.log('res.data role', res.data);
                    setRoleList(res.data.map((r:any) => ({label: r.role, value: r._id})))

                }
            })

        }
    }, [props.addModal,props.corporateAdminId])






    const checkValidation = (values: any) => {
        let errors: any = {};
        if (!values.phoneNumber) {
            errors.phoneNumber = "Lütfen Telefon Numarasını Giriniz";
        } else {
            const targetNum = values.phoneNumber.replace(/\s/g, '').replace('(', '').replace(')', '').replace('-', '').split('_');
            let formattedNum = `0${targetNum[0]}`
            if (formattedNum.length < 11) {
                errors.phoneNumber = "Lütfen Telefon Numarasını Kontrol Ediniz";
            }
        }

        return errors;
    }

    const onSubmit = async (values: any) => {
        setActionLoadingStatus(true)
        const fd = new FormData();
        fd.append('phoneNumber', formattedPhoneNumber)
        fd.append('firstName', values.firstName);
        fd.append('lastName', values.lastName)
        fd.append('email', values.email)
        if (values.password) fd.append('password', values.password)
        fd.append('isApproved', values.isApproved.value)
        fd.append('advisorTypeId', values.advisorTypeId.value)
        fd.append('isStatus', values.isStatus.value)
        fd.append('language', values.language.value)

        await userServices.storeSubUser(fd,props.corporateAdminId).then((res: any) => {
            setActionLoadingStatus(false)
            if (!res || res?.error || res?.status === 'fail' || res?.succedd === false) {
                if (res?.message) {
                    Swal.fire({ title: 'Hata!', text: res?.message, icon: 'error', customClass: 'sweet-alerts' });
                } else {
                    Swal.fire({ title: 'Hata!', text: 'İşlem Gerçekleştirilirken Hata İle Karşılaşıldı.', icon: 'error', customClass: 'sweet-alerts' });
                }
            } else {
                Swal.fire({ title: 'Eklendi!', text: 'Kullanıcı Kaydı Başarılı Bir Şekilde Eklendi.', icon: 'success', customClass: 'sweet-alerts' });
                props.reloadEnterpriseUserList();
                props.setAddModal(false)
            }
        });
    };

    return (
        <div>
            <Transition appear show={props.addModal} as={Fragment}>
                <Dialog as="div" open={props.addModal} onClose={() => {
                    props.setAddModal(false)
                }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="slideIn_down_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <Dialog.Panel style={{ minWidth: '80%' }} className="panel border-0 p-0 rounded-lg w-full max-w-lg my-8 text-black dark:text-white-dark animate__animated animate__slideInDown">
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <h5 className="font-bold text-lg">Kullanıcı Ekle</h5>
                                    <button onClick={() => props.setAddModal(false)} type="button" className="text-white-dark hover:text-dark">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"></circle><path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>
                                    </button>
                                </div>

                                <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                                    <h6 className="text-lg font-bold mb-5">Kurumsal Kullanıcı</h6>
                                    <Formik
                                        initialValues={{
                                            phoneNumber:  '',
                                            firstName:  '',
                                            lastName:  '',
                                            email: '',
                                            language:  "",
                                            advisorTypeId: '',
                                            password: '',
                                            isApproved: { label: 'Pasif', value: false },
                                            isStatus: { label: 'Pasif', value: false }
                                        }}
                                        validationSchema={SubmittedForm}
                                        validate={checkValidation}
                                        enableReinitialize
                                        onSubmit={onSubmit}
                                    >
                                        {({ handleChange, setFieldValue, values, errors, touched, submitCount }) => (
                                            <div className="flex flex-col sm:flex-row">
                                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 gap-5">
                                                    <Form className="space-y-5" autoComplete='off'>

                                                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                                        <div className={submitCount ? (errors.firstName ? 'has-error' : 'has-success') : ''}>
                                                                <label htmlFor="firstName">İsim </label>
                                                                <Field name="firstName" type="text" id="firstName" autoComplete='off' placeholder="Kullanıcı İsmini Giriniz" className="form-input" />
                                                                {submitCount ? errors.firstName ? <div className="text-danger mt-1"><>{errors.firstName}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                            </div>
                                                            <div className={submitCount ? (errors.lastName ? 'has-error' : 'has-success') : ''}>
                                                                <label htmlFor="lastName">Soyisim </label>
                                                                <Field name="lastName" type="text" id="lastName" autoComplete='off' placeholder="Kullanıcı Soyismini Giriniz" className="form-input" />
                                                                {submitCount ? errors.lastName ? <div className="text-danger mt-1"><>{errors.lastName}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                            </div>
                                                            <div className={submitCount ? (errors.email ? 'has-error' : 'has-success') : ''}>
                                                                <label htmlFor="email">E-posta Adresi</label>
                                                                <Field name="email" type="email" id="email" autoComplete='off' placeholder="Kullanıcı E-posta Adresini Giriniz" className="form-input" />
                                                                {submitCount ? errors.email ? <div className="text-danger mt-1"><>{errors.email}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                            </div>
                                                            <div className={submitCount ? (errors.password ? 'has-error' : 'has-success') : ''}>
                                                                <label htmlFor="password">Kullanıcı Şifre</label>
                                                                <Field name="password" type="password" id="password" autoComplete='off' placeholder="Kullanıcı Paralosını Giriniz" className="form-input" />
                                                                {submitCount ? errors.password ? <div className="text-danger mt-1">{errors.password}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                            </div>
                                                            <div className={submitCount ? (errors.phoneNumber ? 'has-error' : 'has-success') : ''}>
                                                                <label htmlFor="phoneNumber">Telefon Numarası </label>
                                                                <MaskedInput
                                                                    id="phoneMask"
                                                                    type="text"
                                                                    name="phoneNumber"
                                                                    placeholder="(___) ___-____"
                                                                    value={values.phoneNumber}
                                                                    onChange={(e) => {
                                                                        setFieldValue('phoneNumber', e.target.value)
                                                                        const targetNum = e.target.value.replace(/\s/g, '').replace('(', '').replace(')', '').replace('-', '').split('_');
                                                                        let formattedNum = `0${targetNum[0]}`
                                                                        setFormattedPhoneNumber(formattedNum)
                                                                    }}
                                                                    className="form-input"
                                                                    mask={['(', /[1-9]/, /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                                                                />
                                                                {submitCount ? errors.phoneNumber ? <div className="text-danger mt-1"><>{errors.phoneNumber}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                            </div>
                                                            <div>
                                                                <label htmlFor="advisorTypeId">Kullanıcı Rolü</label>
                                                                <Select onChange={(e: any) => setFieldValue('advisorTypeId', e)} value={values.advisorTypeId} className={submitCount ? (errors.advisorTypeId ? 'has-error' : 'has-success') : ''} options={roleList} name='advisorTypeId' placeholder="Kullanıcı Rolünü Seçiniz" isSearchable={false} />
                                                                {submitCount ? errors.advisorTypeId ? <div className="text-danger mt-1"><>{errors.advisorTypeId}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                            </div>
                                                            <div>
                                                                <label htmlFor="language">Kullanıcı Dil</label>
                                                                <Select onChange={(e: any) => setFieldValue('language', e)} value={values.language} className={submitCount ? (errors.language ? 'has-error' : 'has-success') : ''} options={languageOpt} name='language' placeholder="Dil Seçiniz" isSearchable={false} />
                                                                {submitCount ? errors.language ? <div className="text-danger mt-1"><>{errors.language}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                            </div>
                                                             <div>
                                                                <label htmlFor="isApproved">Hesap Onay Durumu</label>
                                                                <Select onChange={(e: any) => setFieldValue('isApproved', e)} value={values.isApproved} className={submitCount ? (errors.isApproved ? 'has-error' : 'has-success') : ''} options={statusOpt} name='isApproved' placeholder="Lütfen Hesap Onay Durumunu Seçiniz" isSearchable={false} />
                                                                {submitCount ? errors.isApproved ? <div className="text-danger mt-1"><>{errors.isApproved}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                            </div>
                                                            <div>
                                                                <label htmlFor="isStatus">Aktivasyon Durumu</label>
                                                                <Select onChange={(e: any) => setFieldValue('isStatus', e)} value={values.isStatus} className={submitCount ? (errors.isStatus ? 'has-error' : 'has-success') : ''} options={statusOpt} name='isStatus' placeholder="Lütfen Hesap Aktivasyon Durumunu Seçiniz" isSearchable={false} />
                                                                {submitCount ? errors.isStatus ? <div className="text-danger mt-1"><>{errors.isStatus}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
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
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>


        </div>








    );
};
export default AddNewUser;
