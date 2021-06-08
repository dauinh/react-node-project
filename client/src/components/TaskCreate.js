import React, { useState } from 'react'
import Select from 'react-select'
import userService from '../services/users'
import taskService from '../services/tasks'

const TaskCreate = ({ options }) => {
  const [newTask, setNewTask] = useState('')
  const [assignedUser, setAssignedUser] = useState('')

  const handleTaskCreate = async (event) => {
    event.preventDefault()
    console.log('creating new task')
    try {
      const user = assignedUser.value
      const task = {
        item: newTask
      }
      await taskService.create(user.id, task)
      setNewTask('')
      setAssignedUser('')
      window.alert('Created new task successfully, refreshing page to see changes')
      window.location.reload()
    } catch (exception) {
      console.log(exception)
    }
  }
  return (
    <form onSubmit={handleTaskCreate}>
      <div>
        Task &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <input
          type="text"
          name="Task"
          value={newTask}
          onChange={({ target }) => {setNewTask(target.value)}}
        />
      </div>
      <div>
        Username &nbsp;
        <Select
          defaultValue={assignedUser}
          onChange={setAssignedUser}
          options={options}
        />
      </div>
      <button type="submit">assign</button>
    </form>
  )
}

export default TaskCreate