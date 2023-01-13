import { useAuth } from "../context/user.context";
import { useState, useEffect } from "react";
import { set } from "mongoose";

export default function Deposit() {
  const [deposit, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  var { user, test } = useAuth(); //deleted depositHandler

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    test(user._id, deposit)
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
    //         body={
    <>
      {user && (
        <>
          {loading ? (
            <h1>Proccesing</h1>
          ) : (
            <>
              <h1>
                {user.accounts.name} <p>{user.accounts.accountNumber}</p>
              </h1>
              <form onSubmit={submit}>
                <input
                  type='number'
                  placeholder='$'
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
