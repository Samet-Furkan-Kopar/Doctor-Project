import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import DetailTabs from './components/DetailTabMain';
import Projects from './components/Projects';
import Tools from './components/tools/Tools';
import Resources from './components/resources/Resources';


const EnterpriseUserDetails = () => {
    const dispatch = useDispatch();
    const params: any = useParams();
    const id: string = params.id

    useEffect(() => {
        dispatch(setPageTitle('Kullanıcı Detayı'));
    });
    const [tabs, setTabs] = useState<string>('projects');
    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    return (
        <div>

            <DetailTabs toggleTabs={toggleTabs} tabs={tabs} />

             {tabs === 'projects' ? (
                <Projects officeId={id} />
            ) : (
                ''
            )}
             {tabs === 'tools' ? (
                <Tools officeId={id} />
            ) : (
                ''
            )}
            {tabs === 'resources' ? (
                <Resources officeId={id} />
            ) : (
                ''
            )}

        </div>
    );
};

export default EnterpriseUserDetails;

