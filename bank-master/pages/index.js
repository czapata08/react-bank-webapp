import { AuthProvider } from "../context/user.context";
import getUser from "../lib/getUser";
import { useRouter } from "next/router";
import dbConnect from "../services/dbConnect";
import Landing from "./landing";

export default function HomePage() {
  const router = useRouter();
  return (
    <>
      <Landing />
    </>
  );
}
