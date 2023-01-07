import React, { createContext } from 'react';
import io from "socket.io-client";
import config from "../config.json";

fetch(`${config.api.baseURL}/socket`)
const socket = io({autoConnect: false, reconnectionAttempts: 5, query: {token: "1"}})

const SocketContext = createContext(socket)

const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };

