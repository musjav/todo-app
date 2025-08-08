import { useState } from 'react';
import Input from '../assets/components/input/input';
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from '../Config/firebase';

import styles from '../App.module.css';



function TodoHome() {
  const [todo, setTodo] = useState({ task: '' });
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [showFetched, setShowFetched] = useState(false); // toggle between views


  const handleSubmit = async (e) => {
    e.preventDefault(); // Always at the top

    if (!todo.task.trim()) {
      return alert("Please enter a task");
    }

    try {
      // if (editIndex !== null) {
      //   // Handle edit
      //   const updatedTodos = [...todoList];
      //   updatedTodos[editIndex].task = todo.task;

      //   setTodoList(updatedTodos);
      //   setEditIndex(null);
      //   setTodo({ task: '' });

      //   // Optional: Update Firestore document if you saved them with IDs
      //   // await updateDoc(doc(db, "TODOS", updatedTodos[editIndex].id), {
      //   //   task: todo.task
      //   // });

      // }
      if (editIndex !== null) {
        const updatedTodos = [...todoList];
        const taskToUpdate = updatedTodos[editIndex];

        taskToUpdate.task = todo.task;
        setTodoList(updatedTodos);

        // ✅ Update in Firestore
        await updateDoc(doc(db, "TODOS", taskToUpdate.id), {
          task: todo.task
        });

        setEditIndex(null);
        setTodo({ task: '' });
      }

      else {
        // Create a unique ID
        const id = Math.round(Math.random() * 238743028).toString();
        const userObj = { ...todo, id }; // Include ID in object

        // Save to Firestore
        await setDoc(doc(db, "TODOS", id), userObj);

        // Update local state
        setTodoList([...todoList, userObj]);
        setTodo({ task: '' });

        console.log("New task added:", userObj);


      }

    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "TODOS"));
      const todos = [];
      querySnapshot.forEach((doc) => {
        todos.push({ id: doc.id, ...doc.data() });
      });
      setTodoList(todos);      // 🔁 Now using todoList only
      setShowFetched(true);    // Show fetched data
      setTodo({ task: '' });
      console.log("Fetched data:", todos);
      alert("Data fetched successfully");
    } catch (error) {
      console.log("Error getting data:", error);
    }
  };

  const hideData = () => {
    setTodoList([]);        // Clear fetched data
    setShowFetched(false);  // Resume showing only added tasks
    setTodo({ task: '' });  // Reset input field
    console.log("Data hidden");
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "TODOS", id));
      setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
      setTodo({ task: '' });
      console.log("Deleted ID:", id);
      alert("Task deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed");
    }
  };

  const handleEditClick = (index) => {
    setTodo(todoList[index]);     // Load task in input
    setEditIndex(index);          // Track which task to update
  };

  const handleDeleteAll = async () => {
    try {
      // Get all todos in the collection
      const todos = await getDocs(collection(db, "TODOS"));

      // Convert to array of promises and delete
      const deletePromises = todos.docs.map((todoDoc) =>
        deleteDoc(doc(db, "TODOS", todoDoc.id))
      );

      // Wait until all are deleted
      await Promise.all(deletePromises);

      console.log("All todos deleted.");
      window.location.reload();
      alert("All tasks deleted successfully");
      setTodoList([]); // Clear local state
    } catch (error) {
      console.error("Error deleting todos:", error);
    }
  };

  return (

    <div className={styles.appContainer}>
      <h2 className={styles.heading}>React ToDo App</h2>
      <form className={styles.formArea} >
        <Input
          valueKey={todo.task}
          placeholder="Enter your task"
          type="text"
          name="task"
          required
          onChange={(e) => setName(e.target.value)}
          Textvalue={(e) => setTodo({ ...todo, task: e.target.value })}
          label="Your Task"
        />
        <div className={styles.buttonsGroup}>
          <button onClick={handleSubmit} type="submit" className={`${styles.button} ${styles.addBtn}`}>
            {editIndex !== null ? 'Update' : 'Add'}


          </button>
          <button type="button" className={`${styles.button} ${styles.deleteAllBtn}`} onClick={handleDeleteAll}>
            Delete Data Base
          </button>
          {!showFetched ? (
            <button type="button" className={styles.editBtn} onClick={getData}>
              Show All Data
            </button>
          ) : (
            <button type="button" className={styles.editBtn} onClick={hideData}>
              Hide Data
            </button>
          )}
        </div>

      </form>



      {showFetched ? (
        <div>
          <h3>Fetched Tasks:</h3>
          <ul className={styles.todoList}>
            {todoList.map((todo, index) => (
              <li key={todo.id} className={styles.todoItem}>
                <span className={styles.taskName}>{todo.task}</span>
                <div className={styles.actions}>
                  <button className={styles.editBtn} onClick={() => handleDelete(todo.id)}>Delete</button>
                  <button className={styles.editBtn} onClick={() => handleEditClick(index)}>Edit</button>

                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className={styles.todoList}>
          {todoList.map((todo, index) => (
            <li key={todo.id} className={styles.todoItem}>
              <span className={styles.taskName}>{todo.task}</span>
              <div className={styles.actions}>
                <button className={styles.editBtn} onClick={() => handleDelete(todo.id)}>Delete</button>
                <button className={styles.editBtn} onClick={() => handleEditClick(index)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoHome;
// export default App;