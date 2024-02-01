import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import DetailTabs from './components/DetailTabs';
import Recourse from './components/Recourse';
import UserWorkingHourse from './components/UserWorkingHourse';


const SubUserDetails = () => {
    const dispatch = useDispatch();
    const params: any = useParams();
    const id: string = params.id

    useEffect(() => {
        dispatch(setPageTitle('Kullanıcı Detayı'));
    });
    const [tabs, setTabs] = useState<string>('courses');
    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    return (
        <div>

            <DetailTabs toggleTabs={toggleTabs} tabs={tabs} />

            {tabs === 'recourse' ? (
                <Recourse userId={id} />
            ) : (
                ''
            )}
             {tabs === 'userWorkingHourse' ? (
                <UserWorkingHourse userId={id} />
            ) : (
                ''
            )}

        </div>
    );
};

export default SubUserDetails;



