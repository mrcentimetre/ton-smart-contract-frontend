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
    <div className="min-h-screen flex flex-col items-center justify-center font-['Poppins'] bg-gradient-to-r from-violet-600 to-indigo-600">
      <div className='p-5 max-w-[500px] w-full flex flex-col gap-[30px] items-center mx-auto text-center'>
      <TonConnectButton />
        <div className="text-2xl font-black">CentiXDoge</div>
        <img width="50%" height="auto" src="dog.png" alt="Logo"/>
      </div>
      <div>
      <div className='flex items-center justify-center flex-col w-full md:w-[10px] p-2.5 px-5 rounded-[40px] bg-white'>
          <b className=" text-gray-500">Account Balance</b>
          {contract_balance && (
            <div className="text-4xl m-3 font-bold">{fromNano(contract_balance)}</div>
          )}
          <div className="mb-3">
          <button onClick={copyToClipboard}>
          {contract_address?.slice(0, 30) + "..."}
          </button>
          {copySuccess && <div style={{ color: 'green' }}>{copySuccess}</div>}
        </div>
          <div className="flex justify-center justify-items-center">
          <div className = "pr-2"><img height="35" width="35" src="https://cdn.simpleicons.org/ton"/></div> 
          <div className="text-[25px] text-gray-500 font-medium">TON</div>
          </div>
        </div>
        <div className='w-full h-[120px] bg-blue-100 rounded-[30px] p-[5px] my-[10px]'>
        <div className="flex justify-center items-center my-[10px]">
        <div className="mr-[60px]">
        {connected && (
          <a
          className={`${connected ? 'Active' : 'Disabled'}`}
            onClick={() => {
              sendDeposit();
            }}
          >
          <img height="55" width="55" src="topup.png"/>
          </a>
        )}
          </div>
        <div className="ml-[50px]">
        {connected && (
          <a
          className={`${connected ? 'Active' : 'Disabled'}`}
            onClick={() => {
              sendWithdrawalRequest();
            }}
          >
          <img height="55" width="55" src="withdraw.png"/>
          </a>
        )}
        </div>
        </div >
        <div className="flex justify-center">
        <div className="pr-[20px] pl-[25px]"> TOP UP </div>
        <div className="ml-[90px] pr-2"> WITHDRAW </div>
        </div>
        </div>

        <div className='w-full mb-5 p-2.5 px-5 rounded-xl bg-white dark:bg-[var(--tg-theme-bg-color)] dark:filter-brightness-[165%]'>
          <b>Counter Value</b>: {counter_value ?? "Loading..."}
          <div>
          <b>Device</b>: {WebApp.platform}
        </div>
        <div className="flex flex-col justify-center items-center">
        {connected && (
          <a
          className={`flex justify-center items-center my-3 rounded-[50px] w-4/5 h-[40px] text-center text-white font-semibold bg-[#0098EA] ${connected ? 'Active' : 'Disabled'}`}
            onClick={() => {
              sendIncrement();
            }}
          >
        Increment Counter Value
        </a>
        )}
        <a
          className={`flex justify-center items-center my-3 rounded-[50px] w-4/5 h-[40px] text-center text-white font-semibold bg-[#0098EA] ${connected ? 'Active' : 'Disabled'}`}
          onClick={() => {
            showAlert();
          }}
        >
        Say Hi 👋
        </a>
        </div>
        </div>
      </div>
    </div>
    
  );
};
