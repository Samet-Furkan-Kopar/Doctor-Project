import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../store';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useTranslation } from 'react-i18next';
import UpdateFeature from './UpdateProjectStatus';
import convertDateToLocale from '../../../../utils/DateConverter';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Swal from 'sweetalert2';
import projectServices from '../../../../services/project.service';
import AddNewProject from './AddNewProject';
import UpdateNewProject from './UpdateNewProject';


const Adverts = (props: any) => {//sayfa render oluyo detaya girince
    const dispatch = useDispatch();
    const { t } = useTranslation();
    useEffect(() => {
        dispatch(setPageTitle('Tüm İlanlar'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const id = props.officeId


    const [page, setPage] = useState(1);
    const [totalItemCount, setTotalItemCount] = useState(0);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState([]);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [targetShape, setTargetShape] = useState<object>({})
    const [updateShapeModal, setUpdateShapeModal] = useState<boolean>(false)
    const [addNewShapeModal, setAddNewShapeModal] = useState<boolean>(false)
    const [loadingStatus, setLoadingStatus] = useState(true)
    const [initialRecordsLength, setInitialRecordsLength] = useState(0);
    const [searchStartDate, setSearchStartDate] = useState('');
    const [searchEndDate, setSearchEndDate] = useState('');
    const [targetAdvert, setTargetAdvert] = useState<object>({})
    const [updateFeatureModal, setUpdateFeatureModal] = useState<boolean>(false)
    const [addModal, setAddModal] = useState<boolean>(false)
    const [updateModal, setUpdateModal] = useState<boolean>(false)
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
    const [advertTypes, setAdvertTypes] = useState([])

    const reloadProjectList = () => {
        setLoadingStatus(true)
        projectServices
            .getUserProjectListAll(page, pageSize, search, searchStartDate, searchEndDate, props.officeId)
            .then((res: any) => {
                setLoadingStatus(false)
                if (res?.succeded && res?.data) {
                    setTotalItemCount(res?.totalRecord);
                    setRecordsData(res?.data);
                    setInitialRecordsLength(res?.totalRecord)
                }
            });
    };

    useEffect(() => {
        if (searchStartDate && searchEndDate) {
            reloadProjectList()
        }
    }, [searchStartDate, searchEndDate])

    const setDateRange = (dt: any) => {
        setSearchStartDate(dt[0])
        setSearchEndDate(dt[1])
    }

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        reloadProjectList()

    }, [page, pageSize, initialRecords, search]);





    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);


    const destroyTargetProject = async (id: string) => {
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
                await projectServices.deleteProject(id).then((res: any) => {
                    if (!res || res?.error || res?.status === 'fail' || res?.succeded === false) {
                        if (res?.message) {
                            Swal.fire({ title: 'Hata!', text: res?.message, icon: 'error', customClass: 'sweet-alerts' });
                        } else {
                            Swal.fire({ title: 'Hata!', text: 'İşlem Gerçekleştirilirken Hata İle Karşılaşıldı.', icon: 'error', customClass: 'sweet-alerts' });
                        }
                    } else {
                        Swal.fire({ title: 'Silindi!', text: 'İlan Kaydı Başarılı Bir Şekilde Silindi.', icon: 'success', customClass: 'sweet-alerts' });
                        reloadProjectList()
                    }
                });

            }
        });

    }

    const randomStatus = (st: boolean) => {
        if (st) {
            return {
                text: 'Yayında',
                color: 'success'
            }
        } else {
            return {
                text: 'Yayında Değil',
                color: 'warning'
            }
        }
    };

    const randomBlockStatus = (st: boolean) => {
        if (st) {
            return {
                text: 'Onaylı Değil',
                color: 'success'
            }
        } else {
            return {
                text: 'Onaylandı',
                color: 'warning'
            }
        }
    };

    const toggleAdvertStatus = async (id: string) => {
        Swal.fire({
            icon: 'warning',
            title: 'Proje Durumunu Değiştirmek İstediğinizden Emin Misiniz?',
            text: "Onaylıyor musunuz!",
            showCancelButton: true,
            confirmButtonText: 'Onayla',
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then(async (result) => {
            if (result.value) {
                await projectServices.toggleAdvertStatus(id).then((res: any) => {
                    if (!res || res?.error || res?.status === 'fail' || res?.succedd === false) {
                        if (res?.message) {
                            Swal.fire({ title: 'Hata!', text: res?.message, icon: 'error', customClass: 'sweet-alerts' });
                        } else {
                            Swal.fire({ title: 'Hata!', text: 'İşlem Gerçekleştirilirken Hata İle Karşılaşıldı.', icon: 'error', customClass: 'sweet-alerts' });
                        }
                    } else {
                        Swal.fire({ title: 'Güncellendi!', text: 'İlan Durumu Başarılı Bir Şekilde Güncellendi.', icon: 'success', customClass: 'sweet-alerts' });
                        reloadProjectList()
                    }
                });

            }
        });

    }

    return (
        <div className="panel">
            <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 className="font-semibold text-lg dark:text-white-light">Tüm Projeler</h5>
                <div>
                    <button onClick={() => setAddModal(true)} className="group flex flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark"></span>
                    </button>
                </div>
                <div className="ltr:ml-auto rtl:mr-auto flex">
                    <div className='mr-4'>
                        <label htmlFor="courseStartDate">Oluşturulma Tarih Aralığı</label>
                        <Flatpickr options={{
                            dateFormat: 'd-m-Y', position: 'auto left',
                            mode: "range",
                            locale: {
                                weekdays: {
                                    longhand: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
                                    shorthand: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']
                                },
                                months: {
                                    longhand: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
                                    shorthand: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
                                },
                            }

                        }} className="form-input" onChange={(date: any) => setDateRange(date)} />
                    </div>
                    <div>
                        <label htmlFor="courseStartDate">Aranacak Kelime</label>
                        <input type="text" className="form-input w-auto" placeholder="Ara..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="datatables">

                <DataTable
                    highlightOnHover
                    className={`${isRtl ? 'whitespace-nowrap table-hover' : 'whitespace-nowrap table-hover'}`}
                    records={recordsData}
                    columns={[
                        { accessor: 'title', title: 'Proje Başlığı', sortable: true, render: (info: any) => <>{(info?.title)}</> },
                        { accessor: 'description', title: 'Açıklama', sortable: true, render: (info: any) => <>{(info?.description)}</> },
                        { accessor: 'short_description', title: 'Kısa Açıklama', sortable: true, render: (info: any) => <>{info?.short_description}</> },
                        { accessor: 'beginDate', title: 'Başlanbıç Tarihi', sortable: true, render: (info: any) => <>{info?.beginDate}</> },
                        { accessor: 'beginDate', title: 'Bitiş Tarihi', sortable: true, render: (info: any) => <>{info?.endDate}</> },
                        {
                            accessor: 'isStatus', title: 'Aktif/Pasif', sortable: true, render: (info: any) => <label className="w-12 h-6 relative">
                                <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" checked={info?.status?.value} onChange={() => toggleAdvertStatus(info._id.value)} />
                                <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                            </label>
                        },
                        {
                            accessor: 'actions', title: 'İşlemler', render: (info: any) => (
                                <ul className="flex items-center justify-left gap-2">
                                    <li>
                                        <Tippy content="Detay">
                                            <button type='button' style={{ height: '26px' }} onClick={() => {
                                                setUpdateFeatureModal(true)
                                                setTargetAdvert(info)
                                            }}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#1C274C" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.25C7.48587 3.25 4.44529 5.9542 2.68057 8.24686L2.64874 8.2882C2.24964 8.80653 1.88206 9.28392 1.63269 9.8484C1.36564 10.4529 1.25 11.1117 1.25 12C1.25 12.8883 1.36564 13.5471 1.63269 14.1516C1.88206 14.7161 2.24964 15.1935 2.64875 15.7118L2.68057 15.7531C4.44529 18.0458 7.48587 20.75 12 20.75C16.5141 20.75 19.5547 18.0458 21.3194 15.7531L21.3512 15.7118C21.7504 15.1935 22.1179 14.7161 22.3673 14.1516C22.6344 13.5471 22.75 12.8883 22.75 12C22.75 11.1117 22.6344 10.4529 22.3673 9.8484C22.1179 9.28391 21.7504 8.80652 21.3512 8.28818L21.3194 8.24686C19.5547 5.9542 16.5141 3.25 12 3.25ZM3.86922 9.1618C5.49864 7.04492 8.15036 4.75 12 4.75C15.8496 4.75 18.5014 7.04492 20.1308 9.1618C20.5694 9.73159 20.8263 10.0721 20.9952 10.4545C21.1532 10.812 21.25 11.2489 21.25 12C21.25 12.7511 21.1532 13.188 20.9952 13.5455C20.8263 13.9279 20.5694 14.2684 20.1308 14.8382C18.5014 16.9551 15.8496 19.25 12 19.25C8.15036 19.25 5.49864 16.9551 3.86922 14.8382C3.43064 14.2684 3.17374 13.9279 3.00476 13.5455C2.84684 13.188 2.75 12.7511 2.75 12C2.75 11.2489 2.84684 10.812 3.00476 10.4545C3.17374 10.0721 3.43063 9.73159 3.86922 9.1618Z" fill="#1C274C" />
                                                </svg>
                                            </button>
                                        </Tippy>
                                    </li>
                                    <li>
                                        <Tippy content="Düzenle">
                                            <button onClick={() => {
                                                setUpdateModal(true)
                                                setTargetAdvert(info)
                                            }} style={{ height: '26px' }}>
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
                                        <Tippy content="Sil">
                                            <button type="button" onClick={() => destroyTargetProject(info._id)}>
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
                    fetching={loadingStatus}
                    loaderColor='#144273'
                    totalRecords={totalItemCount}
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
                <AddNewProject addModal={addModal} setAddModal={setAddModal} id={id} reloadEnterpriseUserList={() => reloadProjectList()} />
                <UpdateNewProject updateModal={updateModal} targetAdvert={targetAdvert} id={id} setUpdateModal={setUpdateModal} reloadEnterpriseUserList={() => reloadProjectList()} />
                <UpdateFeature updateFeatureModal={updateFeatureModal} setUpdateFeatureModal={setUpdateFeatureModal} data={targetAdvert} reloadInitialValues={() => reloadProjectList()} />
            </div>
        </div>
    );
};

export default Adverts;
