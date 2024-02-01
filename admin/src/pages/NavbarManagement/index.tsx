import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useTranslation } from 'react-i18next';
import AddNewLink from './components/AddNewLink';
import UpdateLink from './components/UpdateLink';
import Swal from 'sweetalert2';
import { ReactSortable } from 'react-sortablejs';
import footerManagementServices from '../../services/footerManagement.service';
import navbarManagementServices from '../../services/navbarManagement.service';


const NavbarManagement = (props: any) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    useEffect(() => {
        dispatch(setPageTitle('Navbar Kategorileri'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [page, setPage] = useState(1);
    const [totalItemCount, setTotalItemCount] = useState(0);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState([]);
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [targetLink, setTargetLink] = useState<object>({})
    const [updateLinkModal, setUpdateLinkModal] = useState<boolean>(false)
    const [addNewLinkModal, setAddNewLinkModal] = useState<boolean>(false)

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });

    const reloadLinkList = () => {
        navbarManagementServices
            .getLinkList(page, pageSize, search)
            .then((res:any) => {
                if (res?.succedd && res?.getAll) {
                    setTotalItemCount(res?.getAll.length);
                    setRecordsData(res?.getAll);

                }
            });
    };

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        reloadLinkList()

    }, [page, pageSize, initialRecords, search]);


    const destroyNavLink = async (id: string) => {
        Swal.fire({
            icon: 'warning',
            title: 'Kaydı Silmek İstediğinizden Emin Misiniz?',
            text: "Bu işlemi geri alamazsınız!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then(async (result) => {
            if (result.value) {
                await navbarManagementServices.deleteLink(id).then((res:any) => {
                    if (!res || res?.error || res?.status === 'fail' || res?.succedd === false) {
                        if(res?.message){
                            Swal.fire({ title: 'Hata!', text: res?.message, icon: 'error', customClass: 'sweet-alerts' });
                        }else{
                            Swal.fire({ title: 'Hata!', text: 'İşlem Gerçekleştirilirken Hata İle Karşılaşıldı.', icon: 'error', customClass: 'sweet-alerts' });
                        }
                    } else {
                        Swal.fire({ title: 'Silindi!', text: 'Link Kaydı Başarılı Bir Şekilde Silindi.', icon: 'success', customClass: 'sweet-alerts' });
                        reloadLinkList()
                    }
                });

            }
        });

    }


    const reOrderList = async (oldIndex: any, newIndex: any) => {
        const targetItem = recordsData[oldIndex];
        const index = newIndex + 1

    

        await navbarManagementServices.reorderLink(targetItem['_id'], {order: index}).then(res => {
            if (res?.data?.succedd && res?.data?.getAll) {
                setTotalItemCount(res?.data.getAll.length);
                setRecordsData(res?.data.getAll);

            }
        })
    }


    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);
    return (
        <div className="panel">
            <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 className="font-semibold text-lg dark:text-white-light">Navbar Yerleşimi</h5>
                <div>
                    <button type='button' onClick={() => setAddNewLinkModal(true)} className="group flex flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Yeni Ekle</span>
                    </button>
                </div>
                <div className="ltr:ml-auto rtl:mr-auto">
                    <input type="text" className="form-input w-auto" placeholder="Ara..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="table-responsive mb-5">

                <table className="sortable">
                    <thead>
                        <tr>
                            <th>Sıra</th>
                            <th>Link İsmi</th>
                            <th>Link URL</th>
                            <th>Eklenme Tarihi</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    {recordsData.length > 0 &&
                        <ReactSortable tag="tbody" onEnd={(e) => reOrderList(e.oldIndex, e.newIndex)} list={recordsData} setList={setRecordsData} animation={200} delay={2} ghostClass="gu-transit" group="shared">
                            {recordsData.map((data: any) => (
                                <tr key={data._id} >
                                    <td>
                                        <div className="whitespace-nowrap">{data.order}</div>
                                    </td>
                                    <td>
                                        <div className="whitespace-nowrap">{data.title}</div>
                                    </td>
                                    <td>
                                        <div className="whitespace-nowrap">{data.link}</div>
                                    </td>
                                    <td>{data.createdAt}</td>
                                    <td className="text-center">
                                        <ul className="flex items-center justify-left gap-2">
                                            <li>
                                                <Tippy content="Edit">
                                                    <button onClick={() => {
                                                        setUpdateLinkModal(true);
                                                        setTargetLink(data)
                                                    }}>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-success">
                                                            <path
                                                                d="M15.2869 3.15178L14.3601 4.07866L5.83882 12.5999L5.83881 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L4.19792 21.6782L7.47918 20.5844L7.47919 20.5844C8.25353 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5344 19.0269 10.8229 18.7383 11.4001 18.1612L11.4001 18.1612L19.9213 9.63993L20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178Z"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                            />
                                                            <path
                                                                opacity="0.5"
                                                                d="M14.36 4.07812C14.36 4.07812 14.4759 6.04774 16.2138 7.78564C17.9517 9.52354 19.9213 9.6394 19.9213 9.6394M4.19789 21.6777L2.32178 19.8015"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                            />
                                                        </svg>
                                                    </button>
                                                </Tippy>
                                            </li>
                                            <li>
                                                <Tippy content="Delete" >
                                                    <button type="button" onClick={() => destroyNavLink(data._id)}>
                                                        <svg className="text-danger" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                opacity="0.5"
                                                                d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                            />
                                                            <path d="M20.5001 6H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                            <path
                                                                d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                            />
                                                            <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                            <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        </svg>
                                                    </button>
                                                </Tippy>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </ReactSortable>
                    }


                </table>
            </div>
            <UpdateLink updateLinkModal={updateLinkModal} setUpdateLinkModal={setUpdateLinkModal} data={targetLink} reloadInitialValues={() => reloadLinkList()} />
            <AddNewLink addNewLinkModal={addNewLinkModal} setAddNewLinkModal={setAddNewLinkModal} reloadInitialValues={() => reloadLinkList()} />
        </div>
    );
};

export default NavbarManagement;
