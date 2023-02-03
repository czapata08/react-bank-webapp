import getUser from "../lib/getUser";
import dbConnect from "../lib/dbConnect";
import {
  Card,
  CardBody,
  CardTitle,
  CardImage,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

const Profile = (props) => {
  console.log(props);

  const { user } = props;

  return (
    <Card
      style={{
        width: "18rem",
      }}>
      <img
        alt='Card'
        src='https://picsum.photos/id/237/200/300'
        className='rounded-circle, d-inline'
        style={{ width: "88px", height: "88px" }}
      />
      <CardBody>
        <CardTitle tag='h5'>Account Information</CardTitle>
      </CardBody>
      <ListGroup flush>
        <ListGroupItem>name: {user.name}</ListGroupItem>
        <ListGroupItem>email: {user.email}</ListGroupItem>
        <ListGroupItem>account ID: {user._id}</ListGroupItem>
      </ListGroup>
    </Card>
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
