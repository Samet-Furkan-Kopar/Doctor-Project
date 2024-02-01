import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import pagecontentServices from '../../services/pagecontent.service';

type detailInfo = {
    title?: string,
    isVisible?: boolean,
    short_description?: string,
}

type contentInfo = {
    title?: string,
    isVisible?: boolean,
    short_description?: string,
}

const statusOpt = [
    { label: 'Pasif', value: false },
    { label: 'Aktif', value: true },
];


const HomePageOfficePartManagement = () => {
    const [pageDetail, setPageDetail] = useState<detailInfo>({})
    const [actionLoadingStatus, setActionLoadingStatus] = useState(false)

    const SubmittedForm = Yup.object().shape({
        title: Yup.string().required('Lütfen İçerik Başlığını Giriniz'),
        isVisible: Yup.object().required('Lütfen İçerik Durumunu Seçiniz'),
    });

    const onSubmit = async (values: any) => {
        setActionLoadingStatus(true)
        const dataObj: contentInfo = {
            "title": values.title,
            "isVisible": values.isVisible.value,
            "short_description": values.short_description,
        }
        const fd = new FormData();
        fd.append("content", JSON.stringify(dataObj))
        fd.append("page", 'homepage')
        fd.append("type", 'officepart')

        await pagecontentServices.updateContent(fd).then((res: any) => {
            setActionLoadingStatus(false)
            if (!res || res?.error || res?.status === 'fail' || res?.succedd === false) {
                if (res?.message) {
                    Swal.fire({ title: 'Hata!', text: res?.message, icon: 'error', customClass: 'sweet-alerts' });
                } else {
                    Swal.fire({ title: 'Hata!', text: 'İşlem Gerçekleştirilirken Hata İle Karşılaşıldı.', icon: 'error', customClass: 'sweet-alerts' });
                }
            } else {
                Swal.fire({ title: 'Eklendi!', text: 'İçerik Kaydı Başarılı Bir Şekilde Eklendi.', icon: 'success', customClass: 'sweet-alerts' });
            }
        });
    };

    useEffect(() => {
        pagecontentServices.getPageDetail('homepage', 'officepart').then((res: any) => {
            if (res && res?.succedd && res?.data) {
                const newObj = {
                    title: res.data.content.title,
                    isVisible: res.data.content.isVisible,
                    short_description: res.data.content.short_description,
                }

                setPageDetail(newObj)
            }
        })
    }, [])





    return (
        <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
            <h6 className="text-lg font-bold mb-5">Genel Bilgiler</h6>
            <Formik
                initialValues={{
                    title: Object.keys(pageDetail).length > 0 && pageDetail?.title ? pageDetail.title : '',
                    short_description: Object.keys(pageDetail).length > 0 && pageDetail?.short_description ? `${pageDetail.short_description}` : '',
                    isVisible: Object.keys(pageDetail).length > 0 ? statusOpt.find((s: any) => s.value === pageDetail.isVisible) : '',
                }}
                validationSchema={SubmittedForm}
                enableReinitialize
                onSubmit={onSubmit}
            >
                {({ errors, submitCount, values, setFieldValue }) => (
                    <div className="flex flex-col sm:flex-row">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 gap-5">
                            <Form className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className={submitCount ? (errors.title ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="title">Sayfa Başlığı </label>
                                        <Field name="title" type="text" id="title" placeholder="İçerik Başlığını Giriniz" className="form-input" />
                                        {submitCount ? errors.title ? <div className="text-danger mt-1">{errors.title}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                        <div className={submitCount ? (errors.short_description ? 'has-error' : 'has-success') : ''}>
                                            <label htmlFor="short_description">İçerik Kısa Açıklama </label>
                                            <Field name="short_description" type="text" as="textarea" id="short_description" placeholder="İçerik Açıklaması Açıklamasını Giriniz" className="form-input" />
                                            {submitCount ? errors.short_description ? <div className="text-danger mt-1">{errors.short_description}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="isVisible">Görünürlük Durumu</label>
                                        <Select onChange={(e) => setFieldValue('isVisible', e)} value={values.isVisible} className={submitCount ? (errors.isVisible ? 'has-error' : 'has-success') : ''} options={statusOpt} name='isVisible' placeholder="Lütfen Görünürlük Durumunu Belirtiniz" isSearchable={false} />
                                        {submitCount ? errors.isVisible ? <div className="text-danger mt-1">{errors.isVisible}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
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

export default HomePageOfficePartManagement;
