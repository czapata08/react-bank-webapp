import { useAuth } from "../context/user.context";
import { useState, useEffect } from "react";
import { set } from "mongoose";

export default function Deposit() {
  const [transferAmount, setTransfer] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [recieverId, setRecieverID] = useState("");
  var { user, transferHandler } = useAuth(); //deleted depositHandler
  console.log(user.accounts.balance);

  const senderId = user._id;
  console.log("sender id " + senderId);

  if (transferAmount > user.accounts.balance)
    return alert("amount cannot be greater than balance");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    transferHandler(senderId, recieverId, transferAmount)
      .then((res) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
    setTransfer("");
  };

  return (
    <>
      {user && (
        <>
          {loading ? (
            <h1>Proccesing</h1>
          ) : (
            <>
              <h3>{user.accounts.name}</h3>
              <p>{user.accounts.accountNumber}</p>
              <form onSubmit={submit}>
                <input
                  type='number'
                  placeholder='$ transfer amount'
                  onChange={(e) => setTransfer(Number(e.target.value))}
                  value={transferAmount}
                />
                <input
                  placeholder='Reciever Acc ID'
                  onChange={(e) => setRecieverID(e.target.value)}
                  value={recieverId}></input>
                <button>{loading ? "Loading... " : "Submit"}</button>
                <br />
              </form>
            </>
          )}
        </>
      )}
    </>
  );
}
