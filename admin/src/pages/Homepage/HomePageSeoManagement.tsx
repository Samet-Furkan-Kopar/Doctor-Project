import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import pagecontentServices from '../../services/pagecontent.service';

type detailInfo = {
    seoTitle?: string,
    seoDescription?: string,
}

type contentInfo = {
    seoTitle?: string,
    seoDescription?: string,
}

const HomePageSeoManagement = () => {
    const [pageDetail, setPageDetail] = useState<detailInfo>({})
    const [actionLoadingStatus, setActionLoadingStatus] = useState(false)

    const SubmittedForm = Yup.object().shape({
        seoTitle: Yup.string().required('Lütfen İçerik Başlığını Giriniz'),
    });

    const onSubmit = async (values: any) => {
        setActionLoadingStatus(true)
        const dataObj:contentInfo = {
            "seoTitle": values.seoTitle,
            "seoDescription": values.seoDescription,
        }
        const fd = new FormData();
        fd.append("content", JSON.stringify(dataObj))
        fd.append("page", 'homepage')
        fd.append("type", 'seo')

        await pagecontentServices.updateContent(fd).then((res: any) => {
            setActionLoadingStatus(false)
            if (!res || res?.error || res?.status === 'fail' || res?.succedd === false) {
                if(res?.message){
                    Swal.fire({ title: 'Hata!', text: res?.message, icon: 'error', customClass: 'sweet-alerts' });
                }else{
                    Swal.fire({ title: 'Hata!', text: 'İşlem Gerçekleştirilirken Hata İle Karşılaşıldı.', icon: 'error', customClass: 'sweet-alerts' });
                }
            } else {
                Swal.fire({ title: 'Eklendi!', text: 'İçerik Kaydı Başarılı Bir Şekilde Eklendi.', icon: 'success', customClass: 'sweet-alerts' });
            }
        });
    };

    useEffect(() => {
        pagecontentServices.getPageDetail('homepage', 'seo').then((res: any) => {
            if (res && res?.succedd && res?.data) {
                const newObj = {
                    seoTitle: res.data.content.seoTitle,
                    seoDescription: res.data.content.seoDescription,
                }
                setPageDetail(newObj)
            }
        })
    }, [])





    return (
        <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
            <h6 className="text-lg font-bold mb-5">Seo Bilgileri</h6>
            <Formik
                initialValues={{
                    seoTitle: Object.keys(pageDetail).length > 0 && pageDetail?.seoTitle ? pageDetail.seoTitle : '',
                    seoDescription: Object.keys(pageDetail).length > 0 && pageDetail?.seoDescription ? `${pageDetail.seoDescription}` : '',
                }}
                validationSchema={SubmittedForm}
                enableReinitialize
                onSubmit={onSubmit}
            >
                {({ errors, submitCount, values, setFieldValue }) => (
                    <div className="flex flex-col sm:flex-row">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 gap-5">
                            <Form className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                    <div className={submitCount ? (errors.seoTitle ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="seoTitle">Seo Başlığı </label>
                                        <Field name="seoTitle" type="text" id="seoTitle" placeholder="İçerik Başlığını Giriniz" className="form-input" />
                                        {submitCount ? errors.seoTitle ? <div className="text-danger mt-1">{errors.seoTitle}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                    <div className={submitCount ? (errors.seoDescription ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="seoDescription">Seo Açıklama </label>
                                        <Field name="seoDescription" type="text" as="textarea" id="seoDescription" placeholder="İçerik Açıklaması Açıklamasını Giriniz" className="form-input" />
                                        {submitCount ? errors.seoDescription ? <div className="text-danger mt-1">{errors.seoDescription}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
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

export default HomePageSeoManagement;
