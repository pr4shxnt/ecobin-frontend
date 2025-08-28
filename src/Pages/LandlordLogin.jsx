import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Home } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginLandlord } from "../Features/Slices/User/Landlords/LandlordAuthSlice";
import AuthNav from "../Components/AuthNav";

const LandlordLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isTenantAuthenticated } = useSelector((state) => state.tenantAuth);
  const { isLandlordAuthenticated } = useSelector(
    (state) => state.landlordAuth
  );

  useEffect(() => {
    if (isTenantAuthenticated) {
      navigate("/tenant");
    } else if (isLandlordAuthenticated) {
      navigate("/landlord/dashboard");
    } else {
      return;
    }
  }, [isLandlordAuthenticated, isTenantAuthenticated]);

  const { loading, error } = useSelector((state) => state.landlordAuth);

  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.emailAddress.trim())
      newErrors.emailAddress = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.emailAddress))
      newErrors.emailAddress = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    if (validateForm()) {
      console.log("Form validation passed, dispatching login action");
      dispatch(loginLandlord(formData))
        .then((res) => {
          console.log("Login response:", res);
          if (res.meta.requestStatus === "fulfilled") {
            console.log("Login successful, navigating to dashboard");
            navigate("/landlord-dashboard"); // redirect after login
          } else {
            console.log("Login failed:", res.payload);
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
    } else {
      console.log("Form validation failed");
    }
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
              Landlord Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to manage your properties
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
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
                  placeholder="Enter your email"
                />
                {errors.emailAddress && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.emailAddress}
                  </p>
                )}
              </div>

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
                    placeholder="Enter your password"
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
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/landlord-forgot-password"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>

            {error && (
              <div className="text-center text-red-600 text-sm mt-2">
                {error}
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/landlord-register"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandlordLogin;
