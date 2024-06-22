import React from 'react'
import { IoArrowBack } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './membersdetails.css'
const ActiveMembersDetails = () => {
  return (

    <>
      <div className='active-members-header'>
        <div className='back-icon'>
          <Link to='/teams/teammembers/active'><IoArrowBack /></Link>
          <h3>User Name</h3>
        </div>

        <div>
          <p>Login as Employee</p>
        </div>

      </div>


    </>


  )
}

export default ActiveMembersDetails