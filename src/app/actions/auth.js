"use server";
import { cookies } from "next/headers";

export async function setAuthCookie() {
  cookies().set("token", "loggedin", {
    path: "/",
    maxAge: 86400,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function removeAuthCookie() {
  cookies().delete("token");
}