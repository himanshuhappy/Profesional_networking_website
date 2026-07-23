import React, { createContext } from 'react'
export const authDataContext=createContext()//act as a global variable
function AuthContext({children}) {
const serverUrl="https://profesional-networking-website-backend.onrender.com" //available to children->home,login,signup
    let value={
        serverUrl
    }
  return (
    <div>
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
    </div>
  )
}

export default AuthContext
