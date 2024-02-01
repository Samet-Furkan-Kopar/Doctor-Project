import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import Select from 'react-select';
import footerManagementServices from '../../../services/footerManagement.service';

const statusOpt = [
    { label: 'Pasif', value: false },
    { label: 'Aktif', value: true },
];


const UpdateCategory = (props: any) => {
    const [actionLoadingStatus, setActionLoadingStatus] = useState(false)
    const SubmittedForm = Yup.object().shape({
        title: Yup.string().required('Lütfen Kategori Adını Giriniz'),
    });


    const onSubmit = async (values: any) => {
        setActionLoadingStatus(true)
        await footerManagementServices.updateCategory({ isVisible: values.isVisible.value, category_name: values.title }, props.data._id).then((res:any) => {
            setActionLoadingStatus(false)
            if (!res || res?.error || res?.status === 'fail' || res?.succedd === false) {
                if(res?.message){
                    Swal.fire({ title: 'Hata!', text: res?.message, icon: 'error', customClass: 'sweet-alerts' });
                }else{
                    Swal.fire({ title: 'Hata!', text: 'İşlem Gerçekleştirilirken Hata İle Karşılaşıldı.', icon: 'error', customClass: 'sweet-alerts' });
                }
            } else {
                Swal.fire({ title: 'Güncelendi!', text: 'Kategori Kaydı Başarılı Bir Şekilde Güncellendi.', icon: 'success', customClass: 'sweet-alerts' });
                props.reloadInitialValues()
            }
        });

        props.setUpdateCategoryModal(false);
    };

    return (
        <Transition appear show={props.updateCategoryModal} as={Fragment}>
            <Dialog as="div" open={props.updateCategoryModal} onClose={() => props.setUpdateCategoryModal(false)} className="relative z-50">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-[black]/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                <button
                                    type="button"
                                    onClick={() => props.setUpdateCategoryModal(false)}
                                    className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>

                                <div className="p-5">
                                    <Formik
                                        initialValues={{
                                            title: props.data.categroy_name,
                                            isVisible: statusOpt.find((s: any) => s.value === props.data.isVisible) || { label: 'Pasif', value: false }
                                        }}
                                        validationSchema={SubmittedForm}
                                        onSubmit={onSubmit}
                                    >
                                        {({ errors, submitCount, setFieldValue, values }) => (
                                            <Form className="space-y-5">
                                                <div>
                                                    <label htmlFor="isVisible">Görünürlük Durumu</label>
                                                    <Select onChange={(e) => setFieldValue('isVisible', e)} value={values.isVisible} className={submitCount ? (errors.isVisible ? 'has-error' : 'has-success') : ''} options={statusOpt} name='isVisible' placeholder="Lütfen Görünürlük Durumunu Belirtiniz" isSearchable={false} />
                                                    {submitCount ? errors.isVisible ? <div className="text-danger mt-1"><>{errors.isVisible}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                </div>
                                                <div className={submitCount ? (errors.title ? 'has-error' : 'has-success') : ''}>
                                                    <label htmlFor="title">Kategori Adı </label>
                                                    <Field name="title" type="text" id="title" placeholder="Kategori Adını Giriniz" className="form-input" />

                                                    {submitCount ? errors.title ? <div className="text-danger mt-1"><>{errors.title}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
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
                                        )}
                                    </Formik>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default UpdateCategory;
