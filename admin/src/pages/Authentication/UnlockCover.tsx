import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';

const UnlockCover = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Unlock Cover'));
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
                    <div className="flex items-center mb-10">
                        <div className="ltr:mr-4 rtl:ml-4">
                            <img src="/assets/images/profile-1.jpeg" className="w-16 h-16 object-cover rounded-full" alt="images" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-3xl">Shaun Park</h4>
                            <p>Enter your password to unlock your ID</p>
                        </div>
                    </div>
                    <form className="space-y-5" onSubmit={submitForm}>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" className="form-input" placeholder="Enter Password" />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            UNLOCK
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UnlockCover;
