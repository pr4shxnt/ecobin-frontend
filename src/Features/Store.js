import { configureStore } from "@reduxjs/toolkit";
import tenantAuthReducer from "./Slices/User/Tenants/TenantAuthSlice";
import landlordAuthReducer from "./Slices/User/Landlords/LandlordAuthSlice";
import invoiceReducer from "./Slices/User/InvoiceSlice";
import imageScanReducer from "./Slices/User/ImageScanSlice";

const store = configureStore({
  reducer: {
    tenantAuth: tenantAuthReducer,
    landlordAuth: landlordAuthReducer,
    invoice: invoiceReducer,
    imageScan: imageScanReducer,
  },
});

export default store;
