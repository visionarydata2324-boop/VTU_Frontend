import React from "react";
import { useNavigate } from "react-router-dom";
import { signOutUserSuccess } from "../../store/userReducers";
import { useDispatch } from "react-redux";
import { ImSwitch } from "react-icons/im";

export default function UserLogoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("authToken");
        dispatch(signOutUserSuccess()); // Clear user state
        navigate("/login"); // Redirect to login page
    };
  return (
    <div className="w-full">
      <button onClick={handleSignOut} className="flex justify-center items-center gap-2 text-gray-100 bg-blue-500 border-2 border-ed-500 text-sm py-2 px-4 font-semibold rounded-md hover:text-white transition duration-200">
        <ImSwitch />Logout
      </button>
    </div>
  )
}
