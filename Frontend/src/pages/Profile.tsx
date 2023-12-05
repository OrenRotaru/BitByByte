import React, { useState, useEffect, ChangeEvent } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import DefaultBanner from "../assets/DefaultBanner.png";

import { CiEdit } from "react-icons/ci";

const Profile: React.FC = () => {
  const { userId } = useParams();
  const { user, dispatch } = useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [bannerPic, setBannerPic] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // API URL from the .env file
  const apiUrl = "http://127.0.0.1:5000/api/user";

  // Function to fetch user data from the backend
  const fetchUser = async () => {
    // Only fetch user data if the user is logged in
    if (user) {
      const response = await fetch(`${apiUrl}/${userId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const json = await response.json();
        setName(json.username || "");
        setEmail(json.email || "");
        setProfilePic(json.profilePic || "");

        // add the profilePic to the user in the context
        dispatch({ type: "LOGIN", payload: { ...user, profilePic: json.profilePic } });

        setDescription(json.description || "");
        setBannerPic(json.bannerPic || "");
      }
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array means this effect runs once on mount

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting");

    // Only submit if the user is logged in
    if (user) {
      fetch(`${apiUrl}/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ username: name, email, description, profilePic }),
      });
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  function updateBannerPic(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files![0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setBannerPic(base64String);
  
      // Only submit if the user is logged in
      if (user) {
        console.log("Submitting bannerPic: ", base64String);
        fetch(`${apiUrl}/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ bannerPic: base64String }),
        });
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative">
        {bannerPic && (
          <div className="max-w-5xl h-64 border-4 border-neutral-600 rounded overflow-hidden">
            <img src={bannerPic} alt="Banner" className="w-full h-full object-cover" />
        </div>
        )}
        {!bannerPic && (
          <img
            src={DefaultBanner}
            alt="Banner"
            className="w-full h-64 object-cover"
          />
        )}
        <div className="absolute bottom-4 right-4">
          <label htmlFor="banner-upload" className="cursor-pointer">
            <CiEdit className="h-6 w-6 text-white" />
            <input
              type="file"
              id="banner-upload"
              className="hidden"
              onChange={updateBannerPic}
            />
          </label>
        </div>
        <div className="absolute bottom-0 flex items-center justify-center w-full">
          {profilePic && (
            <img
              src={profilePic}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full border-4 border-white"
            />
          )}
        </div>
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-gray-500">{email}</p>
        <p className="text-gray-500">{description}</p>
      </div>
      <div className="flex flex-col">
        {user.email === email && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        )}
        {user.email === email && isEditing && (
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Cancel Edit
          </button>
        )}
        {user.email === email && isEditing && (
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <label className="flex flex-col">
              Username:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="flex flex-col">
              Description:
              <input
                type="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="flex flex-col">
              Profile Picture:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="p-2 border border-gray-300 rounded"
              />
            </label>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
