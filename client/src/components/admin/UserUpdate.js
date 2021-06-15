import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch, TextField } from '@material-ui/core'
import userService from '../../services/users'

const UserUpdate = ({ selectedUser }) => {
  const [name, setName] = useState('')
  const [breed, setBreed] = useState('')
  const [isAdmin, setIsAdmin] = useState(selectedUser.isAdmin)
  const [open, setOpen] = useState(false)

  const handleDialogOpen = () => {
    setOpen(true)
  }
  const handleDialogClose = () => {
    setOpen(false)
    setName('')
    setBreed('')
  }

  const toggleChecked = () => {
    setIsAdmin((prev) => !prev)
  }

  const deleteUser = async (event, id, username) => {
    event.preventDefault()
    setOpen(false)
    if (window.confirm(`Delete user ${username} ?`)) {
      await userService.deleteUser(id)
      window.alert('Deleted successfully, refreshing page to see changes')
      window.location.reload()
    }
  }

  const handleUserUpdate = async (event) => {
    event.preventDefault()
    setOpen(false)
    try {
      const update = {
        name: name || selectedUser.name,
        breed: breed || selectedUser.breed,
        isAdmin: isAdmin
      }
      await userService.update(selectedUser.id, update)
      setIsAdmin(selectedUser.isAdmin)
      console.log(isAdmin)
      window.alert('Updated successfully, refreshing page to see changes')
      window.location.reload()
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <Button onClick={handleDialogOpen}>Edit</Button>
      <Dialog
        open={open}
        close={handleDialogClose}
        fullWidth
        scroll='paper'
      >
        <DialogTitle>Edit user '{selectedUser.name}'</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              variant='outlined'
              fullWidth
              name="Name"
              label="Name"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
            <TextField
              variant='outlined'
              fullWidth
              name="Breed"
              label="Breed"
              value={breed}
              onChange={({ target }) => setBreed(target.value)}
            />
            <div>
              Admin &nbsp;
              <Switch checked={isAdmin} onChange={toggleChecked} color='primary'/>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUserUpdate}>update</Button>
          <Button onClick={(event) => 
              deleteUser(event, selectedUser.id, selectedUser.username)}>delete</Button>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UserUpdate