import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client'
// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Redux
import { Provider } from 'react-redux';
import { persistor, store } from './store/index';
import PrivateRoutes from './utils/PrivateRoutes';
import Index from './pages/Index';
import LoginBoxed from './pages/Authentication/LoginBoxed';
import SmsSettings from './pages/APISettings/SmsSettings';
import SystemSettings from './pages/SystemSettings';
import BunnynetVideoSettings from './pages/APISettings/BunnynetVideoSettings';
import BunnynetPhotoSettings from './pages/APISettings/BunnynetPhotoSettings';
import EnterpriseUsers from './pages/UserManagement/EnterpriseUsers';
import Doctors from './pages/UserManagement/Doctors';
import Users from './pages/UserManagement/Users';
import SubEnterpriseUsers from './pages/UserManagement/SubEnterpriseUsers';
import HomePageSeoManagement from './pages/Homepage/HomePageSeoManagement';
import HomePageToppartManagement from './pages/Homepage/HomePageToppartManagement';
// import IndividualUserDetails from './pages/UserManagement/IndividualUserDetails';
import ToolTracking from './pages/UserManagement/ToolTracking';
import EnterpriseUserDetails from './pages/UserManagement/EnterpriseUserDetails';
// import SubEnterpriseUserDetails from './pages/UserManagement/SubEnterpriseUserDetails';
import SubUserDetails from "./pages/UserManagement/SubUserDetails"
import { PersistGate } from 'redux-persist/integration/react';
import FooterLinks from './pages/FooterManagement/components/FooterLinks';
import NavbarManagement from './pages/NavbarManagement';
import ChatGPTSettings from './pages/APISettings/ChatGPTSettings';
import ProfileSettings from './pages/Profile/Settings';
import FooterCategory from './pages/FooterManagement';
import HomePageAboutpartManagement from './pages/Homepage/HomePageAboutPartManagement';
import HomePageBlogManagement from './pages/Homepage/HomePageBlogPartManagement';
import HomePageOfficePartManagement from './pages/Homepage/HomePageOfficePartManagement';
import LoginPageManagement from './pages/LoginRegister/LoginPageManagement';
import LoginPopupManagement from './pages/LoginRegister/LoginPopupManagement';
import RegisterPageManagement from './pages/LoginRegister/RegisterPageManagement';
import RegisterPopupManagement from './pages/LoginRegister/RegisterPopupManagement';
import ResourceTrackingDetails from './pages/UserManagement/ResourceTracking';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Suspense>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<PrivateRoutes />}>
                                <Route element={<Index />} path="/" />
                                <Route element={<ChatGPTSettings />} path="/chatgpt-ayarlari" />
                                <Route element={<SmsSettings />} path="/sms-ayarlari" />
                                <Route element={<BunnynetVideoSettings />} path="/bunnynet-video-ayarlari" />
                                <Route element={<BunnynetPhotoSettings />} path="/bunnynet-fotograf-ayarlari" />
                                <Route element={<SystemSettings />} path="/sistem-ayarlari" />
                                <Route element={<HomePageAboutpartManagement />} path="/anasayfa-yonetimi/hakkimizda" />
                                <Route element={<HomePageOfficePartManagement />} path="/anasayfa-yonetimi/ofisler" />
                                <Route element={<HomePageBlogManagement />} path="/anasayfa-yonetimi/bloglar" />
                                <Route element={<HomePageSeoManagement />} path="/anasayfa-yonetimi/seo" />

                                <Route element={<FooterCategory />} path="/footer-yonetimi" />
                                <Route element={<FooterLinks />} path="/footer-kategori-detay/:id" />
                                <Route element={<NavbarManagement />} path="/navbar-yonetimi" />
                                <Route element={<EnterpriseUsers />} path="/doktor-onay" />
                                <Route element={<Doctors />} path="/doktorlar" />
                                <Route element={<Users />} path="/kullanicilar" />
                                <Route element={<EnterpriseUserDetails />} path="/doktorlar" />
                                <Route element={<SubEnterpriseUsers />} path="/alt-kullanicilar/yonetici/:id" />
                                <Route element={<SubUserDetails />} path="/yonetici-alt-kullanici-detay/:id" />
                                <Route element={<ToolTracking/>} path="/araclar-detay/:id" />
                                <Route element={<ResourceTrackingDetails/>} path="/kaynak-detay/:id" />


                                <Route element={<ProfileSettings/>} path="/profil-ayarlari" />

                                <Route element={<LoginPageManagement />} path="/giris-yap/page" />
                                <Route element={<LoginPopupManagement />} path="/giris-yap/modal" />
                                <Route element={<RegisterPageManagement />} path="/kayit-ol/page" />
                                <Route element={<RegisterPopupManagement />} path="/kayit-ol/modal" />

                            </Route>
                            <Route element={<LoginBoxed />} path="/login" />
                        </Routes>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </Suspense>
    </React.StrictMode>


);

