import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import DetailTabs from './components/DetailTabMain';
import ResourceTracking from './components/resourceTrackingDetails';


const ResourceTrackingDetails = () => {
    const dispatch = useDispatch();
    const params: any = useParams();
    const id: string = params.id

    useEffect(() => {
        dispatch(setPageTitle('Doktorlar'));
    });
    const [tabs, setTabs] = useState<string>('adverts');
    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    return (
        <div>

            <DetailTabs toggleTabs={toggleTabs} tabs={tabs} />

             {tabs === 'adverts' ? (
                <ResourceTracking toolId={id} />
            ) : (
                ''
            )}

        </div>
    );
};

export default ResourceTrackingDetails;

