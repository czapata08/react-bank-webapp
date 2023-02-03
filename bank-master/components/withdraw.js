import { useAuth } from "../context/user.context";
import { useState, useEffect } from "react";
import { set } from "mongoose";
import { useRouter } from "next/router";

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
                  placeholder='$ Withdraw Amount'
                  onChange={(e) => setWithdraw(Number(e.target.value))}
                  value={withdraw}
                />
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
