import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTenantByTenantId } from "../Features/Slices/User/Tenants/TenantAuthSlice";
import ImageScanner from "./Tenants/Dashboard/ImageScanner";

const UserInput = () => {
  const { userId } = useParams();
  const { tenantSingle, loading, error } = useSelector(
    (state) => state.tenantAuth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTenantByTenantId(userId));
  }, [dispatch, userId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading tenant data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!tenantSingle) {
    return <p className="text-center text-gray-400">No tenant found</p>;
  }

  const {
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    dateOfBirth,
    occupation,
    employer,
    annualIncome,
    currentAddress,
    city,
    state,
    zipCode,
    createdAt,
  } = tenantSingle.data;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6  w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {firstName} {lastName}
        </h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Email:</span> {emailAddress}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {phoneNumber}
          </p>
          <p>
            <span className="font-semibold">Date of Birth:</span>{" "}
            {new Date(dateOfBirth).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Occupation:</span> {occupation}
          </p>
          <p>
            <span className="font-semibold">Employer:</span> {employer}
          </p>
          <p>
            <span className="font-semibold">Annual Income:</span> $
            {annualIncome.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {currentAddress},{" "}
            {city}, {state} {zipCode}
          </p>
          <p>
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <ImageScanner />
    </div>
  );
};

export default UserInput;
