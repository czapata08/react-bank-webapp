import { useAuth } from "../context/user.context";
import { useState, useEffect } from "react";
import { set } from "mongoose";
import { useRouter } from "next/router";
import { Form, Input, Button, Card } from "reactstrap";

export default function Deposit() {
  const [withdraw, setWithdraw] = useState("");
  const [loading, setLoading] = useState(false);
  var { user, withdrawHandler } = useAuth(); //deleted depositHandler
  console.log(user.accounts.balance);

  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    withdrawHandler(user._id, withdraw)
      .then((res) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });

    setWithdraw("");
  };

  return (
    <>
      <p className='fw-light, my-2'>Withdraw</p>
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
                  placeholder='$ Withdraw Amount'
                  onChange={(e) => setWithdraw(Number(e.target.value))}
                  value={withdraw}
                />
                <Button className='my-2'>
                  {loading ? "Loading... " : "Submit"}
                </Button>
              </Form>
            </div>
          )}
        </>
      )}
    </>
  );
}
