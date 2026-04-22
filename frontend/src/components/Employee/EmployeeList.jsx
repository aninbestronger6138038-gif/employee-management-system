import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 4;
  const navigate = useNavigate();

  // Fetch employees and departments
  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/employee/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(response.data.employees || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/department', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDepartments(response.data.departments || []);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleDelete = async (employeeId) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/employee/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(employees.filter(emp => emp._id !== employeeId));
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee');
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.userId?.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || employee.department?._id === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });
  
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);


  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-10 p-8">
        <div className="text-center">Loading employees...</div>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto mt-10 p-8 bg-white rounded-md shadow-md'>
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-3xl font-bold text-gray-800'>Manage Employees</h2>
        <button
          onClick={() => navigate('/admin-dashboard/add-employee')}
          className='bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200'
        >
          + Add New Employee
        </button>
      </div>

      {/* Search & Filter */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <input
          type="text"
          placeholder="Search by name or employee ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
        />
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className='p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500'
        >
          <option value="">All Departments</option>
          {departments.map(dep => (
            <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
          ))}
        </select>
        <button
          onClick={() => {
            setSearchTerm('');
            setSelectedDepartment('');
          }}
          className='bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg'
        >
          Clear Filters
        </button>
      </div>

      {/* Employees Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredEmployees.length > 0 ? (
          currentEmployees.map((employee) => (

            <div key={employee._id} className='bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden'>
              {/* Profile Image */}
              <div className='relative h-48 bg-gradient-to-br from-teal-500 to-teal-600'>
                {employee.userId?.profileImage ? (
                  <img
                    src={`http://localhost:3000/uploads/${employee.userId.profileImage}`}
                    alt={employee.userId?.Name}
                    className='absolute top-4 left-4 w-20 h-20 rounded-full border-4 border-white object-cover'
                  />
                ) : (
                  <div className='absolute top-4 left-4 w-20 h-20 rounded-full bg-white flex items-center justify-center'>
                    <span className='text-2xl font-bold text-teal-600'>
                      {employee.userId?.Name?.charAt(0) || 'E'}
                    </span>
                  </div>
                )}
                <div className='absolute bottom-2 right-2 bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700'>
                  {employee.role || 'Employee'}
                </div>
              </div>

              {/* Employee Details */}
              <div className='p-6'>
                <h3 className='text-xl font-bold text-gray-800 mb-2'>
                  {employee.userId?.Name || 'N/A'}
                </h3>
                <p className='text-gray-600 mb-1'>
                  <span className='font-semibold'>ID:</span> {employee.employeeId || 'N/A'}
                </p>
                <p className='text-gray-600 mb-1'>
                  <span className='font-semibold'>Designation:</span> {employee.designation || 'N/A'}
                </p>
                <p className='text-gray-600 mb-1'>
                  <span className='font-semibold'>Department:</span> {employee.department?.dep_name || 'N/A'}
                </p>
                <p className='text-gray-600 mb-4'>
                  <span className='font-semibold'>Salary:</span> ₹{employee.salary?.toLocaleString() || 'N/A'}
                </p>

                {/* Action Buttons */}
                <div className='flex gap-2 p-2 bg-gray-50 border-t'>
                    <button
                       onClick={() => navigate(`/admin-dashboard/employee-details/${employee._id}`)}
                       className='flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg
                        transition duration-200 flex items-center justify-center gap-1' title="View Details">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>View
                      </button>
               
                 <button
                    onClick={() => navigate(`/admin-dashboard/edit-employee/${employee._id}`)}
                   className='flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-lg transition duration-200'
                    >
                       Edit
                  </button>

                  <button
                    onClick={() => handleDelete(employee._id)}
                    className='flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='col-span-full text-center py-20'>
            <div className='text-6xl mb-4'>👥</div>
            <h3 className='text-2xl font-bold text-gray-500 mb-2'>No employees found</h3>
            <p className='text-gray-500 mb-6'>Try adjusting your search or filter</p>
            <button
              onClick={() => navigate('/admin-dashboard/add-employee')}
              className='bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-lg'
            >
              Add First Employee
            </button>
          </div>
        )}
      </div>

      <div className='mt-8 text-center text-gray-500'>
        Showing {filteredEmployees.length} of {employees.length} employees
      </div>
      {totalPages > 1 && (
  <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded-lg font-medium ${
        currentPage === 1
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-teal-600 text-white hover:bg-teal-700'
      }`}
    >
      Prev
    </button>

    {[...Array(totalPages)].map((_, index) => {
      const pageNumber = index + 1;
      return (
        <button
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          className={`px-4 py-2 rounded-lg font-medium ${
            currentPage === pageNumber
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {pageNumber}
        </button>
      );
    })}

    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 rounded-lg font-medium ${
        currentPage === totalPages
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-teal-600 text-white hover:bg-teal-700'
      }`}
    >
      Next
    </button>
  </div>
)}

    </div>

  );
};

export default EmployeeList;