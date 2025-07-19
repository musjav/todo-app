import { useState } from 'react';
import Input from './assets/components/input/input';
import styles from './App.module.css';

function App() {
  const [todo, setTodo] = useState({ task: '' });
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.task.trim()) return;

    if (editIndex !== null) {
      const updatedTodos = [...todoList];
      updatedTodos[editIndex].task = todo.task;
      setTodoList(updatedTodos);
      setEditIndex(null);
    } else {
      setTodoList([...todoList, todo]);
    }

    setTodo({ task: '' });
  };

  const handleDelete = (index) => {
    const newTodos = todoList.filter((_, i) => i !== index);
    setTodoList(newTodos);
  };

  const handleEdit = (index) => {
    setTodo(todoList[index]);
    setEditIndex(index);
  };

  const handleDeleteAll = () => {
    setTodoList([]);
  };

  return (
    <div className={styles.appContainer}>
      <h2 className={styles.heading}>React ToDo App</h2>
      <form className={styles.formArea} onSubmit={handleSubmit}>
        <Input
          valueKey={todo.task}
          Textvalue={(e) => setTodo({ ...todo, task: e.target.value })}
          label="Your Task"
        />
        <div className={styles.buttonsGroup}>
          <button type="submit" className={`${styles.button} ${styles.addBtn}`}>
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
          <button type="button" className={`${styles.button} ${styles.deleteAllBtn}`} onClick={handleDeleteAll}>
            Delete All
          </button>
        </div>
      </form>

      <ul className={styles.todoList}>
        {todoList.map((item, index) => (
          <li key={index} className={styles.todoItem}>
            <span className={styles.taskName}>{item.task}</span>
            <div className={styles.actions}>
              <button className={styles.editBtn} onClick={() => handleEdit(index)}>Edit</button>
              <button className={styles.deleteBtn} onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
