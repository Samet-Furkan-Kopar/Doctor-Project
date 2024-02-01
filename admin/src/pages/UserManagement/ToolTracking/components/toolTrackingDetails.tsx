import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../store';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useTranslation } from 'react-i18next';
import convertDateToLocale from '../../../../utils/DateConverter';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Swal from 'sweetalert2';
import projectServices from '../../../../services/project.service';


const ToolTracking = (props: any) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    useEffect(() => {
        dispatch(setPageTitle('Tüm İlanlar'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

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

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
    const [advertTypes, setAdvertTypes] = useState([])

    const toolTrackingGetList = () => {
        setLoadingStatus(true)
        projectServices
            .getToolTrackingList(page, pageSize, search, searchStartDate, searchEndDate, props.toolId)
            .then((res: any) => {

                setLoadingStatus(false)
                if (res?.data?.succeded && res?.data) {
                    
                    setTotalItemCount(res?.data?.totalRecord);
                    setRecordsData(res?.data?.data);
                    setInitialRecordsLength(res?.data?.totalRecord)
                }
            });
    };

    useEffect(() => {
        if (searchStartDate && searchEndDate) {
            toolTrackingGetList()
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
        toolTrackingGetList()

    }, [page, pageSize, initialRecords, search]);





    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);









    return (
        <div className="panel">
            <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 className="font-semibold text-lg dark:text-white-light">Araç Takip</h5>

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
                        { accessor: 'projectId.title', title: 'Proje İsmi', sortable: true, render: (info: any) => <>{(info.projectId.title)}</> },

                        { accessor: 'projectId.description', title: 'Proje Açıklama', sortable: true, render: (info: any) => <>{info.projectId.description}</> },
                        { accessor: 'projectId.short_description', title: 'Proje Kısa Açıklama', sortable: true, render: (info: any) => <>{info.projectId.short_description}</> },
                        { accessor: 'beginDate', title: 'Başlangıç Zamanı', sortable: true, render: (info: any) => <>{(info.beginDate)}</> },
                        { accessor: 'endDate', title: 'Bitiş Zamanı', sortable: true, render: (info: any) => <>{(info.endDate)}</> },

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




            </div>
        </div>
    );
};

export default ToolTracking;
