import axios from "axios";
import { toast } from "react-toastify";
const uploadImage = async (imageFile) => {
  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      formData,
    );
    return response.data.data.url;
  } catch (error) {
    toast.error("Failed to upload image. Please try again.");
  }
};

export default uploadImage;
