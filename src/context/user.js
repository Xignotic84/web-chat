import React, {createContext, useEffect, useState} from 'react';
import {getCookie} from "cookies-next";

const UserContext = createContext()

const UserProvider = ({children}) => {

  const token = getCookie("jwtToken")

  let [user, setUser] = useState(token)

  useEffect(() => {
    setUser(token || false)
  }, [user])

  return (
      <UserContext.Provider value={{user, setUser}}>
        {children}
      </UserContext.Provider>
  );
};

export {UserContext, UserProvider};

