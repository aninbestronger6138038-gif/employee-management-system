import React from 'react';
import { NavLink } from 'react-router-dom';
import {FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers} from 'react-icons/fa'
import { useAuth } from '../../context/authContext';


const EmployeeSidebar = () => {
    const {user} = useAuth()
    console.log("EmployeeSidebar user:", user);
     console.log("EmployeeSidebar user._id:", user?._id);
    console.log(
  "Profile URL:",
  user?._id ? `/employee-dashboard/profile/${user._id}` : "user id missing"
);

    console.log("Sidebar user:", user);
    console.log("Sidebar user id:", user?._id);
console.log("Sidebar user:", user);
console.log("Sidebar profile path:", user?._id ? `/employee-dashboard/profile/${user._id}` : "missing id");
    return(
       <div  className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64 '>
             <div className='bg-teal-600 h-12 flex items-center justify-center'>
              <h4 className='text-2xl text-center '>Employee MS</h4>
             </div>
             <div>
                <NavLink to="/employee-dashboard"
                  className={ ({isActive}) => `${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`} end> 
                      <FaTachometerAlt />
                      <span> Dashboard </span>
                </NavLink>

                { user?._id &&(
                 <NavLink to={`/employee-dashboard/profile/${user?._id}`}
                    className={ ({isActive}) => `${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`} end> 
                      <FaUsers/>
                      <span> My Profile </span>
                </NavLink> )}

                 <NavLink to="/employee-dashboard/leaves"
                    className={ ({isActive}) => `${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`}> 
                      <FaBuilding />
                      <span>Leaves</span>
                </NavLink>

                 <NavLink to={`/employee-dashboard/salary/${user._id}`}
                    className={ ({isActive}) => `${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`} >
                      <FaCalendarAlt />
                      <span>Salary</span>
                </NavLink>

                <NavLink to="/employee-dashboard/settings"
                    className={ ({isActive}) => `${isActive ? "bg-teal-500 " : " " } flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                      <FaCogs />
                      <span> Settings</span>
                </NavLink>
             </div>

       </div>

    )
}

export default EmployeeSidebar;