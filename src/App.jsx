import "./App.css";
import React, { useState } from "react";
import { isEmpty, size } from "lodash";
import { nanoid } from "https://cdn.jsdelivr.net/npm/nanoid/nanoid.js";
import styles from "./index.module.css";
function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const addTasK = e => {
    e.preventDefault();
    if (isEmpty(task)) {
      console.log("Task empty");
      return;
    }
    const newTask = {
      id: nanoid(10),
      name: task,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const saveTask = e => {
    e.preventDefault();
    if (isEmpty(task)) {
      console.log("Task empty");
      return;
    }

    const editedTasks = tasks.map(item =>
      item.id === id ? { id, name: task } : item
    );
    setTasks(editedTasks);
    setEditMode(false);
    setTask("");
    setId("");
  };

  const deleteTasK = id => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };
  const editTask = theTask => {
    setTask(theTask.name);
    setEditMode(true);
    setId(theTask.id);
  };

  return (
    <>
      <div className='container mt-5'>
        <h1>Tareas</h1>
        <hr />
        <div className='row'>
          <div className='col-8'>
            <h4 className='text-center'>:Lista de tareas</h4>
            {size(tasks) === 0 ? (
              <h5 className='center'>Sin tareas</h5>
            ) : (
              <ul className='list-group'>
                {tasks.map(task => (
                  <li className='list-group-item' key={task.id}>
                    <span className='lead'>{task.name}</span>
                    <button
                      className='btn btn-danger btn-sm float-right mx-2'
                      onClick={() => deleteTasK(task.id)}
                    >
                      :Eliminar
                    </button>
                    <button
                      className='btn btn-warning btn-sm float-right'
                      onClick={() => editTask(task)}
                    >
                      :Editar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className='col-4'>
            <h4 className='text-center'>:Agregar tarea</h4>
            <form onSubmit={editMode ? saveTask : addTasK}>
              <input
                type='text'
                className='form-control mb-2'
                placeholder='Ingrese la tarea...'
                onChange={text => setTask(text.target.value)}
                value={task}
              />
              <button
                className={
                  editMode
                    ? "btn btn-warning btn-block"
                    : "btn btn-dark btn-block"
                }
                type='submit'
              >
                {editMode ? "Guardar" : "Agregar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
