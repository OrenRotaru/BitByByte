import { ChannelsContext } from "../context/ChannelContext";
import { useContext } from "react";

export const useChannelsContext = () => {
  const context = useContext(ChannelsContext);
  if (!context) {
    throw new Error("useChannelContext must be used within a ChannelsProvider");
  }
  return context;
};