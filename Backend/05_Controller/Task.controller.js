import Task from "../02_Model/Task.model.js";
import User from "../02_Model/User.model.js";

const taskCreation = async(req, res) => {
    try {
        const user = req.user;

        console.log(user);

        const {title, description, priority, dueDate, status, assignedTo} = req.body;

        if(!title || !description){
            return res.status(400).json({
                message: "Title and description are required."
            })
        }

        if (!Array.isArray(assignedTo) || assignedTo.length === 0) {
            return res.status(400).json({
                message: "At least one user must be assigned."
            });
        }

        const task = await Task.create({
            title,
            description,
            createdBy: user,
            priority,
            dueDate,
            status,
            assignedTo
        })

        res.status(201).json({
            message: "Task is created Sucessfully",
            data: task,
        })

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`,
        })
    }
}

const taskUpdate = async(req, res) => {
    try {
        const user  = req.user;
        const id = req.params.id;
        const {title, description, priority, dueDate, status, assignedTo} = req.body;

        console.log(id);

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required."
            });
        }

        if (!Array.isArray(assignedTo) || assignedTo.length === 0) {
            return res.status(400).json({
                message: "At least one user must be assigned."
            });
        }

        const task = await Task.findById(id);

        console.log(task);

        if(!task){
            return res.status(404).json({
                message: "Task not Found"
            })
        }

        if (task.createdBy.toString() !== user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to update this task."
            });
        }

        task.title = title;
        task.description = description;
        task.priority = priority;
        task.dueDate = dueDate;
        task.status = status;
        task.assignedTo = assignedTo;

        await task.save();

        res.status(200).json({
            message: `Task Has been Updated Successfully`,
            data: task,
        })

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`,
        })
    }
}

const taskDelete = async(req, res) => {
    try {
        const user = req.user;

        const {id} = req.params;

        const task = await Task.findById(id);

        if(!task){
            return res.status(404).json({
                message: "Task Not not Found"
            })
        }

        if(!task.createdBy.equals(user._id)){
            return res.status(403).json({
                message: "User is Unauthorize"
            })
        }

        await task.deleteOne();

        res.status(200).json({
            message: "Task Deleted Sucessfully",
            data: task,
        })
        
    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`,
        })
    }
}

const taskReassingAdmin = async(req, res) => {
    try {
        const {id} = req.params;
        const {newAdminId} = req.body;

        if (!newAdminId) {
            return res.status(400).json({
                message: "New admin ID is required."
            });
        }

        const oldAdmin = await User.findById(id);
        const newAdmin = await User.findById(newAdminId);

        console.log(oldAdmin);
        console.log(newAdmin);

        if(!oldAdmin || !newAdmin){
            return res.status(404).json({
                message: "Admin Not Found"
            })
        }

        

        if (oldAdmin._id.equals(newAdmin._id)) {
            return res.status(400).json({
                message: "Old and new admin cannot be the same."
            });
        }

        if(oldAdmin.role !== "Admin" || newAdmin.role !== "Admin"){
            return res.status(400).json({
                message: `Old Admin is ${oldAdmin.role} & New Admin is ${newAdmin.role}`
            })
        }

        const result = await Task.updateMany({createdBy: oldAdmin._id}, { $set: {createdBy: newAdmin._id}});

        res.status(200).json({
            message: `Task Reassigned Sucessfully`,
            tasksReassigned: result.modifiedCount,
            data: result,
        });

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`,
        })
    }
}

const taskList = async(req, res) => {
    try {
        const user = req.user;

        const {priority, dueDate, status} = req.query;
        
        const filter = {};

        if(!user){
            return res.status(400).json({
                message: "Wrong User info Kindly Login"
            })
        }

        if(priority){
            filter.priority = priority;
        }

        if(dueDate){
            filter.dueDate = dueDate;
        }

        if(status){
            filter.status = status;
        }

        let tasks;

        if(user.role === "Super_Admin"){
             tasks = await Task.find(filter);
        }else if(user.role === "Admin"){
             tasks = await Task.find({createdBy: user._id, ...filter});
        }else{
             tasks = await Task.find({"assignedTo.user": user._id, ...filter});
        }

        let msg;

        
            if(tasks.length === 0){
                if(Object.keys(filter).length > 0){
                    const mesg = Object.entries(filter).map(([key, value]) => `${key} is ${value}`).join(", ");
                    msg = `No Task Found When ${mesg}`
                }else{
                    msg = "No Task Found"
                }
            }else{
                msg = "Task Found Successfully"
            }
    

        res.status(200).json({
            message: msg,
            data: tasks,
            totalTasks: tasks.length,
        })

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`,
        })
    }
}

export {taskList, taskCreation, taskUpdate, taskDelete, taskReassingAdmin};
