import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import DetailTabs from './components/DetailTabMain';
import ToolTracking from './components/toolTrackingDetails';


const ToolTrackingDetails = () => {
    const dispatch = useDispatch();
    const params: any = useParams();
    const id: string = params.id

    useEffect(() => {
        dispatch(setPageTitle('Kullanıcı Detayı'));
    });
    const [tabs, setTabs] = useState<string>('adverts');
    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    return (
        <div>

            <DetailTabs toggleTabs={toggleTabs} tabs={tabs} />

             {tabs === 'adverts' ? (
                <ToolTracking toolId={id} />
            ) : (
                ''
            )}

        </div>
    );
};

export default ToolTrackingDetails;

