import { Container, Row, Col, Nav, NavLink, NavItem } from "reactstrap";
import UserAcc from "../components/userAcc";
import Rewards from "../components/rewards";
import ContactOnDash from "../components/contact";
import { useAuth } from "../context/user.context";
import { useState } from "react";
import Deposit from "../components/deposit";
import Transfer from "../components/transfer";
import Withdraw from "../components/withdraw";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const UserDash = () => {
  const { user } = useAuth();
  const router = useRouter();
  const auth = user;
  const [transactionType, setType] = useState("");

  const NavStatus = () => {
    switch (transactionType) {
      case "transfer":
        return <Transfer />;
      case "deposit":
        return <Deposit />;
      case "withdraw":
        return <Withdraw />;
      default:
        return <UserAcc auth={{ auth }} />;
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

// export async function getServerSideProps() {
//   const token = getCookie();
//   if (!token) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   const access = true;

//   return {
//     props: { access },
//   };
// }
