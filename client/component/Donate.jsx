/* eslint-disable react/prop-types */
import { ethers } from "ethers";
import { useState } from "react";


import toast from 'react-hot-toast'



const Donate = ({state}) => {



    const [data, setData] = useState({
        name:"",
        message:"",
        donation:'',
    })


    const handleChange = (e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value,
        })
    }


    const handleSubmit = async (e)=>{

        e.preventDefault();
        const {contract} = state; //  contract instace:


        // console.log(contract, data);

        const amount = {value: ethers.utils.parseEther(`${data.donation}`)};



        try{
            const transaction = await contract.donateUs(data.name, data.message, amount);
            
            await transaction.wait();
            // console.log("Transaction Successful");

            toast.success(`Thanks ${data.name} for your Donation`)

            setTimeout(() => {
                window.location.reload();
            }, 3000);


        }
        catch(error){
            // console.log(error, "Transaction failed");
            toast.success(`Donation Transaction Failed`)

        }



    }



  return (
    <>
<div className="form-container">
  <form onSubmit={handleSubmit} >
    <div className="form-group">
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={data.name} onChange={handleChange} name="name" placeholder="Your name..." />
    </div>
    <div className="form-group">
      <label htmlFor="message">Message:</label>
      <textarea name="message" value={data.message} onChange={handleChange}></textarea>
    </div>
    <div className="form-group">
      <label htmlFor="donation">Donation Amount :</label>
      <p>Your Donation will be converted to ethers</p>
      <input type="text" id="donation" value={data.donation} onChange={handleChange} name="donation" placeholder="Pay" />
    </div>
    <button type="submit" className='my-button'>Pay</button>
  </form>
</div>

    </>
  )
}

export default Donate;
