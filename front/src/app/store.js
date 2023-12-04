import { configureStore } from "@reduxjs/toolkit";
import agentSlice from "../features/agent/agentSlice";
import { api } from "../features/api/api";
import filterSlice from "../features/filter/filterSlice";
import propertiesSlice from "../features/properties/propertiesSlice";
import settingReducer from "../features/settings/generalsetting";
import locationReducers from "../features/location/locationSlice";
import stepperSlice from "../features/stepper/stepperSlice";
import crudFormSlice from "../features/crudForm/crudFormSlice";
import userInfoSlice  from "../features/userInfo/userInfoSlice";
import presentationSlice from "../features/presentation/presentationSlice";
import advertFilterSlice from "../features/advertFilter/advertFilterSlice";
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    properties: propertiesSlice,
    filter: filterSlice,
    agent: agentSlice,
    generalSettings: settingReducer,
    location: locationReducers,
    stepper: stepperSlice,
    crudFrom: crudFormSlice,
    userInfomation: userInfoSlice,
    presentationMode: presentationSlice,
    advertFilters: advertFilterSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
