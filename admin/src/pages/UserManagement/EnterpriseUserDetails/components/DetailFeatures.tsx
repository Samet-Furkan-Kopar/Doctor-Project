import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';


type userInfo = {
    firstName?: any,
    lastName?: any,
    email?: any,
    title?: any,
}

const DetailFeatures = (props: any) => {
    const [imgPreview, setImgPreview] = useState<string>('')
    const [loopInfo, setLoopInfo] = useState<any>([])
    const [userInfo, setUserInfo] = useState<userInfo>({})
    console.log('props.data:', props.data);

    useEffect(() => {
        if (props?.data) {
            setUserInfo({
                firstName: props.data?.customerId?.firstName,
                lastName: props.data?.customerId?.lastName,
                email: props.data?.customerId?.email
            })
        }
    }, [props?.data])


    return (
        // <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
        //     <h6 className="text-lg font-bold mb-5">Özellikler</h6>
        //     <div className="flex flex-col sm:flex-row">
        //         <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 gap-5">
        //             <div className="space-y-5">
        //                 {props.data &&
        //                     props.data?.toolslId.map((p: any) => (
        //                         <>
        //                             <h6 className="text-lg font-bold mb-5">Araçlar</h6>

        //                                 <div key={p._id} className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        //                                         <div>
        //                                             <label className="flex items-center cursor-pointer">
        //                                                 <input type="checkbox" className="form-checkbox" defaultChecked={p.status} disabled />
        //                                                 <span className=" text-white-dark">{p.title}</span>
        //                                             </label>
        //                                         </div>

        //                                 </div>

        //                         </>

        //                     ))
        //                 }


        //             </div>
        //             <div className="space-y-5">
        //                 {props.data &&
        //                     props.data?.resourcesId.map((p: any) => (
        //                         <>
        //                             {/* <h6 key={p._id} className="text-lg font-bold mb-5"></h6> */}

        //                                 <div key={p._id} className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        //                                         <div>
        //                                             <label className="flex items-center cursor-pointer">
        //                                                 <input type="checkbox" className="form-checkbox" defaultChecked={p.status} disabled />
        //                                                 <span className=" text-white-dark">{p.title}</span>
        //                                             </label>
        //                                         </div>

        //                                 </div>

        //                         </>

        //                     ))
        //                 }


        //             </div>
        //             {/* <div className="space-y-5">
        //                 {props.data &&
        //                     props.data?.resourcesId.map((p: any) => (
        //                         <>
        //                             <h6 key={p._id} className="text-lg font-bold mb-5">Kaynaklar</h6>

        //                                 <div key={p._id} className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        //                                         <div>
        //                                             <label className="flex items-center cursor-pointer">
        //                                                 <input type="checkbox" className="form-checkbox" defaultChecked={p.status} disabled />
        //                                                 <span className=" text-white-dark">{p.title}</span>
        //                                             </label>
        //                                         </div>

        //                                 </div>

        //                         </>

        //                     ))
        //                 }


        //             </div> */}
        //         </div>
        //     </div>
        // </div >

        <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
            <h6 className="text-lg font-bold mb-5">Araçlar</h6>
            <Formik
                initialValues={{
                    firstName: Object.keys(userInfo).length > 0 && userInfo.firstName ? userInfo.firstName : '',
                    email: Object.keys(userInfo).length > 0 && userInfo.email ? userInfo.email : '',
                    lastName: Object.keys(userInfo).length > 0 && userInfo?.lastName ? userInfo?.lastName : ''
                }}
                enableReinitialize
                onSubmit={() => console.log('')}
            >
                {({ errors, submitCount, touched, values, setFieldValue }) => (
                    <div className="flex flex-col sm:flex-row">

                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 gap-5">
                            <Form className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">

                                    {/* <div>
                                        <label htmlFor="endDate">Araçlar </label>
                                    </div> */}
                                    {props.data &&
                                        props.data?.toolslId.map((p: any) => (
                                            <div>
                                                <Field key={p._id} disabled name={p.title} type="text" id={p.title} placeholder={p.title} className="form-input" />
                                            </div>))}

                                </div>
                                <h6 className="text-lg font-bold mb-5">Kaynaklar</h6>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {/* <div>
                                            <label  htmlFor="endDate">Kaynak İsmi</label>
                                            </div> */}
                                    {props.data &&
                                        props.data?.resourcesId.map((p: any) => (
                                            <div>
                                                <Field key={p._id} disabled name={p.title} type="text" id={p.title} placeholder={p.title} className="form-input" />

                                            </div>))}

                                </div>
                                <h6 className="text-lg font-bold mb-5">Müşteri</h6>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                                    <div>
                                        <label htmlFor="firstName">İsim</label>
                                        <Field disabled name="firstName" type="text" id="firstName" placeholder="" className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName">Soyisim</label>
                                        <Field disabled name="lastName" type="text" id="lastName" placeholder="" className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <Field disabled name="email" type="text" id="email" placeholder="İlan Başlığını" className="form-input" />
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

export default DetailFeatures;
