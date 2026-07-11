    import User from "../02_Model/User.model.js";

    const activate = async(req, res) => {
        try {
            const { id } = req.params;

            if(!id){
                return res.status(400).json({
                    message: "Please Provide User Id"
                })
            }

            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({
                    message: "User is not in Database"
                });
            }

            if(user.isActive){
                return res.status(400).json({
                    message: `User is already activated`
                })
            }

            user.isActive = true;
            await user.save()
            

            
            res.status(200).json({
                message: "User account activated successfully",
                data: user,
            })

        } catch (error) {
            res.status(500).json({
                message: `Server Error: ${error.message}`
            })
        }
    }


    const deactivate = async(req, res) => {
        try {
            const { id } = req.params;

            if(!id){
                return res.status(400).json({
                    message: "Please Provide User Id"
                })
            }

            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({
                    message: "User is not in Database"
                });
            }

            if(!user.isActive){
                return res.status(400).json({
                    message: `User is already deactivated`
                })
            }

            
            user.isActive = false;
            await user.save()

            res.status(200).json({
                message: "User account deactivated successfully",
                data: user,
            })

        } catch (error) {
            res.status(500).json({
                message: `Server Error: ${error.message}`
            })     
        }
    }

    const promote = async(req, res) => {
        try {
            const { id } = req.params;

            if(!id){
                return res.status(400).json({
                    message: "Please Provide User Id"
                })
            }

            const user = await User.findById(id);
            if(!user){
                return res.status(404).json({
                    message: "User is not in Database"
                })
            }

            if(user.role === "Super_Admin"){
            return res.status(400).json({
                message: "User can't be Promoted Further"
            })
            }else if(user.role === "Admin"){
            user.role = "Super_Admin"
            }else{
            user.role = "Admin"
            }

            await user.save();
            
            res.status(200).json({
                message: `User is promoted to ${user.role}`,
                data: user,
            })
        } catch (error) {
            res.status(500).json({
                message: `Server Error: ${error.message}`
            })
        }
    }

    const demote = async(req, res) => {
        try {
            const { id } = req.params;

            if(!id){
                return res.status(400).json({
                    message: "Please Provide User Id"
                })
            }

            const user = await User.findById(id);
            if(!user){
                return res.status(404).json({
                    message: "User is not in Database"
                })
            }

            if(user.role === "Employee"){
            return res.status(400).json({
                message: "User can't be Demoted Further"
            })
            }else if(user.role === "Admin"){
            user.role = "Employee"
            }else{
            user.role = "Admin"
            }

            await user.save();
            
            res.status(200).json({
                message: `User is demoted to ${user.role}`,
                data: user,
            }) 
        } catch (error) {
            res.status(500).json({
                message: `Server Error: ${error.message}`
            })
        }
    }

    const softDelete = async(req, res) => {
        try {
            const { id } = req.params;

            if(!id){
                return res.status(400).json({
                    message: "Please Provide User Id"
                })
            }

            const user = await User.findById(id);

            if(!user){
                return res.status(404).json({
                    message: "User is not in Database"
                })
            }

            if(user.isDeleted){
                return res.status(400).json({
                    message: "User is Already Deleted" 
                })
            }

            user.isDeleted = true;
            user.sessionVersion++;
            
            await user.save();

            res.status(200).json({
                message: "User Account is Deleted Successfully",
                data: user,
            })

        } catch (error) {
            res.status(500).json({
                message: `Server Error: ${error.message}`
            })
        }
    }

    const restoreUser = async(req, res) => {
        try {
            const {id} = req.params;

            if(!id){
                return res.status(400).json({
                    message: "Please Provide User Id"
                })
            }

            const user = await User.findById(id);

            if(!user){
                return res.status(404).json({
                    message: "User is not in Database"
                })
            }

            if(!user.isDeleted){
                return res.status(400).json({
                    message: `User is not deleted and can't be restored`
                })
            }

            user.isDeleted = false;
            await user.save();

            res.status(200).json({
                message: `User restored successfully`,
                data: user,
            })

        } catch (error) {
            res.status(500).json({
                message: `Server Error: ${error.message}`
            })
        }
    }

    const userList = async(req, res) => {
        try {
            const { role, isActive, isDeleted } = req.query;

            const filter = {};

            if(role){
                filter.role = role;
            }

            if(isActive){
                filter.isActive = isActive === "true";
            }

            if(isDeleted){
                filter.isDeleted = isDeleted === "true";
            }

            const users = await User.find(filter);

            res.status(200).json({
                message : `PFA User info as per filter`,
                data: users,
            })

        } catch (error) {
            res.status(500).json({
                message: `Server Error: ${error.message}`
            })
        }
    }

    export {activate, deactivate, promote, demote, softDelete, restoreUser, userList};