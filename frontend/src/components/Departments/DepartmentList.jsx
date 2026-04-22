import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { DepartmentButtons } from '../../Utils/DepartmentHelpers';

const DepartmentList = () => {
const [departments, setDepartments] = useState([]);
const [depLoading, setDepLoading] = useState(false);
const [search, setSearch] = useState('');
const [currentPage, setCurrentPage] = useState(1);
const cardsPerPage = 6;

//const onDelete = async(id) => {
   // const data =departments.filter(dep => dep._id !== id)
  //  setDepartments(data)}

const navigate= useNavigate();
  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/department', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
          }));
          setDepartments(data);
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

  useEffect(() => {
  setCurrentPage(1);
}, [search]);

  const handleEdit = (_id) => {
    navigate(`/admin-dashboard/edit-department/${_id}`);
  };

  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this department?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:3000/api/department/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        setDepartments((prev) => prev.filter((dep) => dep._id !== _id).map((dep, index) => ({
            ...dep,
            sno: index + 1
          })));
      }
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        'Delete failed';

      alert(message);
    }
  };


  const filteredDepartments = departments.filter((dep) =>
    dep.dep_name.toLowerCase().includes(search.toLowerCase())
  );

const indexOfLastCard = currentPage * cardsPerPage;
const indexOfFirstCard = indexOfLastCard - cardsPerPage;
const currentDepartments = filteredDepartments.slice(indexOfFirstCard, indexOfLastCard);
const totalPages = Math.ceil(filteredDepartments.length / cardsPerPage);

  return (
    <>
      {depLoading ? (
        <div>...Loading !</div>
      ) : (
        <div className='p-5'>
          <div className='text-center mb-6'>
            <h3 className='text-2xl font-bold'>Manage Departments</h3>
          </div>

          <div className='flex justify-between items-center mb-6'>
            <input
              type="text"
              placeholder='Search by Department Name'
              className='px-4 py-2 border rounded-md w-64'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link
              to='/admin-dashboard/add-department'
              className='px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition-colors'
            >
              Add New Department
            </Link>
          </div>

          {filteredDepartments.length > 0 ? (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentDepartments.map((dep, index) => (
                <div
                  key={dep._id}
                  className="bg-white shadow-md rounded-xl border border-gray-200 p-5 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm text-gray-500">Department #{index + 1}</p>
                      <h4 className="text-xl font-semibold text-gray-800">
                        {dep.dep_name}
                      </h4>
                    </div>
                  </div>

                  <DepartmentButtons
                    onEdit={() => handleEdit(dep._id)}
                    onDelete={() => handleDelete(dep._id)}
                  />
                </div>
              ))}
            </div>
            {totalPages > 1 && (
  <div className="flex justify-center items-center gap-2 mt-6">
    <button
      onClick={() => setCurrentPage((prev) => prev - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
    >
      Prev
    </button>

    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => setCurrentPage(index + 1)}
        className={`px-4 py-2 rounded ${
          currentPage === index + 1
            ? 'bg-teal-600 text-white'
            : 'bg-gray-200 text-black'
        }`}
      >
        {index + 1}
      </button>
    ))}

    <button
      onClick={() => setCurrentPage((prev) => prev + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}
</>
          ) : (
            <div className="text-gray-500 text-center mt-10">
              No departments found.
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default DepartmentList;
