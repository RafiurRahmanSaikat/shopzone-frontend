import { Eye, EyeOff, User2Icon } from "lucide-react";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Badge from "../ui/Badge";

// Define the available credentials
const credentialsOptions = [
  { role: "Admin", username: "alice_johnson", password: "password123" },
  { role: "Store Owner", username: "emma_brown", password: "password123" },
  { role: "Customer", username: "john_doe", password: "password123" },
];

const LoginForm = () => {
  const { login, loading } = useContext(AuthContext);
  const initialFormData = { username: "", password: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // When a badge is clicked, fill the form with that credential
  const handleCredentialSelect = (credential) => {
    setFormData({
      username: credential.username,
      password: credential.password,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Capture the previous location before login
    const previousLocation = location.state?.from || "/"; // Default to home if no state is provided

    const response = await login(formData);

    if (response === 200) {
      setFormData(initialFormData);
      // Redirect the user to the previous location (or home if unavailable)
      navigate(previousLocation);
    }

    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Credential selection badges */}
      <div className="mb-4 flex gap-2">
        {credentialsOptions.map((credential, index) => (
          <Badge
            key={index}
            onClick={() => handleCredentialSelect(credential)}
            className="cursor-pointer"
            variant="gradient"
            size="lg"
          >
            {credential.role}
          </Badge>
        ))}
      </div>

      <div>
        {/* <label className="block text-sm font-medium text-gray-700">
          User Name
        </label> */}
        <div className="relative mt-1">
          <input
            type="text"
            name="username"
            required
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
            required
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
    </form>
  );
};

export default LoginForm;
