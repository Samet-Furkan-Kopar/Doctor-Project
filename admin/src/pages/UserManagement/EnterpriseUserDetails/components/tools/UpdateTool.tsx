
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';

import 'tippy.js/dist/tippy.css';
import Select from 'react-select';
import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment, useEffect } from 'react';
import MaskedInput from 'react-text-mask';
import projectServices from '../../../../../services/project.service';

type userInfo = {
    title?: any,
    status?: any,
}

const statusOpt = [
    { label: 'Pasif', value: "Pasif" },
    { label: 'Aktif', value: "Aktif" },
    { label: 'Arızalı', value: "Arızalı" }
];






const UpdateUser = (props: any) => {
    const [imgPreview, setImgPreview] = useState<string>('')
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
    const [actionLoadingStatus, setActionLoadingStatus] = useState(false)


    const [targetImage, setTargetImage] = useState(null)
    const SubmittedForm = Yup.object().shape({
        title: Yup.string().required('Lütfen Kaynak Adı Giriniz'),
        status: Yup.object().required('Lütfen Durumu Giriniz'),

    });

    const [userInfo, setUserInfo] = useState<userInfo>({})

    useEffect(() => {
        if (props.targetUser && props.updateModal) {

            projectServices.getSubEnterpriseToolDetail(props.targetUser._id).then((res: any) => {
                console.log('kullanıcı data', res.data)
                if (res?.succeded && res?.data) {

                    setUserInfo(res?.data)
                    
                    console.log("fdgd",userInfo);
                }
            })
        }
    }, [props.targetUser, props.updateModal])





    const onSubmit = async (values: any) => {
        setActionLoadingStatus(true)
        const fd = new FormData();
        fd.append('title', values.title);
        fd.append('status', values.status.value)

        await projectServices.updateTool(fd, props.targetUser._id).then((res: any) => {
            setActionLoadingStatus(false)
            if (!res || res?.error || res?.status === 'fail' || res?.succeded === false) {
                if (res?.message) {
                    Swal.fire({ title: 'Hata!', text: res?.message, icon: 'error', customClass: 'sweet-alerts' });
                } else {
                    Swal.fire({ title: 'Hata!', text: 'İşlem Gerçekleştirilirken Hata İle Karşılaşıldı.', icon: 'error', customClass: 'sweet-alerts' });
                }
            } else {
                Swal.fire({ title: 'Güncellendi!', text: 'Kullanıcı Kaydı Başarılı Bir Şekilde Güncellendi.', icon: 'success', customClass: 'sweet-alerts' });
                props.reloadEnterpriseUserList();
                props.setUpdateModal(false);
            }
        });
    };

    return (
        <div>
            <Transition appear show={props.updateModal} as={Fragment}>
                <Dialog as="div" open={props.updateModal} onClose={() => {
                    props.setUpdateModal(false)
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
                            <Dialog.Panel style={{ minWidth: '80%' }} className="panel border-0 p-0 rounded-lg  w-full max-w-lg my-8 text-black dark:text-white-dark animate__animated animate__slideInDown">
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <h5 className="font-bold text-lg">Kullanıcı Güncelle</h5>
                                    <button onClick={() => props.setUpdateModal(false)} type="button" className="text-white-dark hover:text-dark">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"></circle><path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>
                                    </button>
                                </div>
                                <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                                    <h6 className="text-lg font-bold mb-5">Bireysel Kullanıcı</h6>

                                    <Formik
                                        initialValues={{
                                            title: Object.keys(userInfo).length > 0 && userInfo?.title ? userInfo?.title : '',
                                           

                                            status: Object.keys(userInfo).length > 0 && userInfo?.status ? statusOpt.find((c: any) => c.value == userInfo?.status) : { label: 'Aktif', value: "Aktif" },
                                        }}
                                        validationSchema={SubmittedForm}
                                        enableReinitialize
                                        onSubmit={onSubmit}
                                    >
                                        {({ handleChange, setFieldValue, values, errors, touched, submitCount }) => (
                                            <div className="flex flex-col sm:flex-row">
                                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 gap-5">
                                                    <Form className="space-y-5" autoComplete='off'>

                                                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                                            <div className={submitCount ? (errors.title ? 'has-error' : 'has-success') : ''}>
                                                                <label htmlFor="title">İsim </label>
                                                                <Field name="title" type="text" id="title" autoComplete='off' placeholder="Kullanıcı İsmini Giriniz" className="form-input" />
                                                                {submitCount ? errors.title ? <div className="text-danger mt-1"><>{errors.title}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                            </div>
                                                            <div>
                                                                <label htmlFor="status">Dil</label>
                                                                <Select onChange={(e: any) => setFieldValue('status', e)} value={values.status} className={submitCount ? (errors.status ? 'has-error' : 'has-success') : ''} options={statusOpt} name='isStatus' placeholder="Lütfen Hesap Aktivasyon Durumunu Seçiniz" isSearchable={false} />
                                                                {submitCount ? errors.status ? <div className="text-danger mt-1">{errors.status}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
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
export default UpdateUser;
