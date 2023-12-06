import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  // this could be checking an external DB for authenticity so it could be asyncronous
  const pathname = new URL(request.url).pathname;
  const isLoggedIn = localStorage.getItem("loggedin");
  // const isLoggedIn = true;
  if (!isLoggedIn) {
    // throw redirect("/login?message=You must log in first");
    throw redirect(
      `/login?message=You must log in first.&redirectTo=${pathname}`
    );
    //when logged out and try and click on "Host", you are redirected to Login.jsx with the below url string in the browser address bar
    //http://127.0.0.1:5173/login?message=You%20must%20log%20in%20first.&redirectTo=/host
  }
}

//all the above is doing is if you are logged out and want to get to a protected route, the pathname saves the route you were in and once you log back in, it saves the pathname in the address bar and then sends you back to where the saved path is in.

//?Learn native web APIs
//like passing "request" object in the function argument
//then using that in "new URL(request.url)"
