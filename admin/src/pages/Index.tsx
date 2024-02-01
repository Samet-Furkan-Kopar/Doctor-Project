import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import ReactApexChart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Dropdown from '../components/Dropdown';
import { setPageTitle } from '../store/themeConfigSlice';
import dashboardServices from '../services/dashboard.service';

const Index = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Helpyflow'));
    });
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark' ? true : false;
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [loading] = useState(false);

    const [recordsData, setRecordsData] = useState([])
    const [individualUser, setIndividualUser] = useState(0)
    const [corporateUser, setCorporateUser] = useState(0)

    const [userList, setUserList] = useState([])
    const [projectList, setProjectList] = useState([])
    const [projectCount, setProjectCount] = useState(null)
    const [resourcesCount, setResourcesCount] = useState(null)
    const [userCount, setUserCount] = useState(null)
    const [toolCount, setToolCount] = useState(null)
    const [customerCount, setCustomerCount] = useState(null)

    const reloadDashboardData = () => {
        dashboardServices
            .getDashboardData()
            .then((res: any) => {
                console.log(res);

                if (res?.data && res?.succeded && res?.data) {

                    res?.data?.officeCount && setToolCount(res?.data?.officeCount)
                    res?.data?.blogCount && setProjectCount(res?.data?.blogCount)
                    res?.data?.userCount && setUserCount(res?.data?.userCount)


                    // res?.data?.userCount?.institutionalUserCount && setCorporateUser(Number(res?.data?.userCount?.institutionalUserCount))
                }
            });
    };
    useEffect(() => {
        reloadDashboardData()
    }, []);




    const getUserType = (t: any) => {
        switch (t) {
            case 'user':
                return 'Bireysel'
            case 'officeAdmin':
                return 'Kurumsal'
            case 'officeUser':
                return 'Danışman'
            default:
                return 'Bireysel'
        }
    }

    return (
        <div>
            <div className="pt-5">
                <div className="grid xl:grid-cols-3 gap-6 mb-6">
                    <div className="panel h-full">
                        <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                            <div className="flex justify-between">
                                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Blog Sayısı</div>

                            </div>
                            <div className="flex items-center mt-5">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {projectCount} </div>
                            </div>

                        </div>
                    </div>
                    <div className="panel h-full">
                        <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                            <div className="flex justify-between">
                                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Ofis Sayısı</div>

                            </div>
                            <div className="flex items-center mt-5">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {toolCount} </div>
                            </div>

                        </div>
                    </div>
                    <div className="panel h-full">
                        <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                            <div className="flex justify-between">
                                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Kullanıcı Sayısı</div>

                            </div>
                            <div className="flex items-center mt-5">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{userCount} </div>
                            </div>

                        </div>
                    </div>
                    {/* <div className="panel h-full">
                        <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                            <div className="flex justify-between">
                                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Kaynak Sayısı</div>

                            </div>
                            <div className="flex items-center mt-5">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{resourcesCount}</div>
                            </div>

                        </div>
                    </div> */}
                    {/* <div className="panel h-full">
                        <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                            <div className="flex justify-between">
                                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Kullanıcı Sayısı</div>

                            </div>
                            <div className="flex items-center mt-5">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {userCount} </div>
                            </div>

                        </div>
                    </div> */}

                </div>



                {/* <div className="grid lg:grid-cols-1 grid-cols-1 gap-6">
                    <div className="panel h-full w-full">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Son Projeler</h5>
                        </div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr className="border-b-0">
                                        <th>Proje Başlığı</th>
                                        <th>Açıklama</th>
                                        <th>Kısa Açıklama</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projectList.length > 0 &&
                                        projectList.map((u: any) => (
                                            <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                                <td className="min-w-[150px] text-black dark:text-white" style={{ textAlign: 'center' }}>
                                                    <div className="flex">
                                                        <p className="whitespace-nowrap">{u.title}</p>
                                                    </div>
                                                </td>
                                                <td>{u.description}</td>
                                                <td>{u.short_description || '-'}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="panel h-full w-full">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Son Kullanıcılar</h5>
                        </div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="text-primary">Adı</th>
                                        <th className="text-primary">Soyadı</th>
                                        <th>Telefon</th>
                                        <th>E-Posta</th>
                                        <th>Rol</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userList.length > 0 &&
                                        userList.map((ad: any) => (
                                            <tr className="text-white-dark hover:text-black dark:hover:text-white-light/90 group">
                                                <td className="text-primary">{ad?.firstName}</td>
                                                <td className="text-primary">{ad?.lastName}</td>
                                                <td>{ad?.phoneNumber}</td>
                                                <td>{ad?.email}</td>
                                                <td>{ad?.type}</td>

                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div> */}
            </div>
        </div>
    );
};

export default Index;
