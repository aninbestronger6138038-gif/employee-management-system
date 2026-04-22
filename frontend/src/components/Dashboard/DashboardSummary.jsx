import React from 'react';
import ComponentCards from './ComponentCards.jsx';
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa';

const DashboardSummary = () => {
    return(
        <div className='p-6'>
            <h3 className='text-2xl font-bold '>Dashboard Overview</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
                <ComponentCards icon={<FaUsers />} text="Total Employee" number={13}  color="bg-teal-600"/>
                <ComponentCards icon={<FaBuilding/>} text="Departments" number={5}  color="bg-yellow-600"/>
                <ComponentCards icon={<FaMoneyBillWave/>} text="Monthly" number={800000}  color="bg-red-600"/>
            </div>

            <div className='mt-12'>
                  <h4 className='text-center text-2xl font-bold'> Leave Details </h4>
                  
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                     <ComponentCards icon={<FaFileAlt />} text="Leave Applied" number={5}  color="bg-teal-600"/>
                     <ComponentCards icon={<FaCheckCircle />} text="Leave Approved" number={2}  color="bg-green-600"/>
                     <ComponentCards icon={<FaHourglassHalf />} text="Leave Pending" number={4}  color="bg-yellow-600"/>
                     <ComponentCards icon={<FaTimesCircle />} text="Leave Rejected" number={1}  color="bg-red-600"/>
                  </div>
            </div>

        </div>
    )
}

export default DashboardSummary;