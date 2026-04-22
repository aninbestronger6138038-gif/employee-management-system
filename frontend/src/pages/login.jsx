
import React, { useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword ] =useState('');
    const [error, setError] = useState(null);
    const {login} = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        console.log("🔥 BUTTON CLICKED!"); 
      

        e.preventDefault();
            
            console.log("🔥 Trying to login with:", {email, password});
        try{
              const response = await axios.post("http://localhost:3000/api/auth/login" ,
                 {email, password});
               console.log(response);
               console.log("✅ SUCCESS! Token:", response.data.token);     
               console.log("✅ User:", response.data.user);
               if(response.data.success){
                login(response.data.user);
                localStorage.setItem("token" , response.data.token)

                if(response.data.user.Role == "Admin"){
                       navigate('/admin-dashboard')
                }else{
                     navigate("/employee-dashboard")
                }

               }
        }catch(error){
            if(error.response && !error.response.data.success){
                setError(error.response.data.error);
            }else{
                setError("Server Error");
            }
        }
    };

    return (
        <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b 
        from-teal-600 from-50% to-gray-100 to-50% space-y-6'>
          
           <h2  className='font-sevillana text-3xl text-white'> Employee Management System </h2>
          <div className='border shadow p-6 w-80 bg-white'>
            <h2 className='text-2xl font-bold mb-4'>Login </h2>
             {error && <p className="text-red-500">{error}</p>}
           <form onSubmit={handleSubmit}>
                
                 <div className='mb-4'>
                     <label htmlFor='email' className='block text-gray-700'> EMAIL ID:</label>
                     <input type='email'
                       id="email"          
                       name="email"
                       placeholder='Enter Your Email Id'  className='w-full px-3 py-2 border'
                       onChange={ (e) => setEmail(e.target.value) }
                       required/>
                 </div>

                 <div className='mb-4'>
                     <label id="password" className='block text-gray-700'> PASSWORD:</label>
                     <input type='password'
                       name="password"      
                     placeholder='Enter Your Password'  className='w-full px-3 py-2 border'
                      onChange={ (e) => setPassword(e.target.value) }
                      required/>
                 </div>
                 
                 <div className='mb-4 flex items-center  justify-between'>
                     <label className='inline-flex items-center'>
                        <input type='checkbox' className='form-checkbox'></input>
                        <span className='ml-2  text-grey-700'> Remember Me</span>
                     </label>
                    <a href='#' className='text-teal-600'> Forgot Password??</a>
                 </div>

                 <div className='mb-4'>
                 <button type='submit' className='w-full bg-teal-600 text-white py-2'> Login</button>
                 </div>
           </form>
        </div>
        </div>
    )
}

export default Login;