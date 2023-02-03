import { useAuth } from "../context/user.context";
import { useState, useEffect } from "react";
import { set } from "mongoose";

export default function Deposit(props) {
  const [deposit, setAmount] = useState("");
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
                  placeholder='$ Deposit Amount'
                  onChange={(e) => setAmount(Number(e.target.value))}
                  value={deposit}
                />
                <button>{loading ? "Loading... " : "Submit"}</button>
                <br />
              </form>
            </>
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
