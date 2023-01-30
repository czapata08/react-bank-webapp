import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import getUser from "../lib/getUser";
import dbConnect from "../public/services/dbConnect";
import { useAuth } from "../context/user.context";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signupHandler } = useAuth();
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault(e);
    setLoading(true);
    signupHandler(email, password)
      .then((res) => {
        setLoading(false);
        console.log(`user from signup ${JSON.stringify(res.data)}`);
        alert("sucess");
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  return (
    <>
      <h1>SignUp</h1>

      <p>Only unauthenticated users can access this page.</p>

      <form onSubmit={submit}>
        <input
          type='text'
          placeholder='Name'
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button>SignUp</button>
      </form>
    </>
  );
};

export default RegisterPage;
