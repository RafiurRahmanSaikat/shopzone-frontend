import { Camera, Lock, Mail, MapPin, Phone, User } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Grid from "../components/ui/Grid";
import Heading from "../components/ui/Heading";
import Input from "../components/ui/Input";
import Text from "../components/ui/Text";

import AuthContext from "../context/AuthContext";
import userService from "../services/userService";

const ProfilePage = () => {
  const { user, fetchProfile } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
  });
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [imageData, setImageData] = useState({ file: null, preview: null });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);

    try {
      const updatedData = { ...profileData };
      if (imageData.file) {
        updatedData.profile_picture = imageData.file;
      }

      await userService.updateProfile(updatedData);
      await fetchProfile(); // Refresh user data
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsChangingPassword(true);

    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error("Passwords don't match");
      setIsChangingPassword(false);
      return;
    }

    try {
      await userService.changePassword({
        old_password: passwordData.current_password,
        new_password: passwordData.new_password,
      });
      toast.success("Password changed successfully");
      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      toast.error("Failed to change password");
      console.error(error);
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div>
      <Heading as="h1" size="h3" className="mb-6">
        My Profile
      </Heading>

      <Grid cols={1} gap={8} className="lg:grid-cols-3">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card>
            <Card.Header>
              <Heading as="h2" size="h4">
                Profile Information
              </Heading>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleProfileSubmit}>
                <Grid cols={2} gap={4} className="mb-6">
                  <Input
                    label="First Name"
                    name="first_name"
                    value={profileData.first_name}
                    onChange={handleProfileChange}
                    icon={<User className="h-5 w-5" />}
                  />
                  <Input
                    label="Last Name"
                    name="last_name"
                    value={profileData.last_name}
                    onChange={handleProfileChange}
                    icon={<User className="h-5 w-5" />}
                  />
                </Grid>

                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  icon={<Mail className="h-5 w-5" />}
                  className="mb-4"
                />

                <Input
                  label="Phone Number"
                  name="phone_number"
                  value={profileData.phone_number}
                  onChange={handleProfileChange}
                  icon={<Phone className="h-5 w-5" />}
                  className="mb-4"
                />

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address
                  </label>
                  <div className="relative">
                    <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <textarea
                      name="address"
                      value={profileData.address}
                      onChange={handleProfileChange}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-gray-900 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none dark:border-gray-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-purple-800"
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isUpdatingProfile}
                >
                  Save Changes
                </Button>
              </form>
            </Card.Body>
          </Card>

          {/* Change Password */}
          <Card className="mt-6">
            <Card.Header>
              <Heading as="h2" size="h4">
                Change Password
              </Heading>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handlePasswordSubmit}>
                <Input
                  label="Current Password"
                  name="current_password"
                  type="password"
                  value={passwordData.current_password}
                  onChange={handlePasswordChange}
                  icon={<Lock className="h-5 w-5" />}
                  className="mb-4"
                  required
                />

                <Input
                  label="New Password"
                  name="new_password"
                  type="password"
                  value={passwordData.new_password}
                  onChange={handlePasswordChange}
                  icon={<Lock className="h-5 w-5" />}
                  className="mb-4"
                  required
                />

                <Input
                  label="Confirm New Password"
                  name="confirm_password"
                  type="password"
                  value={passwordData.confirm_password}
                  onChange={handlePasswordChange}
                  icon={<Lock className="h-5 w-5" />}
                  className="mb-6"
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isChangingPassword}
                >
                  Change Password
                </Button>
              </form>
            </Card.Body>
          </Card>
        </div>

        {/* Profile Picture */}
        <div>
          <Card>
            <Card.Header>
              <Heading as="h2" size="h4">
                Profile Picture
              </Heading>
            </Card.Header>
            <Card.Body className="flex flex-col items-center">
              <div className="mb-6 h-48 w-48 overflow-hidden rounded-full border-4 border-gray-200 dark:border-gray-700">
                {imageData.preview ? (
                  <img
                    src={imageData.preview || "/placeholder.svg"}
                    alt="Profile Preview"
                    className="h-full w-full object-cover"
                  />
                ) : user?.profile_picture ? (
                  <img
                    src={user.profile_picture || "/placeholder.svg"}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-zinc-700">
                    <User className="h-24 w-24 text-gray-400" />
                  </div>
                )}
              </div>

              <label className="mb-4 flex w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-4 hover:bg-gray-100 dark:border-gray-700 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                <div className="flex flex-col items-center">
                  <Camera className="mb-2 h-8 w-8 text-gray-400" />
                  <Text weight="medium">Upload New Picture</Text>
                  <Text size="sm" muted className="mt-1">
                    PNG, JPG up to 5MB
                  </Text>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>

              <Text size="sm" muted className="text-center">
                Click the button above to upload a new profile picture. Changes
                will be saved when you update your profile.
              </Text>
            </Card.Body>
          </Card>

          {/* Account Information */}
          <Card className="mt-6">
            <Card.Header>
              <Heading as="h2" size="h4">
                Account Information
              </Heading>
            </Card.Header>
            <Card.Body>
              <div className="space-y-4">
                <div>
                  <Text size="sm" muted>
                    Username
                  </Text>
                  <Text weight="medium">{user?.username}</Text>
                </div>
                <div>
                  <Text size="sm" muted>
                    Account Type
                  </Text>
                  <Text weight="medium" className="capitalize">
                    {user?.role?.replace("_", " ")}
                  </Text>
                </div>
                <div>
                  <Text size="sm" muted>
                    Member Since
                  </Text>
                  <Text weight="medium">
                    {user?.date_joined
                      ? new Date(user.date_joined).toLocaleDateString()
                      : "N/A"}
                  </Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Grid>
    </div>
  );
};

export default ProfilePage;
