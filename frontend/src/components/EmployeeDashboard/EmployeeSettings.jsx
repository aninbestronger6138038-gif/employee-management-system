import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useState } from 'react';

const Settings = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [settings,setSettings ] = useState({
        userId:  user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState(null);
 
      const handleChange = (e) => {
        const { name, value } = e.target;
         setSettings((prev) => ({
    ...prev,
    [name]: value
  }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(settings.newPassword !== settings.confirmPassword){
            setError("Password not matched");
        }else{
            try{
                const response = await axios.put(
                    "http://localhost:3000/api/settings/change-password",
                    settings,
                    {
                        headers: { 
                            Authorization : `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                if(response.data.success){
                    navigate("/employee-dashboard");
                    setError("")
                }
            }catch(error){
                   if(error.response &&  !error.response.data.success){
                    setError(error.response.data.error)
                   }
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6"> Change Password</h2>
          <p className='text-red-500'>{error}</p>
          <form onSubmit={handleSubmit}>
            {/* Department Name*/}
            <div>
                <label className="text-sm font-medium text-gray-700">
                    Old Password
                </label>
                <input
                 type="password"
                 name="oldPassword"
                 placeholder="Change Password"
                 onChange={handleChange}
                 className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                 required
                ></input>
            </div>

            <div>
                 <label className="text-sm font-medium text-gray-700">
                    New Password
                </label>
                <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required>
                </input>
            </div>

            <div>
                 <label className="text-sm font-medium text-gray-700">
                    Confirm New Password
                </label>
                <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required>
                </input>
            </div>

           <button 
           type="submit"
           className="w-full mt-6 bg-teal-600 hover: bg-teal-700 text-white font-bold py-2 px-4 rounded-md">
            Change Password
           </button>
          </form>
        </div>
    )
}

export default Settings;