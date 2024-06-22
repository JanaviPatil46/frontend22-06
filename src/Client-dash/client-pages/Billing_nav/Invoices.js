import React, { useState } from 'react';
import { CiCreditCard2 } from "react-icons/ci";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

const Invoices = () => {
  const [showTable, setShowTable] = useState(false);

  const toggleTableVisibility = () => {
    setShowTable(prevShowTable => !prevShowTable);
  };

  return (
    <div className='balance'>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', borderBottom: '1px solid #cbd5e1' }} className='outstanding_Credits'>
        <div className='outstanding_balance' style={{ border: '2px dashed #94a3b8', marginTop: '20px', padding: '10 15px', borderRadius: '4px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
            <CiCreditCard2 style={{ width: '56px', height: '56px' }} className='card-icon' />
            <p style={{ color: '#697991', fontSize: '14px', fontWeight: '300' }}>Outstanding Balance</p>
          </div>
          <span style={{ padding: '10 0 5px', fontSize: '36px', fontWeight: '400', color: "#1976d3", marginLeft: '55px' }}>$1.00</span>
        </div>

        <div className='credits_available' style={{ border: '2px dashed #94a3b8', marginTop: '20px', padding: '10 20px', borderRadius: '4px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
            <CiCreditCard2 style={{ width: '56px', height: '56px' }} className='card-icon' />
            <p style={{ color: '#697991', fontSize: '14px', fontWeight: '300', margin: '10px' }}>Credits Available</p>
          </div>
          <span style={{ padding: '10 0 5px', fontSize: '36px', fontWeight: '400', color: "#24c875", marginLeft: '55px' }}>$0.00</span>
        </div>
      </div>
      <div className='2024' >
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {showTable ? (
            <>
              <FiMinusCircle
                style={{ fontSize: '20px', color: '#1976d3' }}
                onClick={toggleTableVisibility}
              />
              <span>2024</span>
              <div style={{marginLeft: 'auto'}}>
                <p>$1.00</p>
              </div></>
          ) : (
            <>
              <FiPlusCircle
                style={{ fontSize: '20px', color: '#1976d3' }}
                onClick={toggleTableVisibility}
              />
              <span>2024</span>
              <div style={{marginLeft: 'auto'}}>
                <p>$1.00</p>
              </div>
            </>
          )}
        </div>

        {showTable && (
          <div>
            <table style={{ marginTop: '20px', width: '100%' }}>
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Date Posted</th>
                  <th>Date Paid</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2413</td>
                  <td>Overdue</td>
                  <td>$1.00</td>
                  <td>2023 Individual Tax Returns</td>
                  <td>Feb-15</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoices;
