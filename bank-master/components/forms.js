import { useState } from "react";
import { useAuth } from "../context/user.context";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signinHandler } = useAuth();

  const submit = async (e) => {
    e.preventDefault(e);
    setLoading(true);
    signinHandler(email, password)
      .then((res) => {
        setLoading(false);
        console.log(`user from signing page ${JSON.stringify(res.data)}`);
        alert("sucess");
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };
  return (
    <div>
      <h1>SignIn</h1>

      <p>Only unauthenticated users can access this page.</p>

      <form onSubmit={submit}>
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
        <button>{loading ? "Loading... " : "Submit"}</button>
      </form>
    </div>
  );
};

export default LoginForm;
