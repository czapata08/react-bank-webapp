import { Container, Row, Col, Nav, NavLink, NavItem } from "reactstrap";
import UserAcc from "../components/userAcc";
import Rewards from "../components/rewards";
import ContactOnDash from "../components/contact";
import { useAuth } from "../context/user.context";
import { useState } from "react";
import Deposit from "../components/deposit";
import Transfer from "../components/transfer";
import Withdraw from "../components/withdraw";
import { useRouter } from "next/router";
import dbConnect from "../services/dbConnect";
import getUser from "../lib/getUser";

const UserDash = (props) => {
  const { user } = props;
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const [transactionType, setType] = useState("");

  const NavStatus = (props) => {
    switch (transactionType) {
      case "transfer":
        return <Transfer user={{ user }} />;
      case "deposit":
        return <Deposit user={{ user }} />;
      case "withdraw":
        return <Withdraw user={{ user }} />;
      default:
        return <UserAcc user={{ user }} />;
    }
  };

  function UserDashNav() {
    return (
      <Nav tabs>
        <NavItem>
          <NavLink
            onClick={() => {
              setType();
            }}>
            Accounts
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => {
              setType("transfer");
            }}>
            Transfer
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => {
              setType("deposit");
            }}>
            Deposit
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => {
              setType("withdraw");
            }}>
            Withdraw
          </NavLink>
        </NavItem>
      </Nav>
    );
  }

  return (
    <Container className='py-3'>
      <UserDashNav />
      <Row>
        <Col
          className='bg-light border'
          xs='6'
          md='8'>
          <NavStatus />
        </Col>

        <Col
          className='br-dark border'
          xs='6'
          md='4'>
          <Rewards />
          <ContactOnDash />
        </Col>
      </Row>
    </Container>
  );
};
export default UserDash;

export async function getServerSideProps({ req, res }) {
  await dbConnect();

  const user = await getUser(req, res);
  console.log(`user from userdash: ${JSON.stringify(user)}`);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
  return {
    props: { user },
  };
}
