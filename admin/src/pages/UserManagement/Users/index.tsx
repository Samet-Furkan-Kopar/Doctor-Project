import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { setPageTitle } from '../../../store/themeConfigSlice';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import userServices from '../../../services/user.service';
import AddNewUser from './components/AddNewUser';
import UpdateUser from './components/UpdateUser';
import convertDateToLocale from '../../../utils/DateConverter';

const EnterpriseUsers = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    useEffect(() => {
        dispatch(setPageTitle('Kullanıcılar'));//değişti
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [page, setPage] = useState(1);
    const [totalItemCount, setTotalItemCount] = useState(0);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState([]);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [targetUser, setTargetUser] = useState<object>({})
    const [updateUserModal, setUpdateUserModal] = useState<boolean>(false)
    const [addModal, setAddModal] = useState<boolean>(false)
    const [updateModal, setUpdateModal] = useState<boolean>(false)
    const [loadingStatus, setLoadingStatus] = useState(true)
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
    const [initialRecordsLength, setInitialRecordsLength] = useState(0);


    const reloadManagerUserList = () => {
        userServices.getUserList(page, pageSize, search)
            .then((res: any) => {
                console.log(res);


                setLoadingStatus(false)
                if (res?.succeded && res?.data) {
                    setTotalItemCount(res?.data.length);
                    setRecordsData(res?.data);
                    setInitialRecordsLength(res?.totalRecord)
                }
            });
    };

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        reloadManagerUserList()

    }, [page, pageSize, initialRecords, search]);


    const destroyTargetUser = async (id: string) => {
        Swal.fire({
            icon: 'warning',
            title: 'Kullanıcıyı Silmek İstediğinizden Emin Misiniz?',
            text: "Bu işlemi geri alamazsınız!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then(async (result) => {
            if (result.value) {
                await userServices.userDelete(id).then((res: any) => {
                    if (!res || res?.error || res?.status === 'fail' || res?.succedd === false) {
                        if (res?.message) {
                            Swal.fire({ title: 'Hata!', text: res?.message, icon: 'error', customClass: 'sweet-alerts' });
                        } else {
                            Swal.fire({ title: 'Hata!', text: 'İşlem Gerçekleştirilirken Hata İle Karşılaşıldı.', icon: 'error', customClass: 'sweet-alerts' });
                        }
                    } else {
                        Swal.fire({ title: 'Silindi!', text: 'Kullaıcı Kaydı Başarılı Bir Şekilde Silindi.', icon: 'success', customClass: 'sweet-alerts' });
                        reloadManagerUserList()
                    }
                });

            }
        });
    }




    const randomStatus = (st: any) => {
        if (st && Object.keys(st).length > 0 && st.isStatus) {
            return {
                text: 'AKTİF',
                color: 'success'
            }
        } else {
            return {
                text: 'ONAY BEKLİYOR',
                color: 'warning'
            }
        }
    };

    const randomApprovel = (st: any) => {
        if (st && Object.keys(st).length > 0 && st.isApproved) {
            return {
                text: 'AKTİF',
                color: 'success'
            }
        } else {
            return {
                text: 'ONAY BEKLİYOR',
                color: 'warning'
            }
        }
    };

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);
    return (
        <div className="panel">
            <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 className="font-semibold text-lg dark:text-white-light">Kullanıcılar</h5>
                {/* <div>
                    <button onClick={() => setAddModal(true)} className="group flex flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark"></span>
                    </button>
                </div> */}
                <div className="ltr:ml-auto rtl:mr-auto">
                    <input type="text" className="form-input w-auto" placeholder="Ara..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="datatables">
                <DataTable
                    highlightOnHover
                    fetching={loadingStatus}
                    className={`${isRtl ? 'whitespace-nowrap table-hover' : 'whitespace-nowrap table-hover'}`}
                    records={recordsData}
                    columns={[
                        { accessor: 'firstName', title: 'Kullanıcının Adı', sortable: true, render: (info) => <span >{info.firstName}</span> },
                        { accessor: 'lastName', title: ' SoyAdı', sortable: true, render: (info) => <span>{info.lastName}</span> },
                        { accessor: 'email', title: ' Mail', sortable: true, render: (info) => <span>{info.email}</span> },
                        { accessor: 'isStatus', title: 'Aktivasyon Durumu', sortable: true, render: (info) => <span className={`badge badge-outline-${randomStatus(info).color} `}>{randomStatus(info).text}</span> },
                        {
                            accessor: 'actions', title: 'İşlemler', render: (info: any) => (
                                <ul className="flex items-center justify-left gap-2">



                                    <li>
                                        <Tippy content="Sil">
                                            <button type="button" onClick={() => destroyTargetUser(info._id)}>
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
                            )
                        },
                    ]}
                    loaderColor='#144273'
                    totalRecords={initialRecordsLength}
                    recordsPerPage={pageSize}
                    page={page}
                    onPageChange={(p) => setPage(p)}
                    recordsPerPageOptions={PAGE_SIZES}
                    onRecordsPerPageChange={setPageSize}
                    sortStatus={sortStatus}
                    onSortStatusChange={setSortStatus}
                    minHeight={200}
                    paginationText={({ from, to, totalRecords }) => `${totalRecords} kayıttan ${from} ile ${to} arası gösteriliyor`}
                    noRecordsText='Kayıt Bulunamadı'
                />
            </div>
            <AddNewUser addModal={addModal} setAddModal={setAddModal} reloadEnterpriseUserList={() => reloadManagerUserList()} />
            <UpdateUser updateModal={updateModal} targetUser={targetUser} setUpdateModal={setUpdateModal} reloadEnterpriseUserList={() => reloadManagerUserList()} />
        </div>
    );
};

export default EnterpriseUsers;
