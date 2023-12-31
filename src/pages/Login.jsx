import React, { useEffect, useState } from "react";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
  //this is saved in the url when requireAuth() in utils.js is triggered in each protective route if not logged in - change isLoggedIn = true in that function
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData();
  // get method pulls data from the name attribute of the input in Form
  const email = formData.get("email");
  const password = formData.get("password");

  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";

  try {
    const data = await loginUser({ email: email, password: password });
    localStorage.setItem("loggedin", true);
    return redirect(pathname); //don't want this to be hard coded to /host route
  } catch (err) {
    //this is comming from api.js loginUser() under if(!res.ok)
    return err.message;
  }

  //! redirect can be used in non-functional components to navigate to different page
}

export default function Login() {
  const message = useLoaderData();
  const errorMessage = useActionData(); //removed useState for error and using this
  const navigation = useNavigation(); //* this in not useNavigate()

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>

      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}

      {/* replace will prevent from going back to login page in history stack */}
      {/* it's better to put this logic in the loader of login page. prevents any access */}
      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={navigation.state === "submitting"}>
          {navigation.state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}

//! the error message comes from the api.js loginUser func that throws a message if response not ok. That error was setup in the server.js where if foundUser method returns false it responds with 401 error saying the message.

//https://chat.openai.com/share/b7884c3b-f52a-44ac-8be7-2134ba3a3494

/*
async function handleSubmit(e) {
    e.preventDefault();
    await setStatus("submitting");

    console.log(status);
    await loginUser(loginFormData).then((data) => console.log(data.user));

    // setStatus("idle");
    setStatus("idle");
    console.log(status);
  }
*/

/*


  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();
  
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    await loginUser(loginFormData)
      .then((data) => navigate("/host", { replace: true }))
      .finally(() => setStatus("idle")); //this is needed so not stuck in "logging in" if err
  }

*/
