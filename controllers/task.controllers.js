import ErrorHandler from "../middlewares/user.error.js";
import { Task } from "../models/task.model.js";

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const head = await Task.findOne({ title });
        if (head.title === title && head.description === description || head.title === title) return res.status(400).json({ success: false, message: "Existing task can not be added" });
        await Task.create({
            title,
            description,
            user: req.user,
        });

        res.status(201).json({
            success: true,
            message: "Task added Successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const getMyTask = async (req, res, next) => {
    try {
        const userid = req.user._id;

        const tasks = await Task.find({ user: userid });

        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return next(new ErrorHandler("Task not found", 404));

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated!",
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return next(new ErrorHandler("Task not found", 404));
        await task.deleteOne();

        res.status(200).json({
            message: "Task Deleted!",
            success: true,
        });
    } catch (error) {
        next(error);
    }
};
