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
    form_title?: string,
    form_short_description?: string,
    alt_text?: string
}

type contentInfo = {
    title?: string,
    isVisible?: boolean,
    short_description?: string,
    form_title?: string,
    form_short_description?: string,
    image?: string,
    alt_text?: string
}

const statusOpt = [
    { label: 'Pasif', value: false },
    { label: 'Aktif', value: true },
];


const RegisterPopupManagement = () => {
    const [pageDetail, setPageDetail] = useState<detailInfo>({})
    const [imagePreview, setImagePreview] = useState('')
    const [image, setImage] = useState(null)
    const [actionLoadingStatus, setActionLoadingStatus] = useState(false)
    const SubmittedForm = Yup.object().shape({
        imageAltText: Yup.string().required('Lütfen Resim Alt Text Metnini Giriniz'),
        image: Yup.mixed().test(
            'type',
            'Sadece belirtilen formatlarda yükleme yapabilirsiniz: .jpeg, .jpg, .bmp and .png',
            (value) => {
                return (
                    !value ||
                    (value &&
                        (value.type === 'image/jpeg' ||
                            value.type === 'image/jpg' ||
                            value.type === 'image/bmp' ||
                            value.type === 'image/png' ||
                            value.type === 'image/webp'))
                );
            }
        ),
    });

    const onSubmit = async (values: any) => {
        setActionLoadingStatus(true)
        const dataObj: contentInfo = {
            "alt_text": values.imageAltText
        }
        if (imagePreview) dataObj.image = imagePreview;
        const fd = new FormData();
        fd.append("content", JSON.stringify(dataObj))
        fd.append("page", 'register')
        fd.append("type", 'popup')
        if (values.image) fd.append("image", values.image)

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
        pagecontentServices.getPageDetail('register', 'popup').then((res: any) => {
            if (res && res?.succedd && res?.data) {
                const newObj = {
                    alt_text: res.data.content.alt_text,
                }

                if (res.data.content.image) setImagePreview(res.data.content.image)
                setPageDetail(newObj)
            }
        })
    }, [])

    return (
        <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
            <h6 className="text-lg font-bold mb-5">Genel Bilgiler</h6>
            <Formik
                initialValues={{
                    imageAltText: Object.keys(pageDetail).length > 0 && pageDetail?.alt_text ? pageDetail.alt_text : '',
                    image: null
                }}
                validationSchema={SubmittedForm}
                enableReinitialize
                onSubmit={onSubmit}
            >
                {({ errors, submitCount, values, setFieldValue }) => (
                    <div className="flex flex-col sm:flex-row">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 gap-5">
                            <Form className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 space-y-5">
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                            <img src={imagePreview ?? '/assets/images/file-preview.svg'} alt="Shorticon" className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
                                        </div>
                                        <div className={submitCount ? (errors.image ? 'has-error' : 'has-success') : ''}>
                                            <label htmlFor="image">Modal Resim </label>
                                            <input name="image" type="file" id="image" onChange={(e: any) => {
                                                if (
                                                    (e && e.target.files[0].type === 'image/jpeg') ||
                                                    e.target.files[0].type === 'image/jpg' ||
                                                    e.target.files[0].type === 'image/bmp' ||
                                                    e.target.files[0].type === 'image/png' ||
                                                    e.target.files[0].type === 'image/webp'
                                                ) {

                                                    const objecUrl = URL.createObjectURL(e.target.files[0]);
                                                    setImagePreview(objecUrl);
                                                    setFieldValue('image', e.target.files[0])
                                                    setImage(e.target.files[0]);
                                                }
                                            }} placeholder="İçerik Resmini Giriniz" className="form-input" />

                                            {submitCount ? errors.image ? <div className="text-danger mt-1">{errors.image}</div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                        </div>
                                    </div>
                                    <div className={submitCount ? (errors.imageAltText ? 'has-error' : 'has-success') : ''}>
                                        <label htmlFor="imageAltText">Modal Resim Alt Text </label>
                                        <Field name="imageAltText" type="text" id="imageAltText" placeholder="Resim Alt Text Bilgisini Giriniz" className="form-input" />
                                        {submitCount ? errors.imageAltText ? <div className="text-danger mt-1"><>{errors.imageAltText}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
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

export default RegisterPopupManagement;
