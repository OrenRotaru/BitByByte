import React, { useState, useEffect } from "react";
import { useChannelsContext } from "../hooks/useChannelContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Sidebar from "./Sidebar";
import { SidebarItem } from "./Sidebar";
import { LayoutDashboard } from "lucide-react";

const ChannelList: React.FC = () => {
  const { channels, dispatch } = useChannelsContext();
  const { user } = useAuthContext();

  // API URL from the .env file
  const apiUrl = "http://127.0.0.1:5000/api/channels";

  // Function to fetch channels from the backend
  const fetchChannels = async() => {
    // Only fetch channels if the user is logged in
    if (user) {
      const response = await fetch(apiUrl, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        dispatch({ type: "SET_CHANNELS", payload: json });
      }
    }
  };

  // Fetch channels when the component is mounted
  useEffect(() => {
    fetchChannels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array means this effect runs once on mount


  return (
    <div>
      <div className="flex flex-col min-h-screen z-10 fixed">
        <Sidebar>
          {channels
            ? channels.map((channel) => (
                <SidebarItem
                  key={channel._id}
                  id={channel._id}
                  icon={<LayoutDashboard size={20} />}
                  text={channel.name}
                  active={false}
                  alert={false}
                />
              ))
            : null}
        </Sidebar>
      </div>
    </div>
  );
};

export default ChannelList;
