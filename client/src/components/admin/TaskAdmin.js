import React, { useState } from 'react'
import Select from 'react-select'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import taskService from '../../services/tasks'

const TaskAdmin = ({ task, options }) => {
  const [assignedUser, setAssignedUser] = useState('')
  const [updatedTask, setUpdatedTask] = useState('')
  const [open, setOpen] = useState(false)

  const handleDialogOpen = () => {
    setOpen(true)
  }
  const handleDialogClose = () => {
    setOpen(false)
    setUpdatedTask('')
  }

  const deleteTask = async (event, id, task) => {
    event.preventDefault()
    if (window.confirm(`Delete task ${task} ?`)) {
      await taskService.deleteOne(id)
      setOpen(false)
      window.alert('Deleted successfully, refreshing page to see changes')
      window.location.reload()
    }
  }
  const handleTaskUpdate = async (event) => {
    event.preventDefault()
    console.log('updating task')
    await taskService.update(task.id, { item: updatedTask } )
    setUpdatedTask('')
    setOpen(false)
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

  const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'red' : 'blue',
      padding: 20,
    })
  }

  return (
    <div>
      ✏️ {task.item}
      <Button onClick={handleDialogOpen}>Edit</Button>
      <Dialog
        open={open}
        close={handleDialogClose}
        fullWidth
        scroll='paper'
      >
        <DialogTitle>Edit task '{task.item}'</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter new task in the box and hit UPDATE <br></br>
            DELETE to delete task and associated users <br></br>
            CANCEL to quit editing
          </DialogContentText>
          <TextField
            multiline
            fullWidth
            variant='outlined'
            name='Task'
            value={updatedTask}
            onChange={({ target }) => {setUpdatedTask(target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTaskUpdate}>update</Button>
          <Button onClick={(event) =>
            deleteTask(event, task.id, task.item)}>delete
          </Button>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <div className='select-box'>
        assign to &nbsp;
        <Select
          onChange={setAssignedUser}
          options={options}
          styles={selectStyles}
          className='select'
        />
        <Button onClick={(event) => 
          handleUserAdd(event, task.id)}>add</Button>
      </div>
      {task.Author.map(user => (
        <div key={user.id}>🐶 {user.name}</div>
      ))}
      <br></br>
    </div>  
  )
}

export default TaskAdmin