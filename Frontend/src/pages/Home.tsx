import { useState } from "react";
import ChannelList from "../components/ChannelList";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

import { FiTrash2 } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { MdOutlineSignpost } from "react-icons/md";

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
  likesCount: number;
  totalUserLikes: number;
  totalPosts: number;
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
      <div className="justify-start mt-4 ml-10 pl-20 text-gray-700 space-y-4">
        <h2 className="text-lg font-bold">Search Bar Usage</h2>
        <p className="text-sm">
          <strong className="font-semibold">Message Mode:</strong> This mode
          allows you to search for messages. You can enter different types of
          search terms to find messages:
        </p>
        <ul className="list-disc list-inside">
          <li>
            <code className="bg-gray-200 p-1 rounded">"%all% u/username"</code>:
            This will return the first 5 messages from the user specified by{" "}
            <code className="bg-gray-200 p-1 rounded">username</code>.
          </li>
          <li>
            <code className="bg-gray-200 p-1 rounded">"%all%"</code>: This will
            return all messages from any user.
          </li>
          <li>
            <code className="bg-gray-200 p-1 rounded">
              "u/username:searchTerm"
            </code>
            : This will return messages from the user specified by{" "}
            <code className="bg-gray-200 p-1 rounded">username</code> that match
            the <code className="bg-gray-200 p-1 rounded">searchTerm</code>.
          </li>
        </ul>
        <p className="text-sm">
          <strong className="font-semibold">Sorting:</strong> By default, the
          search results are sorted by the number of likes in descending order
          (most liked messages first). If you want to sort the results by the
          least number of likes first, you can add a{" "}
          <code className="bg-gray-200 p-1 rounded">~</code> at the end of your
          search term.
        </p>
        <p className="text-sm">
          Remember to replace{" "}
          <code className="bg-gray-200 p-1 rounded">username</code> and{" "}
          <code className="bg-gray-200 p-1 rounded">searchTerm</code> with the
          actual username and search term you want to use.
        </p>
        <p className="text-sm">
          <strong className="font-semibold">User Mode:</strong> In this mode,
          your search term matches with the user. You can modify your search
          term to sort the results:
        </p>
        <ul className="list-disc list-inside">
          <li>
            <code className="bg-gray-200 p-1 rounded">"username l"</code>: This
            will sort the matched list with the user with the highest amount of
            likes on top (which is default).
          </li>
          <li>
            <code className="bg-gray-200 p-1 rounded">"username ~l"</code>: This
            will sort in the other direction, with the user with the least
            amount of likes on top.
          </li>
          <li>
            <code className="bg-gray-200 p-1 rounded">"username p"</code>: This
            will sort by the user with the highest amount of posts on top.
          </li>
          <li>
            <code className="bg-gray-200 p-1 rounded">"username ~p"</code>: This
            will sort by the user with the least amount of posts on top.
          </li>
          <li>
            <code className="bg-gray-200 p-1 rounded">"%all% (postfix)"</code>: This
            will match with all users and then sort according to the postfix.
          </li>
        </ul>
        <p className="text-sm">
          Remember to replace{" "}
          <code className="bg-gray-200 p-1 rounded">username</code> with the
          actual username you want to use.
        </p>
      </div>
      <div className="flex items-center justify-center mt-4">
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
          <div className="">
            {searchMode === "message"
              ? results.map((result) => (
                  <div
                    key={result._id}
                    className="p-2 border border-gray-200 hover:bg-gray-100 hover:border-blue-500 flex items-center justify-between"
                  >
                    <button
                      className="flex flex-col justify-start items-start"
                      onClick={() =>
                        navigate(`/home/channel/${result.channelId}`)
                      }
                    >
                      <div className="font-bold text-lg mb-2 flex flex-col">
                        {result.body}
                      </div>
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
                    <div>
                      <span className="flex items-center justify-between">
                        <FaHeart className=" mr-2" />
                        {result.likesCount}
                      </span>
                    </div>
                  </div>
                ))
              : null}
            {searchMode === "user"
              ? results.map((result) => (
                  <div
                    key={result._id}
                    className="p-2 border border-gray-700 flex items-center justify-between"
                  >
                    <button className="flex items-center justify-between" onClick={() => navigate(`/user/${result._id}`)}>
                      <div className="flex flex-col">
                        <div className="font-bold text-lg mb-2">
                          {result.username}
                        </div>
                        <div className="text-gray-700 mb-2">
                          Email: {result.email}
                        </div>
                      </div>
                      <span className="flex items-center justify-between">
                        <FaHeart className=" mr-2" />
                        {result.totalUserLikes}
                      </span>
                      <span className="flex items-center justify-between">
                        <MdOutlineSignpost className=" mr-2" />
                        {result.totalPosts}
                      </span>
                    </button>
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
