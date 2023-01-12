import { useState } from "react";
import { useAuth } from "../lib/auth";

export default function FormsContext(props) {
  const [firstname, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  // const ctx = React.useContext(UserContext);
  // const data = { firstname, lastname, email, password, balance, zip, address };

  // function handleLogin() {
  //   console.log(email, password);
  //   const url = `/account/querydb/${email}/${password}`;
  //   (async () => {
  //     var res = await fetch(url);
  //     var data = await res.json();
  //     console.log(` handle login ${JSON.stringify(data)}`);
  //   })();
  // }

  // function clearForm() {
  //   setName("");
  //   setEmail("");
  //   setPassword("");
  //   setShow(true);
  //   setAddress("");
  //   setZip("");
  //   setBalance("");
  // }

  // function handle(props) {
  //   switch (props) {
  //     case "create":
  //       return handleCreate();
  //     case "login":
  //       return handleLogin();
  //   }
  // }

  return (
    <>
      {props.firstname && (
        <>
          First Name
          <br />
          <input
            type='input'
            className='form-control'
            placeholder='Enter first name'
            value={firstname}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <br />
        </>
      )}
      {props.lastname && (
        <>
          Last Name
          <br />
          <input
            type='input'
            className='form-control'
            placeholder='Enter last name'
            value={lastname}
            onChange={(e) => setLastName(e.currentTarget.value)}
          />
          <br />
        </>
      )}
      {props.address && (
        <>
          Address
          <br />
          <input
            type='input'
            className='form-control'
            placeholder='Enter address'
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
          />
          <br />
        </>
      )}
      {props.zip && (
        <>
          Zip Code
          <br />
          <input
            type='input'
            className='form-control'
            placeholder='Enter Zip Code'
            value={zip}
            onChange={(e) => setZip(e.currentTarget.value)}
          />
        </>
      )}
      {props.balance && (
        <>
          Balance
          <br />
          <input
            type='input'
            className='form-control'
            placeholder='Enter balance'
            value={balance}
            onChange={(e) => setBalance(e.currentTarget.value)}
          />
          <br />
        </>
      )}
      {props.email && (
        <>
          Email address
          <br />
          <input
            type='input'
            className='form-control'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <br />
        </>
      )}
      {props.password && (
        <>
          Password
          <br />
          <input
            type='input'
            className='form-control'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <br />
        </>
      )}
      {/* {props.balance && (
        <span
          hidden={props.balance}
          type='balance'
          className='form-control'
          value={data.password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      )} */}
      <br />
      {props.handle && (
        <button
          type='submit'
          className='btn btn-light'
          onClick={(e) => {
            props.handle;
          }}>
          Create Account
        </button>
      )}
    </>
  );
}
