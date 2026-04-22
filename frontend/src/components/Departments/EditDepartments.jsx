import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditDepartment = () => {
    
    const {id} = useParams()
    const [department, setDepartment] = useState([])
    const [depLoading, setDepLoading] = useState(false)
    const navigate = useNavigate();
     useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/department/${id}`, 
            {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });

        if(response.data.success){
            setDepartment(response.data.department)
        }
      } catch (error) {
        const message =
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          'Something went wrong';
            alert(message);
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("CHANGE:", name, value);
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("form submitted");
  
      try {
        const response = await axios.put(
          `http://localhost:3000/api/department/${id}`,
          department,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
  
        console.log("API RESPONSE =", response);
  
        if (response.data.success) {
          navigate("/admin-dashboard/departments");
        }
      } catch (error) {
        console.error("ADD DEPARTMENT ERROR =", error);
      }
};

    return(
         <>{depLoading ?  <div>... Loading !</div> :

        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
      <h3 className='text-2xl text-center font-bold mb-6'>Edit Department</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='dep_name' className='text-sm font-medium text-gray-700'>
            Department Name
          </label>
          <input
            type='text'
            name='dep_name'
            onChange={handleChange}
            value={department.dep_name}
            placeholder='Enter Department Name'
            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
            required
          />
        </div>

        <div className='mt-3'>
          <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <textarea
            name='description'
            value={department.description}
            placeholder='Description'
            onChange={handleChange}
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            rows='4'
          />
        </div>

        <button
          type='submit'
          onClick={() => console.log("BUTTON CLICKED")}
          className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
        >
         Edit Department
        </button>
      </form>
    </div>
}</>
    )
}

export default EditDepartment;