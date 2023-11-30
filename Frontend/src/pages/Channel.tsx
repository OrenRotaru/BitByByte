import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ChannelList from "../components/ChannelList";
import defaultAvatar from "../assets/defaultAvatar.png";
import { FaReply } from 'react-icons/fa';
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";


const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
  hour12: true,
});

interface Comment {
  id: string;
  body: string;
  comments: Array<Comment>;
}
const dummyComments: Comment[] = [
  {
    id: "1",
    body: "This is the first comment",
    comments: [],
  },
  {
    id: "2",
    body: "This is the second comment",
    comments: [],
  },
  {
    id: "3",
    body: "This is the third comment",
    comments: [],
  },
];

const Channel: React.FC = () => {
  const { id } = useParams();
  const [comments, setComments] = useState(dummyComments);

  const onComment = (newComment: Comment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1>Channel {id}</h1>
        {/* Add your channel content here */}
        <p>This is the page for channel {id}.</p>
      </div>
      <CommentInput onComment={onComment} />
      <div className="flex flex-col gap-2 mt-10">
        {comments.map((comment) => (
          <CommentItem comment={comment} />
        ))}
      </div>
    </div>
  );
};

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [comments, setComments] = useState(comment.comments);

  const onComment = (newComment: Comment) => {
    setComments([ ...comments, newComment]);
  };

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
      <div key={comment.id} className=" col-span-11 flex flex-col">
        <div className="header flex flex-row">
            <span className="font-bold mr-2">Username</span>
            <span className="text-gray-400">
                {dateFormatter.format(new Date())}
            </span>
        </div>
        <div className="min-w-0 overflow-auto break-words">
            <span className="overflow-wrap break-word">{comment.body}</span>
        </div>
        <div className="footer flex flex-row">
            <div className="vote-arrows flex flex-row space-x-1">
                <button className="upvote transition-colors hover:bg-gray-200 rounded-lg"
                >
                    <FaArrowAltCircleUp />
                </button>
                <span className="text-gray-400">0</span>
                <button className="downvote transition-colors hover:bg-gray-200 rounded-lg"
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
        </div>
        {isReplying && <CommentInput onComment={onComment} />}
        <div className="flex flex-col gap-3">
          {comments.map((comment) => (
            <CommentItem comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface CommentInputProps {
  onComment: (newComment: Comment) => void;
}

const CommentInput = ({ onComment }: CommentInputProps) => {
  const [commentBody, setCommentBody] = useState("");

    function handleFileChange(): void {
        throw new Error("Function not implemented.");
    }

  return (
    <div className="flex flex-col mt-4">
      <input
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        className="border-[1px] border-zinc-400 p-2"
        type="text"
        placeholder="What are your thoughts?"
      />
      <div className="flex flex-row">
          <button
            className="w-24 ml-1 text-sm p-1 transition-colors bg-gray-200 hover:bg-gray-300 rounded-lg"
            onClick={() => {
              onComment({ id: "4", body: commentBody, comments: [] });
              setCommentBody("");
            }}
          >
            Comment
          </button>
          <div className="file-input">
            <input type="file" accept="image/*" onChange={() => handleFileChange} />
          </div>
      </div>
    </div>
  );
};

export default Channel;
