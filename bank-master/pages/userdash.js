import { Container, Row, Col, Nav, NavLink, NavItem } from "reactstrap";
import UserAcc from "../components/userAcc";
import Rewards from "../components/rewards";
import ContactOnDash from "../components/contact";
import { useAuth } from "../context/user.context";
import { useState } from "react";
import Deposit from "../components/deposit";
import { getCookie } from "cookies-next";
import { Router } from "next/router";

const UserDash = (props) => {
  const access = props;
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
          {deposit == true ? <Deposit /> : <UserAcc auth={{ auth }} />}
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
