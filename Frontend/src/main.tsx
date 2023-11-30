import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./output.css";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import {ChannelContextProvider} from "./context/ChannelContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChannelContextProvider>
        <App />
      </ChannelContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
