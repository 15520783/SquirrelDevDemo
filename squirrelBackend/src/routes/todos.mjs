import express from "express";
import {
  createNew,
  getAllTodos,
  deleteById,
} from "../controllers/todoController.mjs";

const router = express.Router();

router.get("/getAll", getAllTodos);

router.post("/createNew", createNew);

router.delete("/delete/:id", deleteById);

export default router;
