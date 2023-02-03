import getUser from "../lib/getUser";
import dbConnect from "../lib/dbConnect";
import { getCookie } from "cookies-next";

const Profile = (props) => {
  console.log(props);

  const { user } = props;

  return (
    <div>
      <h1>{user.email}</h1>
      <h1>{user.accounts.name}</h1>
    </div>
  );
};
export default Profile;

export async function getServerSideProps({ req, res }) {
  await dbConnect();
  const user = await getUser(req, res);
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
