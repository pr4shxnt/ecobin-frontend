import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, FileText, User, FileCheck } from "lucide-react";
import AuthNav from "../Components/AuthNav";
import { registerTenant } from "../Features/Slices/User/Tenants/TenantAuthSlice";

const TenantRegister = () => {
  const dispatch = useDispatch();
  const { isTenantAuthenticated } = useSelector((state) => state.tenantAuth);
  const { isLandlordAuthenticated } = useSelector(
    (state) => state.landlordAuth
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isTenantAuthenticated) {
      navigate("/tenant");
    } else if (isLandlordAuthenticated) {
      navigate("/landlord");
    } else {
      return;
    }
  }, [isLandlordAuthenticated, isTenantAuthenticated]);

  const { loading, error } = useSelector((state) => state.tenantAuth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    occupation: "",
    employer: "",
    annualIncome: "",
    currentAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [documents, setDocuments] = useState({
    rentalAgreement: null,
    photoIdentity: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e, documentType) => {
    const file = e.target.files[0];
    if (file) setDocuments((prev) => ({ ...prev, [documentType]: file }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "DOB is required";
    if (!formData.password) newErrors.password = "Password required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords must match";
    if (!documents.rentalAgreement)
      newErrors.rentalAgreement = "Rental Agreement required";
    if (!documents.photoIdentity) newErrors.photoIdentity = "Photo ID required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("rentalAgreement", documents.rentalAgreement);
    data.append("photoIdentityProof", documents.photoIdentity);

    dispatch(registerTenant(data));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <AuthNav />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Tenant Registration
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Register as a tenant to find your perfect home
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Personal Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              {/* Employment Information */}
              <div>
                <label
                  htmlFor="occupation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Occupation
                </label>
                <input
                  id="occupation"
                  name="occupation"
                  type="text"
                  required
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.occupation ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.occupation}
                  onChange={handleInputChange}
                />
                {errors.occupation && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.occupation}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="employer"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employer
                </label>
                <input
                  id="employer"
                  name="employer"
                  type="text"
                  required
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.employer ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.employer}
                  onChange={handleInputChange}
                />
                {errors.employer && (
                  <p className="mt-1 text-sm text-red-600">{errors.employer}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="annualIncome"
                  className="block text-sm font-medium text-gray-700"
                >
                  Annual Income
                </label>
                <input
                  id="annualIncome"
                  name="annualIncome"
                  type="number"
                  required
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.annualIncome ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.annualIncome}
                  onChange={handleInputChange}
                  placeholder="Enter annual income"
                />
                {errors.annualIncome && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.annualIncome}
                  </p>
                )}
              </div>

              {/* Current Address */}
              <div>
                <label
                  htmlFor="currentAddress"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Address
                </label>
                <input
                  id="currentAddress"
                  name="currentAddress"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.currentAddress}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ZIP Code
                  </label>
                  <input
                    id="zipCode"
                    name="zipCode"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Password Fields */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className={`mt-1 block w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className={`mt-1 block w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Document Uploads */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rental Agreement
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      errors.rentalAgreement
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "rentalAgreement")}
                      className="hidden"
                      id="rentalAgreement"
                    />
                    <label htmlFor="rentalAgreement" className="cursor-pointer">
                      <FileText className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        {documents.rentalAgreement
                          ? documents.rentalAgreement.name
                          : "Click to upload rental agreement"}
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, or images up to 10MB
                      </p>
                    </label>
                  </div>
                  {errors.rentalAgreement && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.rentalAgreement}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo Identity Proof
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      errors.photoIdentity
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "photoIdentity")}
                      className="hidden"
                      id="photoIdentity"
                    />
                    <label htmlFor="photoIdentity" className="cursor-pointer">
                      <FileCheck className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        {documents.photoIdentity
                          ? documents.photoIdentity.name
                          : "Click to upload photo identity proof"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Driver's license, passport, or government ID
                      </p>
                    </label>
                  </div>
                  {errors.photoIdentity && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.photoIdentity}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Register as Tenant
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/tenant-login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                {loading ? "Registering..." : "Register as Tenant"}
              </button>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/tenant-login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TenantRegister;
