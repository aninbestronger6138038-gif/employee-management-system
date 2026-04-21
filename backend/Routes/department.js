import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addDepartment , getDepartments ,editDepartment, updateDepartment, deleteDepartment} from '../Controlers/departmentControllers.js'

const router =express.Router()

// Add this to your department routes
router.get('/', authMiddleware, getDepartments);

router.post('/add' ,authMiddleware, addDepartment);

router.get('/:id' ,authMiddleware, editDepartment);

router.put('/:id' ,authMiddleware, updateDepartment);

router.delete('/:id' ,authMiddleware, deleteDepartment);


export default router 