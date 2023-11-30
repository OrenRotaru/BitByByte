import { useNavigate } from "react-router-dom";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { ReactNode } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useChannelsContext } from "../hooks/useChannelContext";

import { FiTrash2 } from "react-icons/fi";

interface SidebarContextType {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const { user } = useAuthContext();
  const { dispatch } = useChannelsContext();

  const apiUrl = "http://127.0.0.1:5000/api/channels";

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
      if (response.ok) {
        const json = await response.json();
        dispatch({ type: "CREATE_CHANNEL", payload: json });
      }
    } catch (error) {
      console.error(error);
    }

    setNewChannelName(""); // Reset the input field after adding
  };

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 overflow-y-auto overflow-x-hidden">{children}</ul>
        </SidebarContext.Provider>

        {expanded && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addChannel();
            }}
            className="flex justify-between mb-3 transition-all"
          >
            <input
              type="text"
              value={newChannelName}
              className="form-control"
              onChange={(e) => setNewChannelName(e.target.value)}
              placeholder="New channel name"
            />
            <button type="submit" className="btn btn-primary">
              Create Channel
            </button>
          </form>
        )}

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

interface SidebarItemProps {
  id: string;
  icon: ReactNode;
  text: string;
  active: boolean;
  alert: boolean;
}

export function SidebarItem({
  id,
  icon,
  text,
  active,
  alert,
}: SidebarItemProps) {
  const context = useContext(SidebarContext);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { dispatch } = useChannelsContext();

  const apiUrl = "http://127.0.0.1:5000/api/channels";

  // Function to delete a channel
  const deleteChannel = async () => {
    if (!user) {
      console.error("User not logged in");
      return;
    }
    try {
      const response = await fetch(`${apiUrl!}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) throw new Error("Error deleting channel");
      const json = await response.json();
      dispatch({ type: "DELETE_CHANNEL", payload: json });
    } catch (error) {
      console.error(error);
    }
  };

  const goToChannel = () => {
    navigate(`/home/channel/${id}`);
  };

  if (context === null) {
    // handle the case where the context is null
    // for example, you could return null or some default component
    return null;
  }
  const { expanded } = context;

  return (
    <li
      className={`
        relative flex justify-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        <span className="p-4 m-2" onClick={goToChannel}>
          {text}
        </span>
        {expanded && (
          <button onClick={deleteChannel}>
            <FiTrash2 size={20} />
          </button>
        )}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
