import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';

const RecoverIdCover = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Recover Id Cover'));
    });
    const navigate = useNavigate();

    const submitForm = () => {
        navigate('/');
    };

    return (
        <div className="flex min-h-screen">
            <div className="bg-gradient-to-t from-[#ff1361bf] to-[#44107A] w-1/2  min-h-screen hidden lg:flex flex-col items-center justify-center text-white dark:text-black p-4">
                <div className="w-full mx-auto mb-5">
                    <img src="/assets/images/auth-cover.svg" alt="coming_soon" className="lg:max-w-[370px] xl:max-w-[500px] mx-auto" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-center">Join the community of expert developers</h3>
                <p>It is easy to setup with great customer experience. Start your 7-day free trial</p>
            </div>
            <div className="w-full lg:w-1/2 relative flex justify-center items-center ">
                <div className="max-w-[480px] p-5 md:p-10 w-full">
                    <h2 className="font-bold text-3xl mb-3">Password Reset</h2>
                    <p className="mb-7">Enter your email to recover your ID</p>
                    <form className="space-y-5" onSubmit={submitForm}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" className="form-input" placeholder="Enter Email" />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            RECOVER
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RecoverIdCover;
