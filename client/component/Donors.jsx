/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'

const Donors = ({state}) => {

  const [donors, setDonors] = useState([]);

  const {contract} = state;

  useEffect(()=>{

    const donorMessage = async()=>{
      const mydonors = await contract.getDonors();
      // console.log(mydonors);
      setDonors(mydonors);

    }

    contract && donorMessage();

  },[contract])




  return (
    <div className='donors-box'>
      <h2>Donors</h2>
      {donors.map((donor, index) => (
        <div key={index} className="donor">
          <p className="donor-name">Name : {donor.name}</p>
          <p className="donor-message">Message : {donor.message}</p>
          <p>{new Date(donor.timestamp * 1000).toLocaleString()}</p>
          <p className="donor-from">From : {donor.from}</p>
        </div>
      ))}
    </div>
  )
}

export default Donors;
