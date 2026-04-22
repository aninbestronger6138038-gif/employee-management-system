import axios from "axios";
export const fetchDepartments = async () => {
      let departments 
      try {
        const response = await axios.get('http://localhost:3000/api/department', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (response.data.success) {
            departments = response.data.departments
        }
      } catch (error) {
        const message =
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          'Something went wrong';
            alert(message);
      } 
      return departments
    };

    
    export const EmployeeButtons = ({ onEdit , onDelete }) => {
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