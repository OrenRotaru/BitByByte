import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ChannelList from "../components/ChannelList";
import defaultAvatar from "../assets/defaultAvatar.png";
import { FaReply, FaTrash } from "react-icons/fa";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { useAuthContext } from "../hooks/useAuthContext";
import imageCompression from "browser-image-compression";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
  hour12: true,
});

const baseURL = "http://localhost:5000";

interface Message {
  _id: string;
  channel: string;
  author: string;
  timeStamp: string;
  body: string;
  parentMessage_id: string;
  likesCount: number;
  image: string;
  messages: Array<Message>;
  usersThatLiked: Array<string>;
  usersThatDisliked: Array<string>;
}

const ChannelIdContext = React.createContext<string | undefined>(undefined);

const Channel: React.FC = () => {
  const { channelId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchMessagesByChannel = async () => {
      const response = await fetch(
        `${baseURL}/api/messages/channel/${channelId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setMessages(
          data.map((message: Message) => ({
            ...message
          }))
        );
      }
    };

    fetchMessagesByChannel();
  }, []);

  const createNewMessage = (messageBody: string, image: string) => {
    const messageSend = {
      channel: channelId,
      author: user.username,
      timeStamp: dateFormatter.format(new Date()),
      body: messageBody,
      parentMessage_id: "",
      image: image || "",
      likesCount: 0,
      usersThatLiked: [],
      usersThatDisliked: [],
      messages: [],
    };

    // send the message to the backend
    const postMessage = async () => {
      const response = await fetch(`${baseURL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(messageSend),
      });
      if (response.ok) {
        const fullMessage = await response.json();
        setMessages([...messages, fullMessage]); // add the new message to the messages array
        console.log(fullMessage);
      }
    };
    postMessage();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1>Channel {channelId}</h1>
        {/* Add your channel content here */}
        <p>This is the page for channel {channelId}.</p>
      </div>
      <MessageInput createNewMessage={createNewMessage} />
      <div className="flex flex-col gap-2 mt-10">
        <ChannelIdContext.Provider value={channelId}>
          {messages.map((message) => (
            <MessageItem key={message._id} message={message} />
          ))}
        </ChannelIdContext.Provider>
      </div>
    </div>
  );
};

interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [messages, setMessages] = useState(message.messages);
  const { user } = useAuthContext();
  const channelId = useContext(ChannelIdContext);
  const [voteCount, setVoteCount] = useState(0);
  const [hasVotedUp, setHasVotedUp] = useState(false);
  const [hasVotedDown, setHasVotedDown] = useState(false);
  const [hasVotedNeutral, setHasVotedNeutral] = useState(true);

  useEffect(() => {
    setVoteCount(message.likesCount);
    if (message.usersThatLiked && message.usersThatLiked.includes(user.username)) {
      console.log("User has liked");
      setHasVotedUp(true);
      setHasVotedDown(false);
      setHasVotedNeutral(false);
    } else if (message.usersThatDisliked && message.usersThatDisliked.includes(user.username)) {
      console.log("User has disliked");
      setHasVotedDown(true);
      setHasVotedUp(false);
      setHasVotedNeutral(false);
    } else {
      console.log("User has not voted");
      setHasVotedNeutral(true);
      setHasVotedUp(false);
      setHasVotedDown(false);
    }
  }, []);

  const createNewMessage = (messageBody: string, image: string) => {
    const newMessage = {
      channel: channelId,
      author: user.username,
      timeStamp: dateFormatter.format(new Date()),
      body: messageBody,
      parentMessage_id: message._id,
      image: image || "",
      likesCount: 0,
      usersThatLiked: [],
      messages: [],
    };

    // send the message to the backend
    const postMessage = async () => {
      const response = await fetch(`${baseURL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newMessage),
      });
      if (response.ok) {
        const fullMessage = await response.json();
        setMessages([...messages, fullMessage]); // add the new message to the messages array
        console.log(fullMessage);
      }
    };
    postMessage();
  };

  function handleUpvote() {
    // send a patch request to the backend to update the likes
    const upVoteDB = async () => {
      const response = await fetch(`${baseURL}/api/messages/upvote/${message._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ 
          user: user.username,
        }),
      });
      if (response.ok) {
        const updatedMessage = await response.json();
        console.log(updatedMessage);
      }
    };
    if (!hasVotedUp && !hasVotedNeutral) {
      setHasVotedUp(false);
      setHasVotedDown(false);
      setHasVotedNeutral(true);
      setVoteCount(voteCount + 1);
      upVoteDB();
    } else if (!hasVotedUp && hasVotedNeutral) {
      setHasVotedUp(true);
      setHasVotedDown(false);
      setHasVotedNeutral(false);
      setVoteCount(voteCount + 1);
      upVoteDB();
    }
  }

  function handleDownvote() {
    // send a patch request to the backend to update the likes
    const downVoteDB = async () => {
      const response = await fetch(`${baseURL}/api/messages/downvote/${message._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ 
          user: user.username,
        }),
      });
      if (response.ok) {
        const updatedMessage = await response.json();
        console.log(updatedMessage);
      }
    };
    if (!hasVotedDown && !hasVotedNeutral) {
      setHasVotedDown(false);
      setHasVotedUp(false);
      setHasVotedNeutral(true);
      setVoteCount(voteCount - 1);
      downVoteDB();
    } else if (!hasVotedDown && hasVotedNeutral) {
      setHasVotedDown(true);
      setHasVotedUp(false);
      setHasVotedNeutral(false);
      setVoteCount(voteCount - 1);
      downVoteDB();
    }
  }

  function deleteMessage() {
    // send a delete request to the backend to delete the message
    const deleteMessageDB = async () => {
      const response = await fetch(`${baseURL}/api/messages/${message._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const deletedMessage = await response.json();
        console.log(deletedMessage);
      }
    };
    setMessages([]);
    deleteMessageDB();
    // refresh the page
    window.location.reload();

  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-1 flex flex-col items-center">
        <img
          className="rounded-full w-10 h-10"
          src={defaultAvatar}
          alt="profile"
        />
        <div className="threadline border-l-2 border-gray-400 h-full mx-auto"></div>
      </div>
      <div key={message._id} className=" col-span-11 flex flex-col">
        <div className="header flex flex-row">
          <span className="font-bold mr-2">{message.author}</span>
          <span className="text-gray-400">{message.timeStamp}:</span>
        </div>
        <div className="min-w-0 overflow-auto break-words">
          {message.image && (
            <img
              className="max-w-xs max-h-xs"
              src={message.image}
              alt="message"
            />
          )}
          <span className="overflow-wrap break-word">{message.body}</span>
        </div>
        <div className="footer flex flex-row">
          <div className="vote-arrows flex flex-row space-x-1">
            <button
              className="upvote transition-colors hover:bg-gray-200 rounded-lg"
              onClick={handleUpvote}
            >
              <FaArrowAltCircleUp />
            </button>
            <span className="text-gray-400">{voteCount}</span>
            <button
              className="downvote transition-colors hover:bg-gray-200 rounded-lg"
              onClick={handleDownvote}
            >
              <FaArrowAltCircleDown color="" />
            </button>
          </div>
          {isReplying ? (
            <button
              className="w-15 ml-1 text-sm p-1 flex items-center transition-colors hover:bg-gray-200 rounded-lg"
              onClick={() => setIsReplying(false)}
            >
              <FaReply className="mr-1" />
              Cancel
            </button>
          ) : (
            <button
              className="w-15 ml-1 text-sm p-1 flex items-center transition-colors hover:bg-gray-200 rounded-lg"
              onClick={() => setIsReplying(true)}
            >
              <FaReply className="mr-1" />
              Reply
            </button>
            
          )}
          {((user.email === "admin@email.com") || (user.username === message.author)) && (
          <button onClick={deleteMessage}>
            <FaTrash />
          </button>
           )} 
        </div>
        {isReplying && (
          <MessageInput
            setIsReplying={setIsReplying}
            createNewMessage={createNewMessage}
          />
        )}
        <div className="flex flex-col gap-3">
          {messages.map((message) => (
            <MessageItem key={message._id} message={message} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface MessageInputProps {
  createNewMessage: (messageBody: string, image: string) => void;
  setIsReplying?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageInput = ({
  createNewMessage,
  setIsReplying,
}: MessageInputProps) => {
  const [messageBody, setMessageBody] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log("Image: ", image);
  }, [image]);

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage(
          "The image is too large. Please select an image smaller than 5MB."
        );
      } else {
        setErrorMessage(null);
        // Continue with your existing file handling code...
        const options = {
          maxSizeMB: 10, // (max file size in MB)
          maxWidthOrHeight: 1920, // compress the image to this maximum width or height
          useWebWorker: true,
        };
        try {
          const compressedFile = await imageCompression(file, options);
          const reader = new FileReader();
          reader.onloadend = function () {
            const base64String = reader.result as string;
            setImage(base64String);
          };
          reader.readAsDataURL(compressedFile);
        } catch (error) {
          console.error("Error during image compression:", error);
        }
      }
    }
  }

  return (
    <div className="flex flex-col mt-4">
      <input
        value={messageBody}
        onChange={(e) => setMessageBody(e.target.value)}
        className="border-[1px] border-zinc-400 p-2 w-3/4"
        type="text"
        placeholder="What are your thoughts?"
      />
      <div className="flex flex-row">
        <button
          className="w-24 ml-1 text-sm p-1 transition-colors bg-gray-200 hover:bg-gray-300 rounded-lg"
          onClick={() => {
            console.log("Message body: ", messageBody);
            console.log("Image: ", image);
            createNewMessage(messageBody, image);
            setMessageBody("");
            setIsReplying && setIsReplying(false);
          }}
        >
          Comment
        </button>
        <div className="file-input">
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <div className="flex flex-col mt-4">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Channel;
