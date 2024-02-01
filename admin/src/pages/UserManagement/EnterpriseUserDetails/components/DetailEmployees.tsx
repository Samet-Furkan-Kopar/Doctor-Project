import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Label } from 'reactstrap';

const includeList = [
    "address",
    "adverTitle",
    "advertNo",
    "advertPrice",
    "advertShapeName",
    "advertTypeName",
    "city",
    "country",
    "coverPhoto",
    "createdAt",
    "district",
    "neighbourhood",
    "ownerCoverPhoto",
    "ownerEmail",
    "ownerName",
    "ownerPhoneNumber",
    "ownerPhoto",
    "processName",
    "_id"
]

const DetailEmployees = (props: any) => {
    const [imgPreview, setImgPreview] = useState<string>('')
    const [loopInfo, setLoopInfo] = useState<any>([])
    const [initialValues, setInititalValues] = useState<any>({})
console.log('props.data:', props.data);



    return (


        <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
            <h6 className="text-lg font-bold mb-5">Çalışanlar</h6>
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


                                    {props.data &&
                                        props.data?.employeesId.map((p: any) => (
                                            <div key={p._id}>
                                            <label>İsim: {p?.firstName}</label>
                                            <label>Soyisim: {p?.lastName}</label>
                                            <label>Email: {p?.email}</label>
                                            {/* Diğer özellikleri de ekleyebilirsiniz */}
                                          </div>))}
                                </div>

                            </Form>
                        </div>
                    </div>
                )}
            </Formik>
        </div >
    );
                                        }
    export default DetailEmployees;
