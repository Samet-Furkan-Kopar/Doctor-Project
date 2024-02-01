import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../store';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import userServices from '../../../../services/user.service';
import convertDateToLocale from '../../../../utils/DateConverter';

import Swal from 'sweetalert2';


const Recourse = (props: any) => {


    const dispatch = useDispatch();
    const { t } = useTranslation();
    useEffect(() => {
        dispatch(setPageTitle('Kayıtlı Kurslar'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [page, setPage] = useState(1);
    const [totalItemCount, setTotalItemCount] = useState(0);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState([]);
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
    const [loadingStatus, setLoadingStatus] = useState(true)
    const [initialRecordsLength, setInitialRecordsLength] = useState(0);

    const reloadEducationList = (id: any) => {
        setLoadingStatus(true)
        userServices
            .getUserRecourseList(page, pageSize, search, id)
            .then((res) => {
                console.log(res?.data?.totalRecord);

                setLoadingStatus(false)
                if (res?.data && res?.data?.succeded && res?.data?.data) {
                    setTotalItemCount(res?.data?.data.length)
                    setRecordsData(res?.data?.data);
                    setInitialRecordsLength(res?.data?.totalRecord)
                }
            });
    };


    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        if (props && props.userId) {
            reloadEducationList(props.userId)
        }

    }, [page, pageSize, initialRecords, search, props]);



    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);



    return (
        <div className="panel">
            <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 className="font-semibold text-lg dark:text-white-light">Kullanıcı İzinleri</h5>
                <div className="ltr:ml-auto rtl:mr-auto">
                    <input type="text" className="form-input w-auto" placeholder="Ara..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="datatables">
                <DataTable
                fetching={loadingStatus}
                    highlightOnHover
                    className={`${isRtl ? 'whitespace-nowrap table-hover' : 'whitespace-nowrap table-hover'}`}
                    records={recordsData}
                    columns={[
                        { accessor: 'title', title: 'İzin Başlıgı', sortable: true },
                        { accessor: 'description', title: 'İzin Açıklaması', sortable: true },
                        { accessor: 'recourseTypeId.name', title: 'İzin Tipi', sortable: true },
                        { accessor: 'beginDate', title: 'Başlangıç Tarihi', sortable: true, render: (info:any) => <>{convertDateToLocale(info?.beginDate)}</> },
                        { accessor: 'endDate', title: 'Bitiş Tarihi', sortable: true, render: (info:any) => <>{convertDateToLocale(info?.endDate)}</> },
                        { accessor: 'status', title: 'Durumu', sortable: true },

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
        </div>
    );
};

export default Recourse;
