
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'tippy.js/dist/tippy.css';
import Select from 'react-select';
import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment, useEffect } from 'react';
import userServices from '../../../../services/user.service';
import MaskedInput from 'react-text-mask';
import locationServices from '../../../../services/location.service';
import projectServices from "../../../../services/project.service"

type userInfo = {
    neighbourhoodId?: any,
    districtId?: any,
    cityId?: any,
    countryId?: any,
    customerId?: any,
    resourcesId?: any,
    toolslId?: any,
    employeesId?: any,
    endDate?: any,
    beginDate?: any,
    // longitude?: any,
    // latitude?: any,
    short_description?: any,
    description?: any,
    title?: any,
}

const statusOpt = [
    { label: 'Pasif', value: false },
    { label: 'Aktif', value: true },
];
const languageOpt = [
    { label: 'TR', value: "TR" },
    { label: 'EN', value: "EN" },
];


const UpdateNewProject = (props: any) => {

    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
    const [actionLoadingStatus, setActionLoadingStatus] = useState(false)
    const [countryList, setCountryList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [neighbourhoodList, setNeighbourhoodList] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [resourceList, setResourceList] = useState([]);
    const [toolList, setToolList] = useState([]);

    const SubmittedForm = Yup.object().shape({
        neighbourhoodId: Yup.object().required('Lütfen Mahalle Bilgisini Giriniz'),
        districtId: Yup.object().required('Lütfen İlçe Bilgisini Giriniz'),
        cityId: Yup.object().required('Lütfen İl Bilgisini Giriniz'),
        countryId: Yup.object().required('Lütfen Ülke Bilgisini Giriniz'),
        customerId: Yup.object().required('Lütfen Müşteri Bilgisini Giriniz'),
        resourcesId: Yup.array().required('Lütfen Kaynak Bilgisini Giriniz'),
        toolslId: Yup.array().required('Lütfen Araç Bilgisini Giriniz'),
        employeesId: Yup.array().required('Lütfen Çalışan Bilgisini Giriniz'),
        endDate: Yup.date().required('Lütfen Bitiş Tarihi Bilgisini Giriniz'),
        beginDate: Yup.date().required('Lütfen Başlangıç Tarihi Bilgisini Giriniz'),
        // longitude: Yup.number().required('Lütfen Boylam Bilgisini Giriniz'),
        // latitude: Yup.number().required('Lütfen Enlem Bilgisini Giriniz'),
        short_description: Yup.string().required('Lütfen Kısa Açıklama Bilgisini Giriniz'),
        description: Yup.string().required('Lütfen Açıklama Bilgisini Giriniz'),
        title: Yup.string().required('Lütfen Başlık Bilgisini Giriniz'),
    });

    const [userInfo, setUserInfo] = useState<userInfo>({})

    useEffect(() => {
        if (props.targetAdvert && props.updateModal) {

            projectServices.getProjectDetail(props.targetAdvert._id).then((res: any) => {
                console.log('kullanıcı data', res?.data?.data)
                if (res?.data?.succeded && res?.data?.data) {
                    setUserInfo(res?.data?.data)
                }
            })
        }
    }, [props.targetAdvert, props.updateModal])

    useEffect(() => {
        if (props.updateModal) {
            locationServices.getCountryList().then((res: any) => {
                if (res.succeded && res.data?.length) {
                    setCountryList(res.data)
                }
            })
            getCustomerList(props.id)
            getEmployeeList(props.id)
            getResourceList(props.id)
            getToolList(props.id)

        }
    }, [props.updateModal])


    const getCityList = (id: any) => {
        locationServices.getCityList(id).then((res: any) => {
            if (res.succeded && res.data?.length) {
                setCityList(res.data)
            }
        })
    }
    const getDistrictList = (id: any) => {
        locationServices.getDistrictList(id).then((res: any) => {
            if (res.succeded && res.data?.length) {
                setDistrictList(res.data)
            }
        })
    }
    const getNeighbourhoodList = (id: any) => {
        locationServices.getNeighbourhoodList(id).then((res: any) => {
            if (res.succeded && res.data?.length) {
                setNeighbourhoodList(res.data)
            }
        })
    }
    const getCustomerList = (id: any) => {
        projectServices.getCustomerList(id).then((res: any) => {
            console.log(res);

            if (res.succeded && res.data?.length) {
                setCustomerList(res.data?.map((c:any) => ({
                    label: `${c?.firstName} ${c?.lastName}`,
                    value: c?._id,
                  })));
                console.log(customerList);

            }
        })
    }
    const getEmployeeList = (id: any) => {
        projectServices.getEmployeesList(id).then((res: any) => {
            if (res.succeded && res.data?.length) {
                setEmployeeList(res.data?.map((c:any) => ({
                    label: `${c?.firstName} ${c?.lastName}`,
                    value: c?._id,
                  })));
                console.log(employeeList);

            }
        })
    }
    const getToolList = (id: any) => {
        projectServices.getToolsList(id).then((res: any) => {
            if (res.succeded && res.data?.length) {
                setToolList(res.data?.map((c:any) => ({
                    label: `${c?.title}`,
                    value: c?._id,
                  })));
                  console.log(toolList);
            }
        })
    }
    const getResourceList = (id: any) => {
        projectServices.getResourcesList(id).then((res: any) => {
            if (res.succeded && res.data?.length) {
                setResourceList(res.data?.map((c:any) => ({
                    label: `${c?.title}`,
                    value: c?._id,
                  })));
                  console.log(resourceList);

            }
        })
    }


    const onSubmit = async (values: any) => {
        setActionLoadingStatus(true)
        const fd = new FormData();
        fd.append('countryId', values.countryId.value || "")
        fd.append('cityId', values.cityId.value || "")
        fd.append('districtId', values.districtId.value || "")
        fd.append('neighbourhoodId', values.neighbourhoodId.value || "")
        fd.append('customerId', values.customerId.value || "");
        fd.append('endDate', values.endDate || "");
        fd.append('beginDate', values.beginDate|| "");
        fd.append('short_description', values.short_description || "");
        fd.append('description', values.description || "");
        fd.append('title', values.title || "");
        if (values.resourcesId && values.resourcesId.length > 0) {
            const idList: any = [];
            values.resourcesId.map((v: any) => {
                idList.push(v.value)
            })
            fd.append('resourcesId', idList.toString())
        }
        if (values.toolslId && values.toolslId.length > 0) {
            const idList: any = [];
            values.toolslId.map((v: any) => {
                idList.push(v.value)
            })
            fd.append('toolslId', idList.toString())
        }
        if (values.employeesId && values.employeesId.length > 0) {
            const idList: any = [];
            values.employeesId.map((v: any) => {
                idList.push(v.value)
            })
            fd.append('employeesId', idList.toString())
        }

        await projectServices.updateProjectData(fd, props.targetAdvert._id).then((res: any) => {
            setActionLoadingStatus(false)
            if (!res || res?.error || res?.status === 'fail' || res?.succedd === false) {
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
                                    <h5 className="font-bold text-lg">Projeyi Güncelle</h5>
                                    <button onClick={() => props.setUpdateModal(false)} type="button" className="text-white-dark hover:text-dark">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"></circle><path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>
                                    </button>
                                </div>
                                <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                                    <h6 className="text-lg font-bold mb-5"></h6>

                                    <Formik
                                        initialValues={{
                                            neighbourhoodId:  '',
                                            districtId: '',
                                            cityId:  '',
                                            countryId:  '',
                                            customerId:  '',
                                            resourcesId:  "",
                                            toolslId:  "",
                                            employeesId: "",
                                            endDate: userInfo.endDate || '',
                                            beginDate: userInfo.beginDate || '',
                                            // longitude: exampleUserInfo.longitude || '',
                                            // latitude: exampleUserInfo.latitude || '',
                                            short_description: userInfo.short_description || '',
                                            description: userInfo.description || '',
                                            title: userInfo.title || '',
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
                                                                <label htmlFor="title">Proje Başlık </label>
                                                                <Field name="title" type="text" id="title" autoComplete='off' placeholder="Kullanıcı İsmini Giriniz" className="form-input" />
                                                                {submitCount ? errors.title ? <div className="text-danger mt-1"><>{errors.title}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                            </div>

                                                            <div className={submitCount ? (errors.description ? 'has-error' : 'has-success') : ''}>
                                                                <label htmlFor="description">Açıklama</label>
                                                                <Field name="description" type="text" id="description" autoComplete='off' placeholder="Açıklama" className="form-input" />
                                                                {submitCount ? errors.description ? <div className="text-danger mt-1"><>{errors.description}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                            </div>

                                                            <div className={submitCount ? (errors.short_description ? 'has-error' : 'has-success') : ''}>
                                                                <label htmlFor="short_description">Kısa Açıklama </label>
                                                                <Field name="short_description" type="text" id="short_description" autoComplete='off' placeholder="Kısa Açıklama" className="form-input" />
                                                                {submitCount ? errors.short_description ? <div className="text-danger mt-1"><>{errors.short_description}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                            </div>

                                                            <div className={submitCount ? (errors.beginDate ? 'has-error' : 'has-success') : ''}>
                                                                <label htmlFor="beginDate">Başlangıç Zamanı </label>
                                                                <Field name="beginDate" type="date" id="beginDate" autoComplete='off' placeholder="Başlangıç Zamanı" className="form-input" />
                                                                {submitCount ? errors.beginDate ? <div className="text-danger mt-1"><>{errors.beginDate}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                            </div>

                                                            <div className={submitCount ? (errors.endDate ? 'has-error' : 'has-success') : ''}>
                                                                <label htmlFor="endDate">Bitiş Zamanı </label>
                                                                <Field name="endDate" type="date" id="endDate" autoComplete='off' placeholder="Başlangıç Zamanı" className="form-input" />
                                                                {submitCount ? errors.endDate ? <div className="text-danger mt-1"><>{errors.endDate}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                            </div>

                                                                <div>
                                                                    <label htmlFor="customerId">Müşteri</label>
                                                                    <Select
                                                                    onChange={(e: any) => {
                                                                        setFieldValue('customerId',e )
                                                                    }} value={values.customerId} className={submitCount ? (errors.customerId ? 'has-error' : 'has-success') : ''} options={customerList} name='customerId' placeholder="Müşteri Seçiniz" isSearchable={false} />
                                                                    {submitCount ? errors.customerId ? <div className="text-danger mt-1"><>{errors.customerId}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="employeesId">Çalışan</label>
                                                                    <Select
                                                                    isMulti
                                                                    onChange={(e: any) => {
                                                                        setFieldValue('employeesId',e )
                                                                    }}
                                                                     value={values.employeesId} className={submitCount ? (errors.employeesId ? 'has-error' : 'has-success') : ''} options={employeeList} name='employeesId' placeholder="Çalışan Seçiniz" isSearchable={false} />
                                                                    {submitCount ? errors.employeesId ? <div className="text-danger mt-1"><>{errors.employeesId}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="resourcesId">Kaynak</label>
                                                                    <Select
                                                                    isMulti
                                                                    onChange={(e: any) => {
                                                                        setFieldValue('resourcesId',e )
                                                                        console.log(e);

                                                                    }}
                                                                     value={values.resourcesId} className={submitCount ? (errors.resourcesId ? 'has-error' : 'has-success') : ''} options={resourceList} name='resourcesId' placeholder="Kaynak Seçiniz" isSearchable={false} />
                                                                    {submitCount ? errors.resourcesId ? <div className="text-danger mt-1"><>{errors.resourcesId}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                                </div>

                                                                <div>
                                                                    <label htmlFor="toolslId">Araç</label>
                                                                    <Select
                                                                    isMulti
                                                                    onChange={(e: any) => {
                                                                        setFieldValue('toolslId', e)
                                                                        console.log(e);


                                                                    }} value={values.toolslId} className={submitCount ? (errors.toolslId ? 'has-error' : 'has-success') : ''} options={toolList} name='toolslId' placeholder="Araç Seçiniz" isSearchable={false} />
                                                                    {submitCount ? errors.toolslId ? <div className="text-danger mt-1"><>{errors.toolslId}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                                </div>

                                                            </div>
                                                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                                                <div>
                                                                    <label htmlFor="countryId">Ülke</label>
                                                                    <Select onChange={(e: any) => {
                                                                        setFieldValue('countryId', e)
                                                                        getCityList(e.value)
                                                                    }} value={values.countryId} className={submitCount ? (errors.countryId ? 'has-error' : 'has-success') : ''} options={countryList} name='countryId' placeholder="Ülke Seçiniz" isSearchable={false} />
                                                                    {submitCount ? errors.countryId ? <div className="text-danger mt-1"><>{errors.countryId}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="cityId">İl</label>
                                                                    <Select onChange={(e: any) => {
                                                                        setFieldValue('cityId', e)
                                                                        console.log(e.value);
                                                                        getDistrictList(e.value)
                                                                    }} value={values.cityId} className={submitCount ? (errors.cityId ? 'has-error' : 'has-success') : ''} options={cityList} name='cityId' placeholder="İl Seçiniz" isSearchable={false} />
                                                                    {submitCount ? errors.cityId ? <div className="text-danger mt-1"><>{errors.cityId}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="districtId">İlçe</label>
                                                                    <Select onChange={(e: any) => {
                                                                        setFieldValue('districtId', e)
                                                                        getNeighbourhoodList(e.value)
                                                                    }} value={values.districtId} className={submitCount ? (errors.districtId ? 'has-error' : 'has-success') : ''} options={districtList} name='districtId' placeholder="İlçe Seçiniz" isSearchable={false} />
                                                                    {submitCount ? errors.districtId ? <div className="text-danger mt-1"><>{errors.districtId}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="neighbourhoodId">Mahalle</label>
                                                                    <Select onChange={(e) => setFieldValue('neighbourhoodId', e)} value={values.neighbourhoodId} className={submitCount ? (errors.neighbourhoodId ? 'has-error' : 'has-success') : ''} options={neighbourhoodList} name='neighbourhoodId' placeholder="Mahalle Seçiniz" isSearchable={false} />
                                                                    {submitCount ? errors.neighbourhoodId ? <div className="text-danger mt-1"><>{errors.neighbourhoodId}</></div> : <div className="text-success mt-1">Başarılı!</div> : ''}
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
export default UpdateNewProject;
