"use server";

import { get, RequestResult, newRequestSuccess } from "@/lib/requests";
import { UserOut } from "@/lib/resources/apiTypes";

export async function getMe(): Promise<RequestResult<UserOut>> {
  const result = (await get({ route: "/users/me" })) as RequestResult<UserOut>;
  if (!result.success) {
    return result;
  }
  const user = result.data;
  return await newRequestSuccess(user);
}
