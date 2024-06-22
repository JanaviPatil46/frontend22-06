import React from 'react'
import './proposals.css'
const Proposals = () => {
  return (
    <div className='proposals_els'>
      <div className='proposals-heading'>
     <p>Proposals & ELs</p>
      </div>
   
      <table style={{ marginTop: '20px',width:'100%'}}>
    <thead>
      <tr>
        <th>Name</th>

        <th>Stetus</th>
        <th>Date</th>
        <th>Signed</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>SNP-EN (US) Letter of Engagement – Financial Statements & Tax Services</td>
        <td>Signed</td>
        <td>Mar-11</td>
        <td>1/1</td>
      </tr>
      <tr>
        <td>SNP-EN (US) Letter of Engagement – Financial Statements & Tax Services</td>
        <td>Signed</td>
        <td>Mar-11</td>
        <td>1/1</td>
      </tr>
  
    </tbody>
  </table>
 
     
    </div>
  )
}

export default Proposals
