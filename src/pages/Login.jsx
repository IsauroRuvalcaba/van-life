import React, { useEffect, useState } from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
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
  const data = await loginUser({ email: email, password: password });
  localStorage.setItem("loggedin", true);

  console.log(data);
  return null;
}

export default function Login() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const message = useLoaderData();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    await loginUser(loginFormData)
      .then((data) => navigate("/host", { replace: true }))
      .catch((err) => setError(err))
      .finally(() => setStatus("idle")); //this is needed so not stuck in "logging in" if err
  }

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>

      {message && <h3 className="red">{message}</h3>}
      {error && <h3 className="red">{error.message}</h3>}

      <Form method="post" className="login-form">
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Logging in..." : "Log in"}
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
