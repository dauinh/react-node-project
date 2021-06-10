import React, { useState, useEffect } from 'react'
import TaskUser from './TaskUser'

const UserPage = ({ user }) => {
  const [noti, setNoti] = useState('Welcome to general task board')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setTasks(user.ToDo)
  }, [setTasks, user.ToDo])

  return (
    <div className='center-screen'>
      <h2>Task Board</h2>
      <h3>{noti}</h3>
      {tasks.map(task =>
        <TaskUser key={task.id} task={task}/>
      )}
    </div>
  )
}

export default UserPage