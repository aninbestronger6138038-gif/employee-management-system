import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchDepartments } from '../../Utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {

    const [departments,setDepartments] = useState([])

    const [formData,setFormdata] =useState({})

    const navigate = useNavigate();

    useEffect(() => {
        const getDepartments = async () => {
         const departments = await fetchDepartments()
         setDepartments(departments)
        }
        getDepartments();
    } ,[])

    const handleChange = (e) => {
                const {name, value ,files} = e.target
                if(name === "image"){
                    setFormdata((prevData) => ({...prevData, [name] : files[0]}))
                }else{
                    setFormdata((prevData) => ({...prevData, [name] : value}))
                }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    console.log("FORM SUBMIT STARTED");
  
    console.log("token =", localStorage.getItem('token'));

    const  formDataobj = new FormData()
    Object.keys(formData).forEach((key) =>{
        formDataobj.append(key, formData[key])
    } )

    try {
      const response = await axios.post(
        'http://localhost:3000/api/employee/add',
        formDataobj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      console.log("API RESPONSE =", response);

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.error("ADD DEPARTMENT ERROR =", error);
    }
    }



    return(
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
         <h2 className='text-2xl font-bold mb-6'>Add New Employee </h2>

         <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
                <label className='block text-sm font-medium text-gray-700'>
               Name </label>
               <input 
               type="text"
               name="name"
               placeholder="Insert Name"
               onChange={handleChange}
               className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
               required>

               </input>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700'>
               E-mail</label>
               <input 
               type="email"
               name="email"
               placeholder="Insert Email"
               onChange={handleChange}
               className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
               required>
                
               </input>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>
               Employee Id</label>
               <input 
               type="text"
               name="employeeId"
               placeholder="Insert Employee ID"
               className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
               onChange={handleChange}
               required>
                
               </input>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700'>
               date Of Birth</label>
               <input 
               type="date"
               name="dob"
               placeholder="Insert DOB"
               className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
               onChange={handleChange}
               required>
                
               </input>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>
               Gender </label>
             <select 
             name="gender"
             className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
             onChange={handleChange}
             required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">female</option>
                <option value="other">Other </option>
                </select>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700'>
                    Marital Status
                </label>
                <select
                name="maritalstatus"
                className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                onChange={handleChange}
                required>
                    <option value="">Select Status</option>
                    <option value="married">Married</option>
                    <option value="unmarried">Unmarried</option>
                    <option value="divorced">Divorced</option>
                </select>
            </div>

           < div>
                <label className='block text-sm font-medium text-gray-700'>
               Designation</label>
               <input 
               type="text"
               name="designation"
               placeholder="Insert Designation"
               onChange={handleChange}
               className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
               required>
               </input>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700'>
               Department</label>
               <select 
              
               name="department"
               placeholder="Insert Email"
               onChange={handleChange}
               className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
               required>
                <option value="">Select Department</option>
                 {departments.map(dep  => (
                    <option key ={dep._id} value={dep._id}> {dep.dep_name} </option>
                 ))}
               </select>
            </div>
             
             <div>
                <label className='block text-sm font-medium text-gray-700'>
               Salary</label>
               <input 
               type="number"
               name="salary"
               placeholder="Enter Your Salary"
               onChange={handleChange}
               className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
               required>
                
               </input>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700'>
               password</label>
               <input 
               type="password"
               name="password"
               placeholder="******"
               onChange={handleChange}
               className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
               required>
               </input>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700'>
              Role</label>
               <select
               name="role"
               placeholder="Insert Email"
               onChange={handleChange}
               className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
               required>

                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
               </select>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700'>
               Upload Image</label>
               <input 
               type="file"
               name="image"
               placeholder="Upload Image"
               onChange={handleChange}
               className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
               required>
               </input>
            </div>
            </div>

            <button 
            type="submit"
            className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>
                Add Employee
            </button>
         </form>

        </div>
    );
};

export default Add;