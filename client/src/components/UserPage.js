import React, { useState, useEffect } from 'react'
import TaskUser from './TaskUser'
import { Button } from '@material-ui/core'

const UserPage = ({ user, logOut }) => {
  const [noti, setNoti] = useState('Welcome to general task board')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setTasks(user.ToDo)
  })

  if (!user) { console.log('flag') }

  return (
    <div className='center-screen'>
      <h2>Task Board</h2>
      <h3>{noti}</h3>
      <p>{user.name} is logged in &nbsp;
        <Button 
          onClick={logOut}
          variant='contained'
          color='primary'
        >
          log out
        </Button>
      </p>
      {tasks.map(task =>
        <TaskUser key={task.id} task={task}/>
      )}
    </div>
  )
}

export default UserPage