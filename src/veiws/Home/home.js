import React, { useEffect, useState } from 'react'
import './home.css';
import addIccon from "./add.png.png"
import TaskCard from '../../component/TaskCard/taskCard';
function Home() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [error, setError] = useState('');
    const [category, setCategory] = useState('');

    const saveTasksToLocalStorage = (taskToSave)=>{
        localStorage.setItem('tasks',JSON.stringify(taskToSave));
    }

    const validateNewTasks = ()=>{
        if (newTask === '') {
            setError(`Please enter a task`)
            return false;
        }
        else if (newTask.length < 5) {
            setError(`task shou`)
            return false
        }
        else {
            setError('')
            return true;
        }
    }

    const AddTask = () => {
        const validationResult = validateNewTasks();
       if (!validationResult) return;

        const newTasks = [
            {
                tittle: newTask,
                category:category,
            },
             ...tasks
            ]
        saveTasksToLocalStorage(newTasks);

        setTasks(newTask)
        setNewTask('')
    }


   

    const deleteTask = (index)=>{
       const newTasks = tasks;
       newTasks.splice(index, 1);
       setTasks([...newTasks]);

       saveTasksToLocalStorage(newTasks);
    }

     useEffect(()=>{
        if(tasks.length ===0){
            return
         }
        saveTasksToLocalStorage(tasks);
    }, [tasks]);

    useEffect(()=>{
        const tasks = localStorage.getItem('tasks');
        if(tasks){
            setTasks(JSON.parse(tasks));
        }
    },[])

    return (
        <div>
            <h1 className='app-tittle'>ToDo App</h1>



            <div className='tasks-container'>
                {
                    tasks.map((task, i) => {
                        // console.log(`${task}
                        const {tittle,category} = task;

                       return( <TaskCard 
                        tittle={tittle}
                        category={category}
                        key={i} 
                        delFunction={deleteTask}
                        index={i}
                        />
                       )
                    }
                    )
                }
            </div>

            <p className='error-message'>{error}</p>

            <div className='input-container'>
                <input type='text'
                    placeholder='add a new task'
                    className='task-input'
                    value={newTask}
                    onChange={(e) => {
                        setNewTask(e.target.value)
                    }}
                />

                <select className='category-select'
                value={category}
                onChange={(e)=>{
                    setCategory(e.target.value)
                }}>
                
                    <option value={''}>Category</option>
                    <option value={'📖Study'}>📖Study</option>
                    <option value={'🏡Home'}>🏡Home</option>
                    <option value={'🏫College'}>🏫College</option>
                    <option value={'🛍️Market'}>🛍️Market</option>
                </select>

                <img src={addIccon}
                    alt='add'
                    className='add-icon'
                    onClick={AddTask}
                />

            </div>
        </div>
    )
}

export default Home
