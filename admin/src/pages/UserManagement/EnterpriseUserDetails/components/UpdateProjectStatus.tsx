import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2';
import Select from 'react-select';
import DetailTabs from './DetailTabs';
import DetailInfo from './DetailInfo';
import DetailFeatures from './DetailFeatures';
import projectServices from '../../../../services/project.service';
import DetailEmployees from './DetailEmployees';

const UpdateFeature = (props: any) => {
    const [targetData, setTargetData] = useState({})
    const [targetFeatures, setTargetFeatures] = useState<any>([])
    const [tabs, setTabs] = useState<string>('info');
    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    useEffect(() => {
        if(props?.data?._id){
            projectServices.getProjectDetail(props?.data?._id).then((res:any) => {
                if(res?.data?.succeded && res?.data?.data){
                    console.log('res.data.data', res?.data?.data);

                    setTargetData(res?.data?.data)
                }

            })
        }
        // if(props?.data?.features?.length){
        //     setTargetFeatures(props?.data?.features)
        // }
    }, [props?.data])







    return (
        <Transition appear show={props?.updateFeatureModal} as={Fragment}>
            <Dialog as="div" open={props?.updateFeatureModal} onClose={() => props.setUpdateFeatureModal(false)} className="relative z-50">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-[black]/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel style={{ minWidth: '80%' }} className="panel border-0 p-0 rounded-lg  w-full max-w-lg text-black dark:text-white-dark">
                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                    <h5 className="font-bold text-lg">İlan Detay</h5>
                                    <button onClick={() => props.setUpdateFeatureModal(false)} type="button" className="text-white-dark hover:text-dark">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"></circle><path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>
                                    </button>
                                </div>

                                <div className="p-5">

                                    <DetailTabs toggleTabs={toggleTabs} tabs={tabs} />
                                    {tabs === 'info' ? (
                                        <DetailInfo data={targetData} dialogStatus={props.updateFeatureModal} />
                                    ) : (
                                        ''
                                    )}
                                    {tabs === 'tools' ? (
                                        <DetailFeatures data={targetData} dialogStatus={props.updateFeatureModal} />
                                    ) : (
                                       ""
                                    )}
                                    {tabs === 'employee' ? (
                                        <DetailEmployees data={targetData} dialogStatus={props.updateFeatureModal} />
                                    ) : (
                                       ""
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default UpdateFeature;
