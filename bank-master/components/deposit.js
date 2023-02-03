import { useAuth } from "../context/user.context";
import { useState, useEffect } from "react";
import { set } from "mongoose";
import { Form, Input, Button, Card } from "reactstrap";

export default function Deposit(props) {
  const [deposit, setDeposit] = useState("");
  const [loading, setLoading] = useState(false);
  const user = props.user.user;
  console.log(props.user.user);
  const { depositHandler } = useAuth(); //deleted depositHandler
  console.log(user.accounts.balance);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    depositHandler(user._id, deposit, user.accounts.balance)
      .then((res) => {
        setLoading(false);
        // console.log(`deposit response ${JSON.stringify(res.data.value)}`);
        alert("sucess");
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
    setAmount("");
  };

  return (
    // <Card
    //   className='card'
    //   bgcolor='secondary'
    //   header='Deposit Form'
    //   status={status}
    //   body={
    //     <>
    //       <Card
    //         bgcolor='warning'
    //         body=<h4>`Balance ${user.accounts.balance}`</h4>
    //       />
    //       <Card
    //         bgcolor='dark'
    //         header='Deposit'
    //         body={`

    <>
      <p className='fw-light, my-2'>Deposit</p>
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
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  value={deposit}
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

    //         }
    //       />
    //     </>
    //   }
    // />
  );
}
