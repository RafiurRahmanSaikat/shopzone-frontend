import { Camera, Lock, Mail, MapPin, Phone, User } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/cards/CustomCard";

import { Loading } from "../..";
import AuthContext from "../../../context/AuthContext";
import { handlePatchRequest, handlePostRequest } from "../../../utils/Actions";

const FormInput = ({ label, name, type = "text", value, onChange, icon }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-800 dark:text-zinc-200">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-zinc-500">
            {icon}
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 pl-10 text-zinc-700 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:text-gray-100"
        />
      </div>
    </div>
  );
};
const Profile = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    address: "",
    image: null,
  });

  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        address: user.address || "",
        username: user.username || "",
        image: user.image || null,
      });
      setImagePreview(user.image);
      setLoading(false);
    }
  }, [user]);

  const handleProfileChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
          setFormData((prev) => ({ ...prev, image: file }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          formPayload.append(key, formData[key]);
        }
      });
      const response = await handlePatchRequest(
        "/accounts/users/me/",
        formPayload,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await handlePostRequest("/accounts/users/change_password/", {
        old_password: passwordData.old_password,
        new_password: passwordData.new_password,
        confirm_password: passwordData.confirm_password,
      });

      toast.success("Password changed successfully!");
      setPasswordData({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <User className="h-6 w-6" />
                <span>Profile Information</span>
              </div>
            </CardTitle>
            <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
              Manage your personal information and account settings
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSubmit}>
              <div className="grid gap-6 sm:grid-cols-12">
                {/* Profile Photo Section */}
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-800 dark:text-zinc-200">
                    Profile Photo
                  </label>
                  <div className="relative mt-2">
                    <div className="relative inline-block">
                      <img
                        className="h-32 w-32 rounded-full border-4 border-white shadow-lg dark:border-zinc-900"
                        src={imagePreview || "/placeholder.jpg"}
                        alt="Profile"
                      />
                      <label className="absolute right-0 bottom-0 cursor-pointer rounded-full bg-zinc-800 p-2 transition-all hover:bg-zinc-700">
                        <Camera className="h-5 w-5 text-white" />
                        <input
                          type="file"
                          name="image"
                          onChange={handleProfileChange}
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6 sm:col-span-9">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormInput
                      label="First Name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleProfileChange}
                    />
                    <FormInput
                      label="Last Name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleProfileChange}
                    />
                  </div>

                  <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleProfileChange}
                    icon={<Mail className="h-5 w-5" />}
                  />

                  <FormInput
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleProfileChange}
                    icon={<User className="h-5 w-5" />}
                  />

                  <FormInput
                    label="Phone Number"
                    name="phone_number"
                    type="tel"
                    value={formData.phone_number}
                    onChange={handleProfileChange}
                    icon={<Phone className="h-5 w-5" />}
                  />

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-800 dark:text-zinc-200">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute top-3 left-3 h-5 w-5 text-gray-400 dark:text-zinc-500" />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleProfileChange}
                        className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 pl-10 text-zinc-800 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:text-gray-100"
                        rows="3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Lock className="h-6 w-6" />
                <span>Change Password</span>
              </div>
            </CardTitle>
            <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
              Update your account password securely
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <FormInput
                label="Current Password"
                name="old_password"
                type="password"
                value={passwordData.old_password}
                onChange={handlePasswordChange}
                icon={<Lock className="h-5 w-5" />}
              />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormInput
                  label="New Password"
                  name="new_password"
                  type="password"
                  value={passwordData.new_password}
                  onChange={handlePasswordChange}
                  icon={<Lock className="h-5 w-5" />}
                />
                <FormInput
                  label="Confirm Password"
                  name="confirm_password"
                  type="password"
                  value={passwordData.confirm_password}
                  onChange={handlePasswordChange}
                  icon={<Lock className="h-5 w-5" />}
                />
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  Change Password
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
