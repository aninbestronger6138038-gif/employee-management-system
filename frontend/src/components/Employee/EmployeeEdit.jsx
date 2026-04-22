import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { fetchDepartments } from '../../Utils/EmployeeHelper';

const EditEmployee = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        password: '',
        employeeId: '',
        dob: '',
        gender: '',
        maritalstatus: '',
        designation: '',
        department: '',
        salary: '',
        role:''
    });
   
    const [departments, setDepartments] = useState([]);
    const [loading,setLoading] = useState(true);
    const[updating, setUpdating] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    

    // Fetch employee and departments
    useEffect( () => {
        fetchEmployee();
        fetchDepartments();
    }, [id]);

    const fetchEmployee = async () => {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:3000/api/employee/${id}` ,
       {
             headers: {Authorization : `Bearer ${token}`}

       });

       const emp = response.data.employee;
       
       console.log("EDIT EMPLOYEE RESPONSE =", emp);
       console.log("USER DATA =", emp.userId);


       setEmployee({
           name: emp.userId?.Name || '',
           email:emp.userId?.Email || '',
        password: '',
        employeeId: emp.employeeId || '',
        dob: emp.dob || '',
        gender: emp.gender || '',
        maritalStatus: emp.maritalStatus || emp.maritalstatus || '',
        designation: emp.designation || '',
        department: emp.department?._id || '',
        salary: emp.salary || '',
        role: emp.userId?.Role || ''

       });

       if(emp.userId?.profileImage){

        setImagePreview(`http://localhost:3000/uploads/${emp.userId.profileImage}`);
       }
        } catch(error){
            console.error('Error fetching employee:' , error);
        }finally{
              setLoading(false);
        }
    };

    const fetchDepartments = async () => {
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/department', {
                headers: {Authorization : `Bearer ${token}`}
            });

            setDepartments(response.data.departments  || []);
        }catch(error){
            console.error('Error  fetching departments:' , error);
        }
    };

   const handleChange = (e) => {
  const { name, value } = e.target;
  setEmployee((prev) => ({
    ...prev,
    [name]: value
  }));
};

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImagePreview(URL.createObjectURL(file));
    setEmployee((prev) => ({
      ...prev,
      image: file
    }));
  }
};


    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

    try{
        const token = localStorage.getItem('token');
        const formData = new FormData();

        formData.append('name' , employee.name);
        formData.append('email' , employee.email);
        formData.append('employeeId', employee.employeeId);
        formData.append('dob', employee.dob);
        formData.append('gender', employee.gender);
        formData.append('maritalstatus', employee.maritalstatus);
        formData.append('designation', employee.designation);
        formData.append('department', employee.department);
        formData.append('salary', employee.salary);
        formData.append('role', employee.role);
      
      if(employee.password){
            formData.append('password', employee.password);
      }
      if(employee.image){
        formData.append('image',employee.image);
      }
      await axios.put(`http://localhost:3000/api/employee/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'}
    }   );
    
    alert('Employee update successfully!');
    navigate('/admin-dashboard/employees');
    }
    catch(error){
        console.error('Updated error:', error);
        alert('Failed to update employee:'+ (error,response?.data?.error || 'Unknown error'));
    }finally{
        setUpdating(false);
    }
};

if(loading){
    return <div className='min-h-screen flex items-center justify-center'>
        ...Loading!
    </div>;
        }

       return(
        <div className='max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl'>
      <div className='flex items-center gap-4 mb-8'>
        <button
          onClick={() => navigate('/admin-dashboard/employees')}
          className='flex items-center gap-2 text-gray-600 hover:text-teal-600 font-medium'
        >
          ← Back to Employees
        </button>
        <h1 className='text-3xl font-bold text-gray-800'>Edit Employee</h1>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Profile Image */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-3'>Profile Image</label>
            <input
              type='file'
              name='image'
              accept='image/*'
              onChange={handleImageChange}
              className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100'
            />
            {imagePreview && (
              <div className='mt-4'>
                <img
                  src={imagePreview}
                  alt='Preview'
                  className='w-24 h-24 rounded-full object-cover border-4 border-gray-200'
                />
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Name *</label>
              <input
                type='text'
                name='name'
                value={employee.name}
                onChange={handleChange}
                required
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Employee ID *</label>
                <input
                  type='text'
                  name='employeeId'
                  value={employee.employeeId}
                  onChange={handleChange}
                  required
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Role *</label>
                <select
                  name='role'
                  value={employee.role}
                  onChange={handleChange}
                  required
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Email *</label>
            <input
              type='email'
              name='email'
              value={employee.email}
              onChange={handleChange}
              required
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Date of Birth *</label>
            <input
              type='date'
              name='dob'
              value={employee.dob ? employee.dob.split('T')[0] : ''}
              onChange={handleChange}
              required
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Gender *</label>
            <select
              name='gender'
              value={employee.gender}
              onChange={handleChange}
              required
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Marital Status *</label>
            <select
              name='maritalStatus'
              value={employee.maritalStatus}
              onChange={handleChange}
              required
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="unmarried">Unmarried</option>
            </select>
          </div>
        </div>

        {/* Work Details */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Designation *</label>
            <input
              type='text'
              name='designation'
              value={employee.designation}
              onChange={handleChange}
              required
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Department *</label>
            <select
              name='department'
              value={employee.department}
              onChange={handleChange}
              required
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
            >
              <option value="">Select Department</option>
              {departments.map(dep => (
                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Salary *</label>
            <input
              type='number'
              name='salary'
              value={employee.salary}
              onChange={handleChange}
              required
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
              min="0"
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>New Password (optional)</label>
            <input
              type='password'
              name='password'
              placeholder='Leave empty to keep current'
              className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className='flex gap-4 pt-6 border-t'>
          <button
            type='submit'
            disabled={updating}
            className='flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200'
          >
            {updating ? 'Updating...' : 'Update Employee'}
          </button>
          <button
            type='button'
            onClick={() => navigate('/admin-dashboard/employees')}
            className='flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
       ) ;
    };

export default EditEmployee;

