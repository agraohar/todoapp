import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    text: {type: String, required: true},
});

const todoModel = mongoose.model("todo_items", todoSchema);

export default todoModel