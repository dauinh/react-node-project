import React, { useState } from 'react'
import Select from 'react-select'
import taskService from '../services/tasks'

const TaskAdmin = ({ task, options }) => {
  const [assignedUser, setAssignedUser] = useState('')
  const [updatedTask, setUpdatedTask] = useState('')

  const deleteTask = async (event, id, task) => {
    event.preventDefault()
    if (window.confirm(`Delete task ${task} ?`)) {
      await taskService.deleteOne(id)
      window.alert('Deleted successfully, refreshing page to see changes')
      window.location.reload()
    }
  }
  const handleTaskUpdate = async (event) => {
    event.preventDefault()
    console.log('updating task')
    await taskService.update(task.id, { item: updatedTask } )
    setUpdatedTask('')
    window.alert('Updated task successfully, refreshing page to see changes')
    window.location.reload()
  }
  const handleUserAdd = async (event, id) => {
    event.preventDefault()
    console.log(`adding ${assignedUser.label} to task`)
    const userId = assignedUser.value.id
    await taskService.addUser(id, userId)
    window.alert('Added user successfully, refreshing page to see changes')
    window.location.reload()
  }

  return (
    <div>
      ✏️ {task.item}
      <div>
        <input
          type="text"
          name="Task"
          value={updatedTask}
          onChange={({ target }) => {setUpdatedTask(target.value)}}
        /> 
        <button onClick={handleTaskUpdate}>update</button>
        <button onClick={(event) =>
          deleteTask(event, task.id, task.item)}>delete</button>
      </div>
      {task.Author.map(user => (
        <div key={user.id}>🐶 {user.name}</div>
      ))}
      <div>
        Username &nbsp;
        <Select
          defaultValue={assignedUser}
          onChange={setAssignedUser}
          options={options}
        />
        <button onClick={(event) => 
          handleUserAdd(event, task.id)}>add</button>
      </div>
      <br></br>
    </div>  
  )
}

export default TaskAdmin