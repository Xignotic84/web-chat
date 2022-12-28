import React, { createContext } from 'react';
import io from "socket.io-client";
import config from "../config.json";
import {AuthService} from "../services/Auth";

fetch(`${config.api.baseURL}/socket`)
const socket = io({reconnectionAttempts: 5, query: {token: AuthService.generateJSWToken({username: "Xignotic"})}})

const SocketContext = createContext(socket)

const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };

