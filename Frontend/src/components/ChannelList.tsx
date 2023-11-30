import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useAuthContext } from "../hooks/useAuthContext";
import Sidebar from "./Sidebar";
import { SidebarItem } from "./Sidebar";
import { LayoutDashboard } from "lucide-react";
import {SidebarContext} from "./Sidebar";

interface Channel {
  _id: string;
  name: string;
}

const ChannelList: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [newChannelName, setNewChannelName] = useState("");
  const { user } = useAuthContext();

  // API URL from the .env file
  const apiUrl = "http://127.0.0.1:5000/api/channels";

  // Function to fetch channels from the backend
  const fetchChannels = () => {
    // Only fetch channels if the user is logged in
    if (user) {
      fetch(apiUrl, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Error fetching channels");
          return response.json();
        })
        .then((data) => setChannels(data))
        .catch((error) => console.error(error));
    }
  };

  // Fetch channels when the component is mounted
  useEffect(() => {
    fetchChannels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array means this effect runs once on mount

  // Function to add a new channel
  const addChannel = async () => {
    if (newChannelName.trim() === "") return; // Don't add empty channels
    if (!user) {
      console.error("User not logged in");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ name: newChannelName }),
      });
      if (!response.ok) throw new Error("Error creating channel");
      await fetchChannels(); // Re-fetch the channels after adding
    } catch (error) {
      console.error(error);
    }

    setNewChannelName(""); // Reset the input field after adding
  };

  // Function to delete a channel
  const deleteChannel = async (channelId: string) => {
    if (!user) {
      console.error("User not logged in");
      return;
    }
    try {
      const response = await fetch(`${apiUrl!}/${channelId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) throw new Error("Error deleting channel");
      setChannels(channels.filter((channel) => channel._id !== channelId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="tw-flex tw-min-h-screen tw-fixed tw-z-10">
        <Sidebar>
          <ul>
            {channels.map((channel) => (
              <SidebarItem
                key={channel._id}
                id={channel._id}
                icon={<LayoutDashboard size={20} />}
                text={channel.name}
                active={false}
                alert={false}
              />
            ))}
          </ul>
          <div className="input-group mb-3">
            <input
              type="text"
              value={newChannelName}
              className="form-control"
              onChange={(e) => setNewChannelName(e.target.value)}
              placeholder="New channel name"
            />
            <button className="btn btn-primary" onClick={addChannel}>
              Create Channel
            </button>
          </div>
        </Sidebar>
      </div>
    </div>
  );
};

export default ChannelList;
