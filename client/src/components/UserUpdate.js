import React, { useState } from 'react'
import { DragSwitch } from 'react-dragswitch'
import 'react-dragswitch/dist/index.css'
import userService from '../services/users'

const UserUpdate = ({ selectedUser }) => {
  const [name, setName] = useState('')
  const [breed, setBreed] = useState('')
  const [isAdmin, setIsAdmin] = useState(selectedUser.isAdmin)

  const handleUserUpdate = async (event) => {
    event.preventDefault()
    try {
      const update = {
        name: name || selectedUser.name,
        breed: breed || selectedUser.breed,
        isAdmin: isAdmin || selectedUser.isAdmin
      }
      await userService.update(selectedUser.id, update)
      setName('')
      setBreed('')
      setIsAdmin(selectedUser.isAdmin)
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
          <DragSwitch checked={isAdmin} onChange={setIsAdmin}/>
        </div>
        <button type="submit">update</button>
      </form>
    </div>
  )
}

export default UserUpdate