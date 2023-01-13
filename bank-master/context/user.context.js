import { createContext, useContext, useState, useEffect } from "react";
import getUser from "../lib/getUser";
import dbConnect from "../public/services/dbConnect";
import api from "../lib/api";
import { getCookie, setCookie, removeCookies } from "cookies-next";
import User from "../models";
import jwt from "jsonwebtoken";
import axios from "axios";
import { useRouter } from "next/router";
// import clientPromise from "../lib/mongodb";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = getCookie();
      if (token)
        console.log(
          `found token, lets see if it is is: ${JSON.stringify(token)}`
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

  const test = (_id, deposit) => {
    if (typeof window === "undefined") {
      return;
    }
    console.log(_id, deposit);
    return new Promise((resolve, reject) => {
      axios
        .post(`api/test`, { _id, deposit })
        .then((res) => {
          const data = res.data;
          console.log(`deposit data from api ctx : ${JSON.stringify(data)}`);
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

  const depositHandler = (id, deposit) => {
    if (typeof window === "undefined") {
      return;
    }
    return new Promise((resolve, reject) => {
      axios
        .post(`api/deposit`, { id, deposit })
        .then((res) => {
          resolve(res);
          alert(`sucess deposit`);
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
        test,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
