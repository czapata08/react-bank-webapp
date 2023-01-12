import { useAuth } from "../context/user.context";
import { useState, useEffect } from "react";
import dbConnect from "../services/dbConnect";
import getUser from "../lib/getUser";
import Link from "next/link";
import { Router } from "next/router";

export default function Deposit() {
  const [deposit, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  var { user, test } = useAuth(); //deleted depositHandler
  const [_id, setId] = useState("");

  console.log(`DEPOSIT USER${JSON.stringify(user)}`);

  // console.log(`balance = ${balance}`);
  // const submit = async () => {
  //   setLoading(true);

  //   test(user._id, deposit)
  //     .then((res) => {
  //       setLoading(false);
  //       alert("sucess");
  //       setStatus("confirmed deposit");
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       alert(error);
  //     });
  // };

  // useEffect(() => {
  //   //fetch all accouts from api
  //   fetch("/api/test")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data);
  //       setHeadings(Object.keys(data[0]));

  //       console.log(` all data from db ${JSON.stringify(data)}`);
  //       console.log(`${Object.keys(data[0])} keys`);
  //     });
  // }, []);

  const submit = async (e) => {
    e.preventDefault();
    // setId(user._id);
    setLoading(true);
    test(user._id, deposit)
      .then((res) => {
        setLoading(false);
        console.log(`operation response ${JSON.stringify(res.data)}`);
        console.log(`user id: ${user._id}`);
        console.log(`deposit amount: ${deposit}`);
        alert("sucess");
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  function Card(props) {
    function classes() {
      const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
      const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
      return "card mb-3 " + bg + txt;
    }

    return (
      <div
        className={classes()}
        style={{ maxWidth: "18rem" }}>
        {props.header && <div className='card-header'>{props.header}</div>}
        <div className='card-body'>
          {props.title && <h5 className='card-title'>{props.title}</h5>}
          {props.text && <p className='card-text'>{props.text}</p>}
          {props.body}
          {props.status && <div id='createStatus'>{props.status}</div>}
        </div>
      </div>
    );
  }

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
    //         }
    //       />
    //     </>
    //   }
    // />
  );
}

// export default function Deposit() {
//   const{ user, test} = useAuth();
//   const [deposit, setDeposit] = useState("");
//   const [_id] = useState("");
//   const [status, setStatus] = useState(false);

//   const submit = async (e) => {
//     e.preventDefault(e);
//     setStatus(true);
//     test(_id, deposit)

//   };

//   return (
//     <form onSubmit={submit}>
//       <input
//         type='number'
//         placeholder='Deposit Amount'
//         onChange={(e) => setDeposit(Number(e.target.value))}
//         value={deposit}
//       />
//     </form>
//   );
// }
