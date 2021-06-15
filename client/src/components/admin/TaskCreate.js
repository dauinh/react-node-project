import React, { useState } from 'react'
import Select from 'react-select'
import { Button, TextField } from '@material-ui/core'
import taskService from '../../services/tasks'

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
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        multiline
        label="Task"
        name="task"
        value={newTask}
        onChange={({ target }) => {setNewTask(target.value)}}
      />
      <div className='select-box'>
        assign to &nbsp;
        <Select
          onChange={setAssignedUser}
          options={options}
          className='select'
        /> &nbsp;
        <Button type="submit">assign</Button>
      </div>
    </form>
  )
}

export default TaskCreate