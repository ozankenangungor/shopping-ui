import { cookies } from "next/headers";
import { getErrorMessage } from "./errors";
import { API_URL } from "../common/constants/api";

// 1. Fonksiyonu "async" olarak değiştir ve "cookies()" çağrısına "await" ekle
const getHeaders = async () => ({
  Cookie: (await cookies()).toString(),
});

export const post = async (path: string, formData: FormData) => {
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    // 2. "getHeaders()" fonksiyonu artık async olduğu için "await" ile çağır
    headers: { "Content-Type": "application/json", ...(await getHeaders()) },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  return { error: "" };
};

export const get = async <T>(path: string, tags?: string[]) => {
  const res = await fetch(`${API_URL}/${path}`, {
    headers: { ...(await getHeaders()) },
    next: { tags },
  });
  return res.json() as T;
};


