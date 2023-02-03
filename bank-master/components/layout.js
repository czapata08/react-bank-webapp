import { useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
} from "reactstrap";
import { useAuth } from "../context/user.context";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  // const [expand, setExpand] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const title = "banking app";
  const router = useRouter();
  const { user, signoutHandler } = useAuth();

  //TODO
  ///IMPORT CONTEXT AND ADD USER VARIABLE TO MANIPULATE CONDITIONAL CODE TO RNDER NAVITEMS

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
        />
      </Head>

      <Navbar className='navbar navbar-light navbar-expand-md'>
        <NavbarToggler onClick={toggle} />
        <NavbarBrand href='/'>Knights Bank</NavbarBrand>
        <Collapse
          isOpen={isOpen}
          navbar>
          <Nav
            className='me-auto'
            navbar>
            {!user ? (
              <>
                <NavItem>
                  <NavLink href='/signin'>Signin</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='/register'>Register</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='/support'>Support</NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink>
                    <Link href='/userdash'>Account Dashboard</Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <Link href='/profile'>Profile</Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <Link href='/update'>Update</Link>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <Link href='/alldata'>AllData</Link>
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          {user && (
            <>
              <NavItem>
                <Button
                  onClick={() => {
                    signoutHandler();
                  }}>
                  Logout
                </Button>
              </NavItem>
              <NavbarText>{user.email}</NavbarText>
            </>
          )}
        </Collapse>
      </Navbar>
      <Container>{children}</Container>
    </div>
  );
}
