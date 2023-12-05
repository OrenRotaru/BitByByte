import { useState, useEffect } from "react";
import ChannelList from "../components/ChannelList";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';

import { FiTrash2 } from "react-icons/fi";

const baseURL = "http://localhost:5000";

interface SearchResult {
  username: string;
  email: string;
  _id: string;
  body: string;
  channel: string;
  timeStamp: string;
  author: string;
  channelId: string;
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMode, setSearchMode] = useState("message"); // 'message', 'user'
  const [results, setResults] = useState<SearchResult[]>([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(event.target.value);

    const fetchResults = async () => {
      if (newSearchTerm.trim() === "") {
        console.log("Empty search term");
        setResults([]);
        return;
      }

      if (searchMode === "message") {
        const response = await fetch(`${baseURL}/api/search/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ searchTerm: newSearchTerm }),
        });
        if (response.ok) {
          const json = await response.json();
          setResults(json);
        }
      } else if (searchMode === "user") {
        const response = await fetch(`${baseURL}/api/search/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ searchTerm: newSearchTerm }),
        });
        if (response.ok) {
          const json = await response.json();
          setResults(json);
        }
      }
    };
    fetchResults();
  };

  const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchMode(event.target.value);
  };

  const deleteUser = async (id: string) => {
    const response = await fetch(`${baseURL}/api/user/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (response.ok) {
      setResults(results.filter((user) => user._id !== id));
    }
  };

  return (
    <div className="home">
      <ChannelList />
      <div className="flex items-center justify-center h-screen ">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <input
              className="border border-gray-300 rounded-md px-4 py-2 transition-all duration-300 ease-in-out hover:border-blue-500 focus:border-blue-500"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
            />
            <select value={searchMode} onChange={handleModeChange}>
              <option value="message">Message</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="dropdown flex flex-col">
            {searchMode === "message"
              ? results.map((result) => (
                  <div
                    key={result._id}
                    className="p-2 border border-gray-200 hover:bg-gray-100 hover:border-blue-500"
                  >
                    <button onClick={() => navigate(`/home/channel/${result.channelId}`)}>
                      <div className="font-bold text-lg mb-2">{result.body}</div>
                      <div className="text-gray-700 mb-2">
                        Channel: {result.channel}
                      </div>
                      <div className="text-gray-700 mb-2">
                        Author: {result.author}
                      </div>
                      <div className="text-gray-500 text-sm">
                        Timestamp: {result.timeStamp}
                      </div>
                    </button>
                  </div>
                ))
              : null}
            {searchMode === "user"
              ? results.map((result) => (
                  <div
                    key={result._id}
                    className="p-2 border border-gray-700 flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <div className="font-bold text-lg mb-2">
                        {result.username}
                      </div>
                      <div className="text-gray-700 mb-2">
                        Email: {result.email}
                      </div>
                    </div>
                    {user.email === "admin@email.com" && (
                      <button
                        onClick={() => deleteUser(result._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};



export default Home;
