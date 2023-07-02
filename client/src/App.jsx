import React, {useEffect, useState} from 'react'
import abi from './contractJson/Donorbox.json';
import { ethers } from 'ethers';
import Donors from '../component/Donors';
import Donate from '../component/Donate';
import './App.css';



import toast, { Toaster } from 'react-hot-toast';



import donationbox from './donationbox.jpg';







const App = () => {
  
  const [state, setState] = useState({
    provider:null,
    signer:null,
    contract:null,
  })

  const [account, setAccount] = useState("Not Connected");



  useEffect(()=>{
    // creatting the template:
    const template = async ()=>{
      // 1. Get contract address which was deployed on ethereum blockchain and abi code:
      const contractAddress = "0xF2f4003D0eDd8D4f533411F9a1a533830BB0cd94";
      const contractABI = abi.abi;

      // console.log('Cntrac',contractABI);

      try{

        // connect Metamask 
        // 1. It will allow transaction and it internally connnected to infura which will used as connection to our app

        // metamask will inject the ethereum in our window:
        const {ethereum} = window;

        const account = await ethereum.request({
          method:"eth_requestAccounts"
        })

        window.ethereum.on("accountsChanged",()=>{
          window.location.reload()
        })


        setAccount(account);


        // provider : connection to blockchain with read operation
        // signer : write/change in the state of blockchain

        
        const provider = new ethers.providers.Web3Provider(ethereum);

        
        const signer= provider.getSigner();

        // instace;

        const contract = new ethers.Contract(
          contractAddress, // to get the place where the smart contract is deployed:
          contractABI, // to communcate with smart contact
          signer // for transaction
          );

          console.log(contract);


          setState({provider, signer,contract});

      }
      catch(error){
        console.log("Error Occured",error);
      }
    }
    template();
    
  },[])






  return (
    <div className='px-2' >
    <div className='image-box'>
        <img src={donationbox} className="img-fluid poster-img" alt=".."  />
    </div>

      <p style={{ marginTop: "10px", marginLeft: "5px" }}>
        <div className='connected-acc'>Connected Account - {account}</div>
      </p>
          <Donate state={state} />
          <Donors state={state} />
  </div>
  )
}


export default App;


