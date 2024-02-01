import { useOutlet, Navigate } from 'react-router-dom'
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { getCurrentUser } from './Auth';

const PrivateRoutes = () => {
    const currentUser = getCurrentUser();
    let auth = {'token':false}
    const outlet = useOutlet();
    return(
        currentUser?.uid ?  <DefaultLayout>{outlet}</DefaultLayout> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes