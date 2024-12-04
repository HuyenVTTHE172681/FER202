import { useState } from 'react';
import './counter.css';

function Excersise_124() {
  const [todo, setTodo] = useState([]); // Stores list of todo items
  const [work, setWork] = useState(''); // Temporary input for new task

  const handleAdd = () => {
    const newTaskId = work.replace(/\s/g, '');

    if (todo.some((item) => item.id === newTaskId)) {
      alert('Todo already exists');
    } else {
      setTodo((prev) => [...prev, { id: newTaskId, name: work }]);
      setWork(''); // Clear the input field
    }
  };

  const handleDelete = (id) => {
    setTodo((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className='todo-section'>
        <div className='todo-input'>
          <input
            type='text'
            value={work}
            placeholder='Please input a Task'
            onChange={(e) => setWork(e.target.value)}
          />
          <button type='button' onClick={handleAdd}>
            Add Todo
          </button>
        </div>
        <div className='todo-list'>
          <h2>Todo List</h2>
          {todo.map((item, index) => (
            <div key={item.id}>
              <b className='todo-item'>{index + 1}. {item.name}</b>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Excersise_124;
