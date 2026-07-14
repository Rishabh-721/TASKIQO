import React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <div className='Auth'>
    <div className='Intro'>
    <h1>Taskiqo</h1><br /><br />
    <p>Make your workflow faster and easier to understand</p>
    </div>
    <div className='FormContainer'>
      <Outlet />
    </div>
    </div>
  )
}

export default Auth
