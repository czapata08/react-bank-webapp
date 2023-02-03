import { useAuth } from "../context/user.context";
import { useState, useEffect } from "react";
import { set } from "mongoose";
import { Form, Input, Button, Card } from "reactstrap";

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
      <p className='fw-light, my-2'>Transfer</p>
      {user && (
        <>
          {loading ? (
            <h1>Proccesing</h1>
          ) : (
            <div className='p-3, my-5'>
              <h4 className='display-9'>{user.accounts.name}</h4>
              <p>Account# {user.accounts.accountNumber}</p>
              <Form onSubmit={submit}>
                <Input
                  type='number'
                  placeholder='$ transfer amount'
                  onChange={(e) => setTransfer(Number(e.target.value))}
                  value={transferAmount}
                />
                <Input
                  placeholder='Reciever Acc ID'
                  onChange={(e) => setRecieverID(e.target.value)}
                  value={recieverId}></Input>
                <Button className='my-2'>
                  {loading ? "Loading... " : "Submit"}
                </Button>
                <br />
              </Form>
            </div>
          )}
        </>
      )}
    </>
  );
}
