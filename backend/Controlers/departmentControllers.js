import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
    try{
        const  departments = await Department.find()
        return res.status(200).json({success: true, departments})
    }catch(error) {
         return res.status(500).json({success: false , error: "add department server error"});
    }
}

const addDepartment = async (req,res) => {
  
    try{
         const {dep_name, description}  = req.body;
         
         if (!dep_name) {
      return res.status(400).json({ success: false, error: 'Department name required' });
    }
    


         const newDep = new Department({
            dep_name,
            description
         })
       
         await newDep.save()
         return res.status(200).json({success: true , department: newDep});
    }catch(error){
        return res.status(500).json({success: false , error: "add department server error"});
    }
}

const editDepartment = async(req, res) => {
    try{
        const {id} = req.params;
        const department = await Department.findById(id)
         if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }

         return res.status(200).json({success: true, department})
    }catch(error) {
         return res.status(500).json({success: false , error: "add department server error"});
    }
}

const updateDepartment = async(req, res) => {
     try{
        const {id} =req.params;
        const {dep_name,description} =req.body;
        const editDep =await Department.findByIdAndUpdate({_id:id} , {
            dep_name,
            description,
        })
         return res.status(200).json({success: true, editDepartment})
     }catch(error){
         return res.status(500).json({success: false , error: "add department server error"});
     }
}

const deleteDepartment = async(req,res) => {
    try{
        const {id} =req.params;
        const department = await Department.findByIdAndDelete(id);

        if(!department){
            return res.status(404).json({
                success: false,
                error: "Department not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Department deleted successfully" 
        });
    }catch(error){
      console.log(error);
      return res.status(500).json({
        success: false,
        error: "delete department server error"
      });
    }
};

export {addDepartment ,getDepartments,editDepartment ,updateDepartment ,deleteDepartment}