import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import convertDateToLocale from '../../../../utils/DateConverter';
const includeList = [//idye gore gelen proje detaylarını gostert oğren
    "title",
    "description",
    "short_description",
    "status",
    "beginDate",
    "endDate",
    "city",
    "country",
    "createdAt",
    "district",
    "neighbourhood",
    "_id",
    "resourcesId",
    "employeesId",
    "toolslId",
    "customerId",
]

const DetailInfo = (props: any) => {
    const [loopInfo, setLoopInfo] = useState<any>([])
    const [initialValues, setInititalValues] = useState<any>({})

console.log('props.data', props.data);

    useEffect(() => {
        if (props?.data) {
            const initialValues: any = {
                title: props.data?.title || '',
                description: props.data?.description || '',
                short_description: props.data?.short_description || '',
                beginDate: convertDateToLocale(props.data?.beginDate) || '',
                endDate: convertDateToLocale(props.data?.endDate) || '',
                // status: props.data?.status || '',
                country: props.data?.countryId?.name || '',
                city: props.data?.cityId?.name || '',
                district: props.data?.districtId?.name || '',
                neighbourhood: props.data?.neighbourhoodId?.name || '',
                // toolslId: props.data?.toolslId || '',//dizi
                // employeesId: props.data?.employeesId || '',//dizi
                // resourcesId: props.data?.resourcesId || '',//dizi
                // customerId: `${props.data?.customerId?.firstName} ${props.data?.customerId?.lastName}` || '',//dizi
            }
            const tmpArr: any = [];
            // Object.keys(props.data).map((p: any) => {
            //     if (!includeList.includes(p)) {

            //         const newObj = props.data[p];
            //         newObj.input = p;
            //         console.log('newObj:', newObj);
            //         console.log('p:', p);
            //         tmpArr.push(newObj)
            //         if (props.data[p].type == 'boolean') {
            //             initialValues[p] = props.data[p].value ? 'Evet' : 'Hayır'
            //         } else {
            //             initialValues[p] = props.data[p].value
            //         }
            //     }
            // })
            setLoopInfo(tmpArr)
            setInititalValues(initialValues)
        }
    }, [props.data])


    useEffect(() => {
        console.log('ppp', loopInfo)
    }, [loopInfo])


    useEffect(() => {
        if (!props.dialogStatus) {
            console.log('JJKJK')
            // setLoopInfo([])
        }
    }, [props.dialogStatus])



    return (
        <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
            <h6 className="text-lg font-bold mb-5">Genel Bilgiler</h6>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={() => console.log('')}
            >
                {({ errors, submitCount, touched, values, setFieldValue }) => (
                    <div className="flex flex-col sm:flex-row">

                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 gap-5">
                            <Form className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                    <div>
                                        <label htmlFor="title">Proje Başlığı</label>
                                        <Field disabled name="title" type="text" id="title" placeholder="" className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="description">Açıklama </label>
                                        <Field disabled name="description" type="text" id="description" placeholder="" className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="short_description">Kısa Açıklama</label>
                                        <Field disabled name="short_description" type="text" id="short_description" placeholder="İlan Başlığını" className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="beginDate">Proje Başlangıç Tarihi </label>
                                        <Field disabled name="beginDate" type="text" id="beginDate" placeholder="" className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="endDate">Proje Bitiş Tarihi </label>
                                        <Field disabled name="endDate" type="text" id="endDate" placeholder="" className="form-input" />
                                    </div>
                                    {/* <div>
                                        <label htmlFor="status">Proje Durumu</label>
                                        <Field disabled name="status" type="text" id="status" placeholder="" className="form-input" />
                                    </div> */}
                                </div>
                                <h6 className="text-lg font-bold mb-5">Proje Adres Bilgiler</h6>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label htmlFor="country">Ülke </label>
                                        <Field disabled name="country" type="text" id="country" placeholder="Ülke" className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="city">İl </label>
                                        <Field disabled name="city" type="text" id="city" placeholder="İl" className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="district">İlçe </label>
                                        <Field disabled name="district" type="text" id="district" placeholder="İlçe" className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="neighbourhood">Mahalle </label>
                                        <Field disabled name="neighbourhood" type="text" id="neighbourhood" placeholder="Mahalle" className="form-input" />
                                    </div>

                                </div>

                            </Form>
                        </div>
                    </div>
                )}
            </Formik>
        </div >
    );
};

export default DetailInfo;
