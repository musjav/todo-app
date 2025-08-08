import { useState } from 'react';
import styles from './App.module.css';
import TodoHome from './Screens/TodoHome';


  // ======================================================================================
  // ======================================================================================
  // ===============================no database code=======================================
  // ======================================================================================
  // ======================================================================================
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!todo.task.trim()) return;

  //   if (editIndex !== null) {
  //     const updatedTodos = [...todoList];
  //     updatedTodos[editIndex].task = todo.task;
  //     setTodoList(updatedTodos);
  //     setEditIndex(null);
  //   } else {
  //     setTodoList([...todoList, todo]);
  //   }

  //   setTodo({ task: '' });
  // };

  // const handleDelete = (index) => {
  //   const newTodos = todoList.filter((_, i) => i !== index);
  //   setTodoList(newTodos);
  // };

  // const handleEdit = (index) => {
  //   setTodo(todoList[index]);
  //   setEditIndex(index);
  // };

  // const handleDeleteAll = () => {
  //   setTodoList([]);
  // };
  // ======================================================================================
  // ======================================================================================
  // ======================================================================================
  // ======================================================================================

function App() {

  return (
    <>
    <TodoHome />
    </>
  );

}
export default App;
