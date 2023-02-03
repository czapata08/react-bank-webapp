import { createContext, useContext, useState, useEffect } from "react";
import { getCookie, removeCookies } from "cookies-next";
import User from "../models";
import jwt from "jsonwebtoken";
import axios from "axios";
import { useRouter } from "next/router";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = getCookie();
      console.log(token);
      console.log(
        `found token, lets see if it is is: ${JSON.stringify(getCookie())}`
      );
      try {
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(`data from getUser: ${JSON.stringify(data)}`);
        let user = await User.findById(data.userId);
        user = JSON.parse(JSON.stringify(user));
        console.log("valid");
        if (user) setUser(user);
        console.log(`user from new useEffect ${JSON.stringify(user)}`);
        return user;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    loadUserFromCookies();
  }, []);

  const signinHandler = (email, password) => {
    if (typeof window === "undefined") {
      return;
    }

    return new Promise((resolve, reject) => {
      axios
        .post(`api/signin`, {
          email,
          password,
        })
        .then((res) => {
          const validatedUser = res.data;
          setUser(validatedUser);
          console.log(`validated user context = ${JSON.stringify(res.data)}`);
          console.log(`user ${JSON.stringify(user)}`);
          resolve(res);
          router.push("/userdash");
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const depositHandler = (_id, deposit, balance) => {
    if (typeof window === "undefined") {
      return;
    }
    console.log(_id, deposit, balance);
    return new Promise((resolve, reject) => {
      axios
        .post(`api/deposit`, { _id, deposit, balance })
        .then((res) => {
          const data = res.data;
          console.log(`deposit data from api ctx : ${JSON.stringify(data)}`);
          setUser(res.data.value);
          resolve(res);
          alert(`Deposit sucessful`);
        })
        .catch((error) => {
          reject(console.log(error));
        });
    });
  };

  const withdrawHandler = (_id, withdraw) => {
    if (typeof window === "undefined") {
      return;
    }
    console.log(_id, withdraw);
    return new Promise((resolve, reject) => {
      axios
        .post(`api/withdraw`, { _id, withdraw })
        .then((res) => {
          const data = res.data;
          console.log(`withdraw : ${JSON.stringify(data)}`);
          setUser(res.data.value);
          resolve(res);
          alert(`success from api`);
        })
        .catch((error) => {
          reject(console.log(error));
        });
    });
  };

  const signupHandler = (email, password, name) => {
    if (typeof window === "undefined") {
      return;
    }

    return new Promise((resolve, reject) => {
      axios
        .post(`api/signup`, {
          email,
          password,
          name,
        })
        .then((res) => {
          const newUser = res.data;
          setUser(newUser);
          console.log(`new user context = ${JSON.stringify(res.data)}`);
          console.log(`user ${JSON.stringify(user)}`);
          resolve(res);
          router.push("/userdash");
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const transferHandler = (senderId, recieverId, transferAmount) => {
    if (typeof window === "undefined") {
      return;
    }
    return new Promise((resolve, reject) => {
      axios
        .post(`api/transfer`, { senderId, recieverId, transferAmount })
        .then((res) => {
          resolve(res);
          setUser(res.data.value);
          alert(`Transfer succesfull`);
          router.push("/userdash");
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const signoutHandler = () => {
    removeCookies("token");
    setUser(null);
    router.push("/signin");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        signinHandler,
        signupHandler,
        signoutHandler,
        depositHandler,
        transferHandler,
        withdrawHandler,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
