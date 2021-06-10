import React, { useState } from 'react'
import { Switch } from '@material-ui/core'
import userService from '../../services/users'

const UserUpdate = ({ selectedUser }) => {
  const [name, setName] = useState('')
  const [breed, setBreed] = useState('')
  const [isAdmin, setIsAdmin] = useState(selectedUser.isAdmin)

  const toggleChecked = () => {
    setIsAdmin((prev) => !prev)
  }

  const handleUserUpdate = async (event) => {
    event.preventDefault()
    try {
      const update = {
        name: name || selectedUser.name,
        breed: breed || selectedUser.breed,
        isAdmin: isAdmin
      }
      await userService.update(selectedUser.id, update)
      setName('')
      setBreed('')
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
      <form onSubmit={handleUserUpdate}>
        <div>
          Name &nbsp;
          <input
            type="text"
            value={name}
            name="Name"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Breed &nbsp;
          <input
            type="text"
            value={breed}
            name="Breed"
            onChange={({ target }) => setBreed(target.value)}
          />
        </div>
        <div>
          Admin &nbsp;
          <Switch checked={isAdmin} onChange={toggleChecked} color='primary'/>
        </div>
        <button type="submit">update</button>
      </form>
    </div>
  )
}

export default UserUpdate