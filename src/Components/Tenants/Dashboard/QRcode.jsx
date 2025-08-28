import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QRCodeCanvas } from "qrcode.react";
import { getTenant } from "../../../Features/Slices/User/Tenants/TenantAuthSlice";

const QRcode = () => {
  // Get tenant profile from Redux store
  const { tenant } = useSelector((state) => state.tenantAuth);
  console.log(tenant);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTenant());
  }, [dispatch]);

  // Prepare QR code data

  const link = `https://ecobin.prashantadhikari7.com.np/admin/userinput/${tenant?.data?._id}`;
  return (
    <div className="min-h-screen w-full bg-green-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white w-[50%] mx-auto rounded-xl shadow-md p-8 flex flex-col items-center">
        <h3 className="text-green-800 mb-4 text-lg font-semibold">
          Your QR Code
        </h3>
        <p className="text-green-700 text-sm mb-6 text-center font-medium">
          <strong>Do not reveal or share this QR code with anyone.</strong>
        </p>
        {tenant ? (
          <>
            <QRCodeCanvas value={link} size={200} />
            <div className="mt-6 w-full">
              <div className="bg-green-100 rounded p-3 text-green-900 text-xs text-center">
                This QR code is unique to your account. Keep it safe and do not
                display it publicly.
              </div>
              <div className="mt-4 flex flex-col items-center">
                <span className="text-gray-500 text-xs mb-1">Tenant ID:</span>
                <span className="text-green-800 font-mono text-sm">
                  {tenant.data._id}
                </span>
              </div>
            </div>
          </>
        ) : (
          <p>No tenant data found.</p>
        )}
      </div>
    </div>
  );
};

export default QRcode;
