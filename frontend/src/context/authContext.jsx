import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect( () => {
         const verifyUser = async () => {
            
            try{
                const token = localStorage.getItem('token')
                if (token) {
                const response = await axios.get('http://localhost:3000/api/auth/verify' , {
                    headers: {
                        "Authorization" : `Bearer ${token}`
                    },
                }
            );
            console.log(response)
                if(response.data.success){
                    setUser(response.data.user);
                    console.log("verify response:", response.data);
console.log("verified user:", response.data.user);
console.log("verified user _id:", response.data.user?._id);
                }
            }else{
                setUser(null);
                setLoading(false);
                
            }
            }catch(error){
              console.log(error)
              if(error.response && !error.response.data.error){
                 setUser(null)
              }
            }finally {
                setLoading(false)
            }
         }
         verifyUser();
  } , [ ])

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;