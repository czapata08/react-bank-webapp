import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { useState } from "react";
import getUser from "../lib/getUser";
import dbConnect from "../services/dbConnect";
import axios from "axios";
import { useRouter } from "next/router";

export default function updater(props) {
  const [updater, setupdater] = useState({});
  const { user } = props;
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  console.log(`user from update: ${user}`);

  const labels = Object.keys(user);
  console.log(labels);
  const id = user._id;
  console.log(id);

  console.log("user: " + typeof user);

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`api/update`, {
        updater,
        id,
      });
      alert("success");
      if (res.status < 300) {
        refreshData();
      }
      console.log(`${JSON.stringify(res)}`);
    } catch (error) {
      console.log(error);
    }
  };

  function onChange(event) {
    setupdater({ ...updater, [event.target.id]: event.target.value });
    console.log(updater);
  }

  //build form label will be user object values matching the input field
  //input field to update user object
  //all input fields store in updater State variable
  //send user._id and updater variable in request

  return (
    <Form onSubmit={updateHandler}>
      <FormGroup>
        <Label>Email</Label>
        <Input
          id='email'
          value={labels.email}
          onChange={(e) => onChange(e)}
        />
        <FormText>{user.email}</FormText>
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input
          id='password'
          value={labels.password}
          onChange={(e) => onChange(e)}
        />
        <FormText>{user.password}</FormText>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export async function getServerSideProps({ req, res }) {
  await dbConnect();

  const user = await getUser(req, res);
  console.log(`user from update: ${JSON.stringify(user)}`);
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

//  <>
//     <h1>{JSON.stringify(user)}</h1>
//     {user && (
//       <Form>
//         {labels.map((title) => {
//           <FormGroup>
//             {Array.from(user).map((ele, key) => {
//               return (
//                 <>
//                   <Label key={key.toString()}>{title.email}</Label>
//                   <FormText key={key.toString()}>{ele.email}</FormText>
//                   <Input
//                     key={key.toString()}
//                     value={title.email}
//                     onChange={(e) => onChange(e)}
//                   />
//                   <Label key={key.toString()}>{title.password}</Label>
//                   <FormText key={key.toString()}>{ele.password}</FormText>
//                   <Input
//                     key={key.toString()}
//                     value={title.password}
//                     onChange={(e) => onChange(e)}
//                   />
//                 </>
//               );
//             })}
//           </FormGroup>;
//         })}
//         <Button
//           onClick={(e) => {
//             alert(`hellloooooo`);
//           }}>
//           Submit
//         </Button>
//       </Form>
//     )}
//   </>
