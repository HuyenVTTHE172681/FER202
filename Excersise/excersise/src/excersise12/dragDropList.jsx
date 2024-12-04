import { useState } from 'react';
import './dragDrop.css';
function Excersise_127() {
  const tasks = ['🍰 Cake', '🍩 Donut', '🍎 Apple', '🍕 Pizza'];
  const [toDo, setToDo] = useState(tasks);
  const [done, setDone] = useState([]);
  const [draggingItem, setDraggingItem] = useState(null);
  const [draggingFrom, setDraggingFrom] = useState(null);
  const [newTask, setNewTask] = useState('');

  const handleDragStart = (task, from) => (event) => {
    setDraggingItem(task);
    setDraggingFrom(from);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (index, targetList) => {
    if (draggingFrom === targetList) {
      const list = targetList === 'toDo' ? [...toDo] : [...done];
      const oldIndex = list.indexOf(draggingItem);
      if (oldIndex !== index) {
        list.splice(oldIndex, 1); // Remove item from old position
        list.splice(index, 0, draggingItem); // Insert item at new position

        targetList === 'toDo' ? setToDo(list) : setDone(list);
      }
    }
  };

  const handleDrop = (targetList) => {
    if (draggingFrom !== targetList) {
      // Case 1: Moving between lists
      if (draggingFrom === 'toDo') {
        setToDo((prev) => prev.filter((item) => item !== draggingItem));
        setDone((prev) => [...prev, draggingItem]);
      } else if (draggingFrom === 'done') {
        setDone((prev) => prev.filter((item) => item !== draggingItem));
        setToDo((prev) => [...prev, draggingItem]);
      }
    }
    setDraggingItem(null);
    setDraggingFrom(null);
  };

  const handleAdd = () => {
    if (newTask.trim() !== '') {
      setToDo((prev) => [...prev, newTask]);
      setNewTask(''); // Clear the input field
    }
  };

  return (
    <>
      <div className='add-task'>
        <input
          type='text'
          value={newTask}
          placeholder='Add a new task'
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className='add-button' type='button' onClick={handleAdd}>
          Add
        </button>
      </div>
      <div className='list-card'>
        <div
          className='card list-card-todo'
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('toDo')}
        >
          <b>Todo</b>
          <div className='task-list'>
            {toDo.map((task, index) => (
              <div
                className='task'
                draggable
                onDragStart={handleDragStart(task, 'toDo')}
                onDragEnter={() => handleDragEnter(index, 'toDo')}
                key={index}
              >
                {task}
                <button
                  className='delete-button'
                  onClick={() =>
                    setToDo((prev) => prev.filter((item) => item !== task))
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <div
          className='card list-card-done'
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('done')}
        >
          <b>Done</b>
          <div className='task-list'>
            {done.map((task, index) => (
              <div
                className='task'
                draggable
                onDragStart={handleDragStart(task, 'done')}
                onDragEnter={() => handleDragEnter(index, 'done')}
                key={index}
              >
                {task}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Excersise_127;
