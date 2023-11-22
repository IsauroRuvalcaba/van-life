import { redirect } from "react-router-dom";

export async function requireAuth() {
  // this could be checking an external DB for authenticity so it could be asyncronous
  const isLoggedIn = false;

  if (!isLoggedIn) {
    throw redirect("/login?message=You must log in first");
  }
}
