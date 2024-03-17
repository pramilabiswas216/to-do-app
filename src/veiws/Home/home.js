import React, { useEffect, useState } from 'react'
import "./home.css";
import addIcon from "./add.png.png"
function home() {
     const [tasks, setTasks] = useState([
        "go to college",
        "icp c"

     ])
    return (
        <div>
            <h1 className='app-tittle'>ToDo App</h1>



            <div className='input-conatiner'>
                <input type='text' placeholder='Enter a task' className='task-input' />
                <img src={addIcon} alt='add' className='add-icon' />
            </div>
        </div>
    )
}


export default home
