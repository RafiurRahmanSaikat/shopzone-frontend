import { Eye, EyeOff, User } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import uploadImage from "../../utils/UploadImage";

const SignUpForm = () => {
  const { signup, loading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [imageData, setImageData] = useState({ file: null, preview: null });

  // Use snake_case keys to match your Django backend
  const initialFormData = {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
    role: "",
    address: "",
    profile_picture: "",
    phone_number: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // If a profile image file is selected, upload it and update the form data
      if (imageData.file) {
        const imageUrl = await uploadImage(imageData.file);
        formData.profile_picture = imageUrl;
      }

      const response = await signup(formData);
      console.log(response);
      if (response.status === 201) {
        setFormData(initialFormData);
        setImageData({ file: null, preview: null });
      }
      console.log(response.status);
    } catch (error) {
      console.error(error);
    }
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
      // Update profile_picture in formData with the file (to be uploaded on submit)
      setFormData((prev) => ({
        ...prev,
        profile_picture: selectedFile,
      }));
    } else {
      setImageData({ file: null, preview: null });
      setFormData((prev) => ({
        ...prev,
        profile_picture: "",
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
              name="profile_picture"
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
            required
            type="text"
            name="first_name"
            value={formData.first_name}
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
            required
            type="text"
            name="last_name"
            value={formData.last_name}
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
            required
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
            required
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
            required
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
            required
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
            required
            type={showPassword ? "text" : "password"}
            name="confirm_password"
            autoComplete="confirm-password"
            value={formData.confirm_password}
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
    </form>
  );
};

export default SignUpForm;
