import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Upload, FileText, Home, MapPin } from "lucide-react";
import AuthNav from "../Components/AuthNav";
import { registerLandlord } from "../Features/Slices/User/Landlords/LandlordAuthSlice";

const LandlordRegister = () => {
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

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.landlordAuth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [documents, setDocuments] = useState({
    houseDocuments: null,
    proofOfAddress: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e, documentType) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments((prev) => ({
        ...prev,
        [documentType]: file,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.emailAddress.trim())
      newErrors.emailAddress = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.emailAddress))
      newErrors.emailAddress = "Email is invalid";

    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!documents.houseDocuments)
      newErrors.houseDocuments = "House documents are required";
    if (!documents.proofOfAddress)
      newErrors.proofOfAddress = "Proof of address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "confirmPassword") {
        // Don't send confirmPassword
        data.append(key, value);
      }
    });
    data.append("houseDocuments", documents.houseDocuments);
    data.append("proofOfAddress", documents.proofOfAddress);

    dispatch(registerLandlord(data));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <AuthNav />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <Home className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Landlord Registration
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Register as a property owner to list your properties
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
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
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
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
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
                  htmlFor="emailAddress"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  required
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.emailAddress ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                />
                {errors.emailAddress && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.emailAddress}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Address Information */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={formData.address}
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                    className={`mt-1 block w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
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
                    className={`mt-1 block w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
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
                    House Documents (Property Deed, Title, etc.)
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      errors.houseDocuments
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "houseDocuments")}
                      className="hidden"
                      id="houseDocuments"
                    />
                    <label htmlFor="houseDocuments" className="cursor-pointer">
                      <FileText className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        {documents.houseDocuments
                          ? documents.houseDocuments.name
                          : "Click to upload house documents"}
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, or images up to 10MB
                      </p>
                    </label>
                  </div>
                  {errors.houseDocuments && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.houseDocuments}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proof of Address
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      errors.proofOfAddress
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, "proofOfAddress")}
                      className="hidden"
                      id="proofOfAddress"
                    />
                    <label htmlFor="proofOfAddress" className="cursor-pointer">
                      <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        {documents.proofOfAddress
                          ? documents.proofOfAddress.name
                          : "Click to upload proof of address"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Utility bill, bank statement, or government ID
                      </p>
                    </label>
                  </div>
                  {errors.proofOfAddress && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.proofOfAddress}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                {loading ? "Registering..." : "Register as Landlord"}
              </button>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/landlord-login"
                  className="font-medium text-green-600 hover:text-green-500"
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

export default LandlordRegister;
