import getUser from "../lib/getUser";
import dbConnect from "../lib/dbConnect";

const Profile = (props) => {
  console.log(props);

  return (
    <div>
      <h1>{props.email}</h1>
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
