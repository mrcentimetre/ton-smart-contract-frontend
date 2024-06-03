import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "@ton/core";
import WebApp from "@twa-dev/sdk";

function App() {
  const {
    contract_address,
    counter_value,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest,
  } = useMainContract();

  const { connected } = useTonConnect();

  const showAlert = () => {
    WebApp.showAlert("Hey there!");
  };

  return (
    <div className='App'>
      <div className='Container'>
        <TonConnectButton />
      <div>
        <div className='Card'>
          <b>{WebApp.platform}</b>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address?.slice(0, 30) + "..."}</div>
        </div>

        <div className='Card'>
          <b>Our contract Balance</b>
          {contract_balance && (
            <div className='Hint'>{fromNano(contract_balance)}</div>
          )}
        </div>

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
    </div>
  );
}

export default App;
