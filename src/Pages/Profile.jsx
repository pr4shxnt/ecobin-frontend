import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTenant } from "../Features/Slices/User/Tenants/TenantAuthSlice";

export default function Profile() {
  const dispatch = useDispatch();
  var { tenant } = useSelector((state) => state.tenantAuth);

  useEffect(() => {
    dispatch(getTenant());
  }, [dispatch]);

  if (!tenant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen  w-full bg-gray-50 flex gap-3 justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Tenant Profile
        </h2>

        {/* Name */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Name:</h3>
          <p>
            {tenant?.data?.firstName || "N/A"} {tenant?.data?.lastName || ""}
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Email:</h3>
          <p>{tenant?.data?.emailAddress || "N/A"}</p>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Phone Number:</h3>
          <p>{tenant?.data?.phoneNumber || "N/A"}</p>
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Date of Birth:</h3>
          <p>
            {tenant?.data?.dateOfBirth
              ? new Date(tenant.data.dateOfBirth).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* Occupation */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Occupation:</h3>
          <p>{tenant?.data?.occupation || "N/A"}</p>
        </div>

        {/* Employer */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Employer:</h3>
          <p>{tenant?.data?.employer || "N/A"}</p>
        </div>

        {/* Annual Income */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Annual Income:</h3>
          <p>
            NPR{" "}
            {tenant?.data?.annualIncome
              ? tenant.data.annualIncome.toLocaleString()
              : "N/A"}
          </p>
        </div>

        {/* Address */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Address:</h3>
          <p>
            {tenant?.data?.currentAddress || "N/A"},{" "}
            {tenant?.data?.city || "N/A"}, {tenant?.data?.state || "N/A"} -{" "}
            {tenant?.data?.zipCode || "N/A"}
          </p>
        </div>

        {/* Created At */}
        <div className="mt-6 text-gray-500 text-sm text-center">
          Profile created at:{" "}
          {tenant?.data?.createdAt
            ? new Date(tenant.data.createdAt).toLocaleString()
            : "N/A"}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Your House Owner Profile
        </h2>

        {/* Name */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Name:</h3>
          <p>
            {tenant?.data?.firstName || "N/A"} {tenant?.data?.lastName || ""}
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Email:</h3>
          <p>{tenant?.data?.emailAddress || "N/A"}</p>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Phone Number:</h3>
          <p>{tenant?.data?.phoneNumber || "N/A"}</p>
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Date of Birth:</h3>
          <p>
            {tenant?.data?.dateOfBirth
              ? new Date(tenant.data.dateOfBirth).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* Occupation */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Occupation:</h3>
          <p>{tenant?.data?.occupation || "N/A"}</p>
        </div>

        {/* Employer */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Employer:</h3>
          <p>{tenant?.data?.employer || "N/A"}</p>
        </div>

        {/* Annual Income */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Annual Income:</h3>
          <p>
            NPR{" "}
            {tenant?.data?.annualIncome
              ? tenant.data.annualIncome.toLocaleString()
              : "N/A"}
          </p>
        </div>

        {/* Address */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Address:</h3>
          <p>
            {tenant?.data?.currentAddress || "N/A"},{" "}
            {tenant?.data?.city || "N/A"}, {tenant?.data?.state || "N/A"} -{" "}
            {tenant?.data?.zipCode || "N/A"}
          </p>
        </div>

        {/* Created At */}
        <div className="mt-6 text-gray-500 text-sm text-center">
          Profile created at:{" "}
          {tenant?.data?.createdAt
            ? new Date(tenant.data.createdAt).toLocaleString()
            : "N/A"}
        </div>
      </div>
    </div>
  );
}
