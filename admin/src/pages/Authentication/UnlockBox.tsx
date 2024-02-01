import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';

const UnlockBox = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Unlock Box'));
    });
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark' ? true : false;

    const submitForm = () => {
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
                <div className="flex items-center mb-10">
                    <div className="ltr:mr-4 rtl:ml-4">
                        <img src="/assets/images/profile-1.jpeg" className="w-16 h-16 object-cover rounded-full" alt="images" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-2xl">Shaun Park</h4>
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
    );
};

export default UnlockBox;
