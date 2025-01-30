import { Facebook01Icon, Github01Icon, TwitterIcon } from "hugeicons-react";
import { Eye, EyeOff, User2Icon } from "lucide-react";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

const LoginForm = () => {
  const { login, loading } = useContext(AuthContext);
  const initialFormData = { username: "", password: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(formData);
    if (response.status === 200) setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          User Name
        </label>
        <div className="relative mt-1">
          <input
            type="text"
            name="username"
            required={true}
            value={formData.username}
            autoComplete="username"
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-3 pr-10 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
            placeholder="username"
          />
          <User2Icon className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative mt-1">
          <input
            required={true}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="current-password"
            className="w-full rounded-lg border border-gray-300 p-3 pr-10 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-lg bg-purple-600 p-3 font-medium text-white transition-colors ${
          loading ? "cursor-not-allowed opacity-70" : "hover:bg-purple-700"
        }`}
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <div className="mt-6">
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
      </div>
    </form>
  );
};

export default LoginForm;
