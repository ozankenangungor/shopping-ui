import { cookies } from "next/headers";
import { getErrorMessage } from "./errors";
import { API_URL } from "../common/constants/api";

export const getHeaders = async (): Promise<Record<string, string>> => {
  // ✨ FIX: First, 'await' cookies() to get the cookie store object.
  const cookieStore = await cookies();
  
  // Now, call .toString() on the resolved object.
  const cookieHeader = cookieStore.toString();

  if (cookieHeader) {
    return { Cookie: cookieHeader };
  }

  return {};
};
export const post = async (path: string, formData: FormData) => {
  const cookieStore = await cookies();
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
      Cookie: cookieStore.toString() 
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  return { error: "", data: parsedRes };
};

export const get = async <T>(path: string, tags?: string[]) => {
  const cookieStore = await cookies();
  const res = await fetch(`${API_URL}/${path}`, {
    headers: { Cookie: cookieStore.toString() },
    next: { tags },
  });
  return res.json() as T;
};