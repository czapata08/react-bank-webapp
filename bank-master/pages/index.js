import { AuthProvider } from "../context/user.context";
import getUser from "../lib/getUser";
import { useRouter } from "next/router";
import dbConnect from "../services/dbConnect";
import Landing from "./landing";
import UserDash from "./userdash";

export default function HomePage() {
  const router = useRouter();
  return (
    <>
      <Landing />
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  await dbConnect();
  const user = await getUser(req, res);
  console.log(`user from layout ${res.user}`);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
      props: {},
    };
  }
  return {
    props: {
      user,
    },
  };
}
