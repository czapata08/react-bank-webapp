import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { useState } from "react";
import getUser from "../lib/getUser";
import dbConnect from "../services/dbConnect";
import axios from "axios";
import { useAuth } from "../context/user.context";

export default function updater() {
  const [updater, setupdater] = useState({});
  const { user } = useAuth();

  console.log(user);

  const labels = Object.keys(user);
  console.log(labels);
  const profile = user;

  console.log("user: " + typeof user);

  // const objectArray = Object.entries(user);

  // objectArray.forEach(([key, value]) => {
  //   console.log(`key : ${key}`); // 'one'
  //   console.log(`value: ${value}`); // 1
  // });

  function onChange(event) {
    setupdater({ ...updater, [event.target.label]: event.target.value });
  }

  //build form label will be user object values matching the input field
  //input field to update user object
  //all input fields store in updater State variable
  //send user._id and updater variable in request

  return (
    <>
      <Label>Email</Label>
      <Input
        value={labels.email}
        onChange={(e) => onChange(e)}
      />
      <FormText>{user.email}</FormText>

      <Label>Password</Label>
      <Input
        value={labels.password}
        onChange={(e) => onChange(e)}
      />
      <FormText>{user.password}</FormText>
    </>
  );
}

// export async function getServerSideProps({ req, res }) {
//   await dbConnect();

//   const user = await getUser(req, res);
//   console.log(`user from update: ${JSON.stringify(user)}`);
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
