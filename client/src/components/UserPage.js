import React, { useState, useEffect } from 'react'
import TaskUser from './TaskUser'

const UserPage = ({ user, logOut }) => {
  const [noti, setNoti] = useState('Welcome to general task board')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setTasks(user.ToDo)
  })
  // handle null value for first render
  if (!user) return null

  return (
    <div>
      <h2>Task Board</h2>
      <h3>{noti}</h3>
      <p>{user.name} is logged in &nbsp;
        <button onClick={logOut}>log out</button>
      </p>
      {tasks.map(task =>
        <TaskUser key={task.id} task={task}/>
      )}
    </div>
  )
}

export default UserPage