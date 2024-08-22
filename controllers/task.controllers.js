import { Task } from "../models/task.model.js"
export const newTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }



        await Task.create({
            title,
            description,
            user: req.user
        });
        res.status(201).json({
            success: true,
            message: "Task added successfully",
        });



    } catch (error) {
        next(error);
    }
};



export const getMyTask = async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ user: userId });
        res.status(200).json({
            tasks
        })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id)
        if (!task) {
            return res.status(400).json({
                success: false,
                message: "Task not found"
            })
        }
        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated",
            id
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return next(new Error("Task not found", 404))
        await Task.findByIdAndDelete(task);
        res.status(200).json({
            success: true,
            message: "Task Deleted"
        })
    } catch (error) {
        next(error)
    }
}   