import { Eye, EyeOff, User } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

const SignUpForm = () => {
  const { signup, loading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [imageData, setImageData] = useState({ file: null, preview: null });
  const initialFromData = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    role: "",
    address: "",
    image: null,
    phone_number: "",
  };
  const [formData, setFormData] = useState(initialFromData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signup(formData);
    console.log(response);
    if (response.status === 201) setFormData(initialFromData);
    console.log(response.status);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setImageData({
        file: selectedFile,
        preview: URL.createObjectURL(selectedFile),
      });
      setFormData((prev) => ({
        ...prev,
        image: selectedFile,
      }));
    } else {
      setImageData({ file: null, preview: null });
      setFormData((prev) => ({
        ...prev,
        image: null,
      }));
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {imageData.preview ? (
        <div className="flex justify-center">
          <img
            src={imageData.preview}
            alt="Preview"
            className="h-24 w-24 rounded-full object-cover"
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <label className="flex h-28 w-28 cursor-pointer flex-col items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-sm font-medium text-gray-900 hover:bg-gray-200">
            <span className="text-center">Profile Picture</span>
            <input
              name="image"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <div className="mt-2">
              <User className="h-6 w-6 text-gray-500" />
            </div>
          </label>
        </div>
      )}
      {/* First Name and Last Name */}

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            required={true}
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
            placeholder="First Name"
          />
        </div>

        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            required={true}
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
            placeholder="Last Name"
          />
        </div>
      </div>
      {/* Username and Account Type */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            required={true}
            type="text"
            name="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
            placeholder="Enter your username"
          />
        </div>
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Account Type
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
          >
            <option value="">Select</option>
            <option value="customer">Customer</option>
            <option value="store_owner">Store Owner</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
      {/* Email and Mobile Number */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            required={true}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            required={true}
            type="text"
            name="phone_number"
            autoComplete="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
            placeholder="Mobile number"
          />
        </div>
      </div>
      {/* Password and Confirm Password */}
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            required={true}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            autoComplete="new-password"
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-3 pr-10 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[60%] right-3 -translate-y-1/2 text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="relative w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            required={true}
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            autoComplete="confirm-password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-3 pr-10 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[60%] right-3 -translate-y-1/2 text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
          placeholder="Your address"
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`mt-6 w-full rounded-lg bg-purple-600 p-3 font-medium text-white transition-all duration-200 ${
          loading ? "cursor-not-allowed opacity-70" : "hover:bg-purple-700"
        }`}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
      {/* <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { icon: Github01Icon, label: "GitHub" },
            { icon: TwitterIcon, label: "Twitter" },
            { icon: Facebook01Icon, label: "Facebook" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      </div> */}
    </form>
  );
};

export default SignUpForm;
