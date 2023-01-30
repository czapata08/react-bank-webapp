import { useAuth } from "../context/user.context";

const Profile = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <div>
      <h1>{user.email}</h1>
    </div>
  );
};
export default Profile;

//Only render this page if getUser function returns valid user
// export async function getServerSideProps({ req, res }) {
//   const token = getCookie({ req });
//   console.log(token);
//   await dbConnect();

//   const user = await getUser({ req, res });
//   if (!user) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/",
//       },
//       props: {},
//     };
//   }
//   return {
//     props: { user },
//   };
// }
