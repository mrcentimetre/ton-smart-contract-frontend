import "./App.css";
import { useState } from 'react';
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "@ton/core";
import WebApp from "@twa-dev/sdk";

export default function App() {
  const {
    contract_address,
    counter_value,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest,
  } = useMainContract();

  const contractAddress = contract_address;
  

  const [copySuccess, setCopySuccess] = useState('');
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress ?? '');
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy text');
    }
  };

  const { connected } = useTonConnect();

  const showAlert = () => {
    WebApp.showAlert("Hey there!");
  };

  // Preview of Website
  return (
    <div className="min-h-full flex flex-col items-center justify-center font-['Poppins'] bg-gradient-to-r from-violet-600 to-indigo-600">
      <div className='p-5 max-w-[500px] flex flex-col gap-[30px] items-center mx-auto text-center'>
        <div className="text-2xl font-black">CentiXDoge</div>
        <img width="50%" height="auto" src="dog.png" alt="Logo"/>
      </div>
      <div>
      <div className='flex items-center justify-center flex-col w-full p-2.5 px-5 rounded-lg bg-white'>
          <b className=" text-gray-500">Account Balance</b>
          {contract_balance && (
            <div className="text-4xl m-3 font-bold">{fromNano(contract_balance)}</div>
          )}
          <div className="flex justify-center justify-items-center">
          <div className = "pr-2"><img height="35" width="35" src="https://cdn.simpleicons.org/ton"/></div> 
          <div className="text-[25px] text-gray-500 font-medium">TON</div>
          </div>
        </div>
        <div className='w-full h-[120px] bg-blue-100 rounded-[20px] p-[10px] my-[10px]'>
        <div className="flex justify-center">
        <div className="mr-[50px] mt-[10px]"><img height="55" width="55" src="topup.png"/></div>
        <div className="ml-[50px] mt-[10px]"><img height="55" width="55" src="withdraw.png"/></div>
        </div >
        <div className="flex justify-center">
        <div className="pr-[10px] pl-[25px] mt-[10px]"> TOP UP </div>
        <div className="ml-[80px] pr-2 mt-[10px]"> WITHDRAW </div>
        </div>
        </div>
        <div className="text-red-900 text-xl">
          <b>{WebApp.platform}</b>
          <b>Our contract Address</b>
          <div className="text-red-900">{contract_address?.slice(0, 30) + "..."}</div>
        </div>
        <div>
          <button onClick={copyToClipboard}>
          {contract_address?.slice(0, 30) + "..."}
          </button>
          {copySuccess && <div style={{ color: 'green' }}>{copySuccess}</div>}
        </div>
        <TonConnectButton />
        

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>

        <a
          className={`Button ${connected ? 'Active' : 'Disabled'}`}
          onClick={() => {
            showAlert();
          }}
        >
          Show Alert
        </a>

        <br />

        {connected && (
          <a
          className={`Button ${connected ? 'Active' : 'Disabled'}`}
            onClick={() => {
              sendIncrement();
            }}
          >
            Increment by 5
          </a>
        )}

        <br />

        {connected && (
          <a
          className={`Button ${connected ? 'Active' : 'Disabled'}`}
            onClick={() => {
              sendDeposit();
            }}
          >
            Request deposit of 1 TON
          </a>
        )}

        <br />

        {connected && (
          <a
          className={`Button ${connected ? 'Active' : 'Disabled'}`}
            onClick={() => {
              sendWithdrawalRequest();
            }}
          >
            Request 0.7 TON withdrawal
          </a>
        )}
      </div>
    </div>
    
  );
};
