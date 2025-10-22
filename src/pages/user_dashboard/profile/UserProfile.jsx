import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {updateSuccess} from '../../../store/userReducers'
import { getBaseUrl } from "../../../config";

const token = localStorage.getItem("authToken");

const UserProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    file: null, // should always be File when uploading
    image: "",  // keep backend image path separate
  });
  const { existingUser } = useSelector((state) => state.user);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  
  // ✅ Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${getBaseUrl()}/api/v1/get-profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await res.json();
        // console.log(data);
  
        if (!res.ok) {
          // If it's rate limiting, handle gracefully
          if (res.status === 429) {
            throw new Error("Too many requests. Please slow down and try again later.");
          }
          const text = await res.text();
          throw new Error(text || "Failed to fetch transactions");
        }
  
        const { firstName, lastName, email, phone, image } = data.data;
        setFormData({
          firstName,
          lastName,
          email,
          phone,
          file: null, // reset file
          image, // store backend image path
        });
  
        // ✅ build full image URL for preview
        if (image) {
          setPreviewImage(`${API_BASE_URL}${image}`);
        }
  
      } catch (err) {
        alert("Error fetching profile: " + err.message);
      }
    };
  
    if (token) fetchProfile();
  }, [token]);
  
  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // ✅ Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file, image: "" }); // reset backend image
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  
  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formPayload = new FormData();
      formPayload.append("firstName", formData.firstName);
      formPayload.append("lastName", formData.lastName);
      formPayload.append("email", formData.email);
      formPayload.append("phone", formData.phone);
  
      if (formData.file instanceof File) {
        formPayload.append("file", formData.file);
      }
  
      const res = await fetch(`${API_BASE_URL}/api/v1/update-profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formPayload,
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.message || "Failed to update profile");
        return;
      }
  
      alert("✅ Profile updated successfully!");
      dispatch(updateSuccess(data.data));
  
      setFormData({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        email: data.data.email,
        phone: data.data.phone,
        file: null, // reset file after upload
        image: data.data.image, // save backend image path
      });
  
      // ✅ Update preview with backend image URL
      if (data.data.image) {
        setPreviewImage(`${API_BASE_URL}${data.data.image}`);
      }
  
      setIsEditing(false);
  
    } catch (err) {
      alert("❌ Error updating profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // console.log(previewImage);

  return (
    <div className="flex items-center pb-20 pt-5 justify-center min-h-screen bg-blue-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg border border-blue-200">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          User Profile
        </h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          {previewImage ? (
            <img src={previewImage} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-blue-300"/>
          ) : (
            <FaUserAlt className="w-28 h-28 text-blue-400" />
          )}
          {isEditing && (
            <input type="file" accept="image/*" onChange={handleImageChange} className="mt-3 text-sm"/>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-blue-700">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} disabled={!isEditing} className="w-full p-3 border rounded-lg bg-blue-50 disabled:bg-gray-100 border-blue-200 focus:ring-2 focus:ring-blue-400"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} disabled={!isEditing} className="w-full p-3 border rounded-lg bg-blue-50 disabled:bg-gray-100 border-blue-200 focus:ring-2 focus:ring-blue-400"/>
            </div>
            </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-blue-700">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} className="w-full p-3 border rounded-lg bg-blue-50 disabled:bg-gray-100 border-blue-200 focus:ring-2 focus:ring-blue-400"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Phone</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing} className="w-full p-3 border rounded-lg bg-blue-50 disabled:bg-gray-100 border-blue-200 focus:ring-2 focus:ring-blue-400"/>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center mt-6">
            {isEditing ? (
              <>
                <button type="button" onClick={() => setIsEditing(false)} className="py-2 px-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"> 
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition disabled:bg-gray-400">
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <button type="button" onClick={() => setIsEditing(true)} className="py-2 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
