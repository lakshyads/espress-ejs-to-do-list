import mongoose, { Schema } from 'mongoose';


const toDoItemSchema = new Schema({
    name: { type: String, required: true }
});

const TodoItemModel = mongoose.model('ToDoItem', toDoItemSchema);

const todoListSchema = new Schema({
    name: { required: true, type: String },
    items: [toDoItemSchema]
})

const TodoListModel = mongoose.model('TodoList', todoListSchema);

// Exports ----------------
// export default ToDoItem;
export { TodoItemModel, TodoListModel };