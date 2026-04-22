import React from "react";


export const DepartmentButtons = ({ onEdit , onDelete }) => {
    //const handleDelete = async (id) => {
      //  try {
             //   const response = await axios.delete(`http://localhost:3000/api/department/${id}`, 
                    {
//headers: {
                 //   Authorization: `Bearer ${localStorage.getItem('token')}`
                //  },
               // });
        
               // if(response.data.success){
               //     setDepartment(response.data.department)
                }
              //} catch (error) {
              //  const message =
              //  error?.response?.data?.error ||
               //   error?.response?.data?.message ||
                //  'Something went wrong';
                 //   alert(message);
              //}    };

  return (
    <div className="flex gap-3">
      <button
        
        className="px-3 py-1 bg-teal-500 text-white rounded"
        onClick={onEdit}
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="px-3 py-1 bg-red-500 text-white rounded"
      >
        Delete
      </button>
    </div>
  );
};