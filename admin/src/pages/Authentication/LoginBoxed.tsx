import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { setCurrentUser } from '../../utils/Auth';
import Swal from 'sweetalert2';
import { servicePath } from '../../utils/Constants';


type userToken = {
    accessToken: string;
  };

const LoginBoxed = ()  => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login Boxed'));
    });
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark' ? true : false;

    const SubmittedForm = Yup.object().shape({
        email: Yup.string().email('Lütfen e-posta adresinizi kontrol ediniz').required('Lütfen E-posta Adresinizi Giriniz'),
        password: Yup.string().required('Lütfen Şifrenizi Giriniz'),
    });

    const onSubmit = async (values: any) => {
        const fd = new FormData();
        fd.append('email', values.email)
        fd.append('password', values.password)

        const info = await axios({
            method: 'post',
            url: `${servicePath}/admin/login`,
            data: fd,
        })
            .then((res) => res?.data)
            .catch((error) => error);
        console.log('info', info)
        if (info?.succeded == true && info?.data?.token ) {
            console.log("info",info);

            const item = { uid: info?.data?.token, title: info?.user?.name};
            console.log("item",item);

            setCurrentUser(item);
            const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
            toast.fire({
                icon: 'success',
                title: 'Başarılı Bir Şekilde Giriş Yaptınız',
                padding: '10px 20px',
            });

        } else {
            const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
            toast.fire({
                icon: 'error',
                title: 'Kullanıcı Bilgilerinizi Kontrol Ediniz',
                padding: '10px 20px',
            });
        }




        navigate('/');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel sm:w-[480px] m-6 max-w-lg w-full">

                <div>
                    <img className="ml-[5px] flex-none" style={{width: '16rem', marginLeft:'5px', marginBottom: '10px'}} src="/logo.jpg" alt="helpyflow" />
                </div>


                <h2 className="font-bold text-2xl mb-3">Admin Girişi</h2>
                <p className="mb-7">Kullanıcı Adınızı ve Şifrenizi Giriniz</p>

                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={SubmittedForm}

                    onSubmit={onSubmit}
                >
                    {({ errors, submitCount }) => (
                        <div className="flex flex-col sm:flex-row">
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 gap-5">
                                <Form className="space-y-5">
                                    <div >
                                        <label htmlFor="email">E-posta Adresiniz </label>
                                        <Field name="email" type="email" id="email" placeholder="E-posta Adresinizi Giriniz" className="form-input" />
                                    </div>
                                    <div >
                                        <label htmlFor="password">Şifre </label>
                                        <Field name="password" id="password" type="password" placeholder="Şifrenizi Giriniz" className="form-input" />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary !mt-6"
                                    >
                                        Giriş Yap
                                    </button>
                                </Form>
                            </div>
                        </div>
                    )}
                </Formik>




            </div>
        </div>
    );
};

export default LoginBoxed;
