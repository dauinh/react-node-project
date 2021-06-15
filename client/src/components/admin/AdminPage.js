import React, { useState, useEffect } from 'react'
import UserUpdate from './UserUpdate'
import TaskCreate from './TaskCreate'
import TaskAdmin from './TaskAdmin'
import userService from '../../services/users'
import taskService from '../../services/tasks'

import { Link, useHistory, useLocation } from 'react-router-dom'

const AdminPage = () => {
  const [userList, setUserList] = useState([])
  const [tasks, setTasks] = useState([])
  const options = []

  useEffect(() => {
    taskService.getAll().then(tasks => {
      setTasks(tasks)
    })
    userService.getAll().then(users => {
      setUserList(users)
    })
  }, [])
  
  userList.map(user => {    // set options to list of users
    options.push({value: user, label: `${user.name} (${user.username})`})
  })
  
  if (!tasks) return null    // handle null value in first render

  return (
    <div className='page-box'>
      <h1>Welcome to MyDoggo</h1>
      <h2>Task Board</h2>
      {tasks.map(task =>
        <TaskAdmin key={task.id} task={task} options={options}/>
      )}

      <h2>Create Task</h2>
      <TaskCreate options={options}/>

      <h2>User Board</h2>
      {userList.map(selectedUser => 
        <div>
          <p key={selectedUser.id}>
            Name: {selectedUser.name} <br></br>
            Username: {selectedUser.username} <br></br>
            Breed: {selectedUser.breed} <br></br>
            Admin: {selectedUser.isAdmin.toString()} <br></br>
          </p>
          <UserUpdate selectedUser={selectedUser}/> <br></br>
        </div>
      )}
    </div>
  )
}

export default AdminPage