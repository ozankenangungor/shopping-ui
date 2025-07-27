import { cookies } from "next/headers";

export default async function authenticated() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("Authentication");
  return !!token;
}
