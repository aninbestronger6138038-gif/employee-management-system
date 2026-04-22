import React from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/Dashboard/AdminSidebar';
import Navbar from '../components/Dashboard/Navbar';
import DashboardSummary from '../components/Dashboard/DashboardSummary';
import { Outlet } from 'react-router-dom';

const AdminDashboard =  () => {
    const {user} = useAuth()
  
    

    return(
        <div> 
            <AdminSidebar />
            <div className='flex-1 ml-64 bg-gray-100 h-screen'>
               <Navbar />
               <Outlet />
            </div>
        </div>
    )
}

export default AdminDashboard;
