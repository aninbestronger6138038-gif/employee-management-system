import React , {useState,useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

const EmployeeDetails = () => {
    const {id} = useParams();
    console.log("useParams id:", id);
console.log("pathname:", window.location.pathname);
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log("params id:", id);
    console.log("current pathname:", window.location.pathname);
    useEffect(() => {


    const fetchEmployee = async () => {
        // Guard: don't fetch without ID
       if (!id || id === "undefined" || id === "null") {
               console.log("Invalid employee ID:", id);
              setLoading(false);
               return;
            }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No token found');
                return;
            }

            console.log('Fetching employee:', id); // Debug log
            const response = await axios.get(`http://localhost:3000/api/employee/user/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setEmployee(response.data.employee);
        } catch (error) {
            console.error('Error fetching employee:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchEmployee();
}, [id]);

    if(loading){
        return(
            <div className='min-h-screen bg-gray-50 py-12 px-4'>
                <div className='max-w-4xl mx-auto text-center'>
                    <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto mb-4'>
                    </div>
                    <p className='text-xl text-gray-60'>....Loading Employee Details</p>
                </div>
            </div>
        );
    }

    if(!employee){
        return(
            <div className='min-h-screen bg-gray-5 py-12 px-4'>
                <div className='max-w-4xl mx-auto text-center'>
                    <div className='text-6xl mb-4'>👤
                     <h2 className='text-2xl font-bold text-gray-800 mb-2'> Employee Not Found</h2>
                     <button 
                     onClick={() => navigate('/admin-dashboard/employees')}
                     className='bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg mt-4'>
                        Back to Employees
                     </button>
                    </div>
                </div>
            </div>
        );
    }
   
    return(
        <div className='min-h-screen bg-gray-50 py-12 px-4'>
            <div className='max-w-4xl mx-auto'>
                {/* Header*/}
                <div className='flex items-center justify-between mb-8'>
                    <div className="flex items-center gap-4">
                        <button
                        onClick={ () => navigate('/admin-dashboard/employees')}
                        className='flex items-center gap-2 text-gray-600 hover:text-teal-600 font-medium'>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                             </svg>
                             Back to Employees
                        </button>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Employee Details
                        </h1>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    {/* Left - Profile Image & Basic info*/}
                    <div className='bg-white rounded-2xl shadow-lg p-8 border border-gray-100'>
                        <div className='flex flex-col items-center text-center mb-8'>
                            {employee.userId?.profileImage ? (
                                <img 
                                src= {`http://localhost:3000/uploads/${employee.userId.profileImage}`}
                                alt={employee.userId?.name}
                                className='w-32 h-32 rounded-full object-cover border-4 border-teal-100 shadow-lg mb-4'/>
                           ) : (
                       <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center 
                       justify-center mb-4 shadow-lg">
                       <span className="text-3xl font-bold text-white">
                               {(employee.userId?.Name || employee.userId?.name || 'E').charAt(0).toUpperCase()}
                       </span>
                        </div>
                        )}
                       <h2 className='text-2xl font-bold text-gray-800 mb-2'>
                         {employee.userId?.Name || employee.userId?.name || 'N/A'}
                       </h2>
                       <p className='text-teal-600 font-semibold text-lg '>
                            {employee.designation || 'N/A'}
                       </p>
                        </div>

                        {/* Quick Stats*/}
                        <div className='grid grid-cols-2 gap-4 mb-6'>
                            <div className='text-center p-4 bg-teal-50 rounded-xl'>
                                <div className='text-2xl font-bold text-teal-600'>
                                    {employee.employeeId || 'N/A'}
                                </div>
                            <div className='text-sm  text-gray-600'> Employee Id</div>
                            </div>
                            <div className='text-center p-4 bg-blue-50 rounded-xl'>
                                 <div className='text-2xl font-bold text-blue-600'>
                                         ₹{employee.salary?.toLocaleString() || '0'}
                                       </div>
                       <div className='text-sm text-gray-600'>Monthly Salary

                       </div>
                         </div>
                        </div>
                        <div className="flex gap-3">
              
              <button
                onClick={() => navigate('/employee-dashboard')}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
              >
                Back
              </button>
            </div>
                    </div>

                {/* Right - Detailed Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
    <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    Personal Information
  </h3>
  
  {/* FIXED LEFT-ALIGNED LIST */}
  <div className="space-y-4">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-gray-50 rounded-xl">
      <span className="font-semibold text-gray-700">Date of Birth:</span>
      <span className="text-lg font-medium text-gray-900">
        {employee.dob ? new Date(employee.dob).toLocaleDateString('en-IN') : 'N/A'}
      </span>
    </div>
    
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-gray-50 rounded-xl">
      <span className="font-semibold text-gray-700">Gender:</span>
      <span className="text-lg font-medium text-gray-900">{employee.gender || 'N/A'}</span>
    </div>
    
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-gray-50 rounded-xl">
      <span className="font-semibold text-gray-700">Marital Status:</span>
      <span className="text-lg font-medium text-gray-900">
        {employee.maritalStatus || employee.maritalstatus || 'N/A'}
      </span>
    </div>
    
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-gray-50 rounded-xl">
      <span className="font-semibold text-gray-700">Email:</span>
      <span className="text-lg font-medium text-gray-900 break-all">
        {employee.userId?.Email || employee.userId?.email || 'N/A'}
      </span>
    </div>
  </div>
</div>

                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Work Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Department</label>
                  <div className="text-lg font-medium text-gray-900">
                    {employee.department?.dep_name || 'N/A'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Role</label>
                  <div className="text-lg font-medium text-gray-900">
                    {employee.userId?.Role || 'N/A'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Monthly Salary</label>
                  <div className="text-2xl font-bold text-teal-600">
                    ₹{employee.salary?.toLocaleString() || '0'}
                  </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    );

};

export default EmployeeDetails;