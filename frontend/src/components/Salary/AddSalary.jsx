import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSalary = () => {
  const [employees, setEmployees] = useState([]);
  const [salary, setSalary] = useState({
    employeeId: '',
    month: '',
    year: '',
    basicSalary: '',
    allowances: '',
    deductions: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/employee', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(response.data.employees || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
       alert("Failed to load employees");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/salary/add', salary, {
        headers: { Authorization: `Bearer ${token}`, 
                  "Content-Type" : "application/json"
      }
      });

      if (response.data.success){
      alert('Salary added successfully');
      navigate('/admin-dashboard/salary');
      }else{
        alert(response.data.error ||  "Failed to Add Salary");
      }
    } catch (error) {
      console.error('Error adding salary:', error);
    
      console.log("SERVER ERROR RESPONSE:", error.response?.data);
      alert(error.response?.data?.error || 'Failed to add salary');
    }
  };

  const handleCancel = () => {
    navigate("/admin-dashboard/salary");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-md">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/admin-dashboard/salary')}
          className="text-gray-600 hover:text-teal-600 font-medium"
        >
          ← Back
        </button>
        <h2 className="text-3xl font-bold text-gray-800">Add Salary</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold text-gray-700">Employee</label>
          <select
            name="employeeId"
            value={salary.employeeId}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.userId?.Name} - {emp.employeeId}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Month</label>
          <input
            type="text"
            name="month"
            value={salary.month}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Month"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Year</label>
          <input
            type="number"
            name="year"
            value={salary.year}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Year"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Basic Salary</label>
          <input
            type="number"
            name="basicSalary"
            value={salary.basicSalary}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Allowances</label>
          <input
            type="number"
            name="allowances"
            value={salary.allowances}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Deductions</label>
          <input
            type="number"
            name="deductions"
            value={salary.deductions}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="md:col-span-2 flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold"
          >
            Add Salary
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSalary;
