import mongoose from "mongoose";
import Todo from "../schema/todoModel.mjs";

// Retrieve all the todo saved in the database
const getAllTodos = async (_req, res, _next) => {
  let results = await Todo.find().select("_id title detail createdDate");
  return res.send(results).status(200);
};

// Create new todo
const createNew = async (req, res, next) => {
  try {
    const newTodo = new Todo({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      detail: req.body.detail,
    });
    const result = await newTodo.save();
    return res
      .send({
        success: true,
        message: "New todo created successfully",
        todo: result,
      })
      .status(200);
  } catch (error) {
    next(error);
  }
};

// Delete todo
const deleteById = async (req, res, next) => {
  try {
    const result = await Todo.deleteOne({
      _id: req?.params?.id,
    });
    if (!result.deletedCount) {
      return res
        .send({
          success: false,
          message: "Deleted object not found",
        })
        .status(400);
    }
    return res
      .send({
        success: true,
        message: "Todo deleted successfully",
      })
      .status(200);
  } catch (error) {
    next(error);
  }
};

export { getAllTodos, createNew, deleteById };
