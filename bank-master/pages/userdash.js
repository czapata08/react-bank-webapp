import { Container, Row, Col, Nav, NavLink, NavItem } from "reactstrap";
import Example from "../components/userAcc";
import Rewards from "../components/rewards";
import ContactOnDash from "../components/contact";
import dbConnect from "../services/dbConnect";
import { useAuth } from "../context/user.context";
import getUser from "../lib/getUser";
import { useState } from "react";
import Link from "next/link";
import Deposit from "../components/deposit";

export const UserDash = () => {
  const { user } = useAuth();
  const [deposit, setDeposit] = useState(false);
  const auth = user;
  function UserDashNav() {
    return (
      <Nav tabs>
        <NavItem>
          <NavLink
            onClick={() => {
              setDeposit(false);
            }}>
            Accounts
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href='#'>Transfers</NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => {
              setDeposit(true);
            }}>
            Deposit
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href='#'>Help & LiveChat</NavLink>
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
          {deposit == true ? <Deposit /> : <Example auth={{ auth }} />}{" "}
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

// export async function getServerSideProps({ req, res }) {
//   await dbConnect();
//   const user = await getUser(req, res);
//   console.log(`user ssr ${JSON.stringify(user)}`);
//   console.log(typeof user);
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
//     props: {
//       user,
//     },
//   };
// }
