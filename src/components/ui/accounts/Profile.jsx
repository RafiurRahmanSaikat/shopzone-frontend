import { Button, Card, Grid, Heading, Input, Text } from "@components/ui";
import { Camera, Lock, Mail, MapPin, Phone, User } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import AuthContext from "../../../context/AuthContext";
import userService from "../../../services/userService";

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

// import { Camera, Lock, Mail, MapPin, Phone, User } from "lucide-react";
// import React, { useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import AuthContext from "../../../context/AuthContext";
// import { handlePatchRequest, handlePostRequest } from "../../../utils/Actions";
// import uploadImage from "../../../utils/UploadImage";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../cards/CustomCard.jsx";
// import Spinner from "../Spinner";
// const FormInput = ({ label, name, type = "text", value, onChange, icon }) => {
//   return (
//     <div>
//       <label className="mb-2 block text-sm font-medium text-gray-800 dark:text-zinc-200">
//         {label}
//       </label>
//       <div className="relative">
//         {icon && (
//           <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-zinc-500">
//             {icon}
//           </span>
//         )}
//         <input
//           type={type}
//           name={name}
//           value={value}
//           onChange={onChange}
//           className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 pl-10 text-zinc-700 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:text-gray-100"
//         />
//       </div>
//     </div>
//   );
// };

// const Profile = () => {
//   const { user } = useContext(AuthContext);
//   const [loading, setLoading] = useState(true);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     username: "",
//     email: "",
//     phone_number: "",
//     address: "",
//     image: null, // temporary image file or URL
//   });

//   const [passwordData, setPasswordData] = useState({
//     old_password: "",
//     new_password: "",
//     confirm_password: "",
//   });

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         first_name: user.first_name || "",
//         last_name: user.last_name || "",
//         email: user.email || "",
//         phone_number: user.phone_number || "",
//         address: user.address || "",
//         username: user.username || "",
//         image: user.profile_picture || null, // using backend field name
//       });
//       setImagePreview(user.profile_picture);
//       setLoading(false);
//     }
//   }, [user]);
//   console.log(user);
//   const handleProfileChange = (e) => {
//     if (e.target.name === "image") {
//       const file = e.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setImagePreview(reader.result);
//           setFormData((prev) => ({ ...prev, image: file }));
//         };
//         reader.readAsDataURL(file);
//       }
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handlePasswordChange = (e) => {
//     setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
//   };

//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // If a new image file is selected, upload it first and replace the file with its URL
//       let imageUrl = formData.image;
//       if (formData.image && formData.image instanceof File) {
//         imageUrl = await uploadImage(formData.image);
//       }

//       const formPayload = new FormData();
//       // Append fields – note that we send the image URL under "profile_picture"
//       Object.keys(formData).forEach((key) => {
//         if (formData[key] !== null) {
//           if (key === "image") {
//             formPayload.append("profile_picture", imageUrl);
//           } else {
//             formPayload.append(key, formData[key]);
//           }
//         }
//       });
//       await handlePatchRequest("/accounts/users/me/", formPayload, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Profile updated successfully!");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update profile");
//     }
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();

//     if (passwordData.new_password !== passwordData.confirm_password) {
//       toast.error("New passwords do not match");
//       return;
//     }

//     try {
//       await handlePostRequest("/accounts/users/change_password/", {
//         old_password: passwordData.old_password,
//         new_password: passwordData.new_password,
//         confirm_password: passwordData.confirm_password,
//       });

//       toast.success("Password changed successfully!");
//       setPasswordData({
//         old_password: "",
//         new_password: "",
//         confirm_password: "",
//       });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to change password");
//     }
//   };

//   if (loading) return <Spinner />;

//   return (
//     <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>
//               <div className="flex items-center gap-2">
//                 <User className="h-6 w-6" />
//                 <span>Profile Information</span>
//               </div>
//             </CardTitle>
//             <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
//               Manage your personal information and account settings
//             </p>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleProfileSubmit}>
//               <div className="grid gap-6 sm:grid-cols-12">
//                 {/* Profile Photo Section */}
//                 <div className="sm:col-span-3">
//                   <label className="block text-sm font-medium text-gray-800 dark:text-zinc-200">
//                     Profile Photo
//                   </label>
//                   <div className="relative mt-2">
//                     <div className="relative inline-block">
//                       <img
//                         className="h-32 w-32 rounded-full border-4 border-white shadow-lg dark:border-zinc-900"
//                         src={imagePreview || "/placeholder.jpg"}
//                         alt="Profile"
//                       />
//                       <label className="absolute right-0 bottom-0 cursor-pointer rounded-full bg-zinc-800 p-2 transition-all hover:bg-zinc-700">
//                         <Camera className="h-5 w-5 text-white" />
//                         <input
//                           type="file"
//                           name="image"
//                           onChange={handleProfileChange}
//                           className="hidden"
//                           accept="image/*"
//                         />
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Form Fields */}
//                 <div className="space-y-6 sm:col-span-9">
//                   <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                     <FormInput
//                       label="First Name"
//                       name="first_name"
//                       value={formData.first_name}
//                       onChange={handleProfileChange}
//                     />
//                     <FormInput
//                       label="Last Name"
//                       name="last_name"
//                       value={formData.last_name}
//                       onChange={handleProfileChange}
//                     />
//                   </div>

//                   <FormInput
//                     label="Email Address"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleProfileChange}
//                     icon={<Mail className="h-5 w-5" />}
//                   />

//                   <FormInput
//                     label="Username"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleProfileChange}
//                     icon={<User className="h-5 w-5" />}
//                   />

//                   <FormInput
//                     label="Phone Number"
//                     name="phone_number"
//                     type="tel"
//                     value={formData.phone_number}
//                     onChange={handleProfileChange}
//                     icon={<Phone className="h-5 w-5" />}
//                   />

//                   <div>
//                     <label className="mb-2 block text-sm font-medium text-gray-800 dark:text-zinc-200">
//                       Address
//                     </label>
//                     <div className="relative">
//                       <MapPin className="absolute top-3 left-3 h-5 w-5 text-gray-400 dark:text-zinc-500" />
//                       <textarea
//                         name="address"
//                         value={formData.address}
//                         onChange={handleProfileChange}
//                         className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 pl-10 text-zinc-800 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:text-gray-100"
//                         rows="3"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8 flex justify-end">
//                 <button
//                   type="submit"
//                   className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
//                 >
//                   Update Profile
//                 </button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>
//               <div className="flex items-center gap-2">
//                 <Lock className="h-6 w-6" />
//                 <span>Change Password</span>
//               </div>
//             </CardTitle>
//             <p className="mt-2 text-sm text-gray-600 dark:text-zinc-400">
//               Update your account password securely
//             </p>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handlePasswordSubmit} className="space-y-6">
//               <FormInput
//                 label="Current Password"
//                 name="old_password"
//                 type="password"
//                 value={passwordData.old_password}
//                 onChange={handlePasswordChange}
//                 icon={<Lock className="h-5 w-5" />}
//               />

//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <FormInput
//                   label="New Password"
//                   name="new_password"
//                   type="password"
//                   value={passwordData.new_password}
//                   onChange={handlePasswordChange}
//                   icon={<Lock className="h-5 w-5" />}
//                 />
//                 <FormInput
//                   label="Confirm Password"
//                   name="confirm_password"
//                   type="password"
//                   value={passwordData.confirm_password}
//                   onChange={handlePasswordChange}
//                   icon={<Lock className="h-5 w-5" />}
//                 />
//               </div>

//               <div className="mt-8 flex justify-end">
//                 <button
//                   type="submit"
//                   className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
//                 >
//                   Change Password
//                 </button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Profile;
