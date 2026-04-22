import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const SalaryList = () => {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const isEmployeeView = !!id;

  useEffect(() => {
    fetchSalaries();
  }, [id]);

  const fetchSalaries = async () => {
    try {
      const token = localStorage.getItem("token");

      const url = isEmployeeView
        ? `http://localhost:3000/api/salary/${id}`
        : "http://localhost:3000/api/salary";

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setSalaries(response.data.salaries || []);
      }
    } catch (error) {
      console.log("Error fetching salaries:", error);
      alert("Failed to load salaries");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-lg">Loading salaries...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          {isEmployeeView ? "My Salary" : "Salary List"}
        </h2>

        {!isEmployeeView && (
          <button
            onClick={() => navigate("/admin-dashboard/add-salary")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            + Add Salary
          </button>
        )}
      </div>

      {salaries.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-2xl font-bold text-gray-500">No salary records found</h3>

          {!isEmployeeView && (
            <button
              onClick={() => navigate("/admin-dashboard/add-salary")}
              className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Add Salary
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salaries.map((salary) => (
            <div key={salary._id} className="bg-gray-50 border rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {salary.employeeId?.userId?.Name || "N/A"}
              </h3>
              <p className="text-gray-600 mb-1">
                Employee ID: {salary.employeeId?.employeeId || "N/A"}
              </p>
              <p className="text-gray-600 mb-1">Month: {salary.month}</p>
              <p className="text-gray-600 mb-1">Year: {salary.year}</p>
              <p className="text-gray-600 mb-1">Basic: ₹{salary.basicSalary}</p>
              <p className="text-gray-600 mb-1">Allowances: ₹{salary.allowances}</p>
              <p className="text-gray-600 mb-1">Deductions: ₹{salary.deductions}</p>
              <p className="text-teal-600 font-bold text-lg mt-3">
                Net Salary: ₹{salary.netSalary}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SalaryList;