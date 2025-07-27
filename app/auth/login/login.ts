"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FormError } from "@/app/common/form-error.interface";
import { getErrorMessage } from "@/app/util/errors";
import { API_URL } from "@/app/common/constants/api";

export default async function login(_prevState: FormError, formData: FormData) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }

  // 3. Artık async olan fonksiyonu "await" ile çağırın
  await setAuthCookie(res);

  redirect("/");
}

// 1. Fonksiyonu "async" yapın
const setAuthCookie = async (response: Response) => {
  const setCookieHeader = response.headers.get("Set-Cookie");
  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];

    // 2. cookies() işlemini "await" ile bekleyin
    (await cookies()).set({
      name: "Authentication",
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
};