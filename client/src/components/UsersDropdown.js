import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import userService from '../services/users'

const UsersDropdown = () => {
  const [assignedUser, setAssignedUser] = useState('')
  const options = []

  useEffect(() => {
    userService.getAll().then(data => {
      data.map(user => {
        options.push({ value: user.username, label: user.username })
      })
    })
  })

  return (
    <div>
      Username &nbsp;
      <Select
        defaultValue={assignedUser}
        onChange={setAssignedUser}
        options={options}
      />
    </div>
  )
}

export default UsersDropdown