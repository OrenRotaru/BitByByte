import React from "react";
import { useParams } from "react-router-dom";
import ChannelList from "../components/ChannelList";

const Channel: React.FC = () => {
  const { id } = useParams();

  return (
    <div>
      <ChannelList />
      <h1>Channel {id}</h1>
      {/* Add your channel content here */}
      <p>This is the page for channel {id}.</p>
    </div>
  );
};

export default Channel;
