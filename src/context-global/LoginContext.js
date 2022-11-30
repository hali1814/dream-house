
import React, {createContext, useState} from 'react'

export const LOGIN_CONTEXT = createContext();

const LoginContext = ({children}) => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <LOGIN_CONTEXT.Provider value={{isLogin, setIsLogin}}>
        {children}
    </LOGIN_CONTEXT.Provider>

        
  )
}

export default LoginContext