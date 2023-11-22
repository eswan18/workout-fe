"use server";

import { getAccessToken } from "@/lib/session";

const API_URL = process.env.WORKOUT_API_URL;
// The timeout in milliseconds for HTTP requests.
const HTTP_TIMEOUT = 3000;

type RequestParams = {
  route: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  params?: Record<string, string>;
  body?: string;
};

// Because all our API calls are in server functions, javascript errors don't propagate to the client.
// Instead, we return a RequestResult, in the model of Rust's Result type.
export type RequestResult<T> =
  | RequestSuccess<T>
  | RequestFailure
  | RequestAuthFailure;

export type RequestSuccess<T> = {
  success: true;
  data: T;
};

export type RequestFailure = {
  success: false;
  authFailure: false;
  error: Error;
};

export type RequestAuthFailure = {
  success: false;
  authFailure: true;
  error: Error;
};

export async function newRequestSuccess<T>(
  data: T,
): Promise<RequestSuccess<T>> {
  return { success: true, data };
}

export async function newRequestFailure(error: Error): Promise<RequestFailure> {
  return { success: false, authFailure: false, error };
}

export async function newRequestAuthFailure(
  error: Error,
): Promise<RequestAuthFailure> {
  return { success: false, authFailure: true, error };
}

export async function request({
  route,
  method,
  params,
  body,
}: RequestParams): Promise<RequestResult<any>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), HTTP_TIMEOUT);

  if (!route.startsWith("/")) {
    route = `/${route}`;
  }
  if (params) {
    const queryString = new URLSearchParams(params);
    route = `${route}?${queryString.toString()}`;
  }
  const token = await getAccessToken();
  const url = `${API_URL}${route}`;
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body,
    signal: controller.signal,
  })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      clearTimeout(timeoutId);
    });
  if (!response) {
    return newRequestFailure(new Error(`Failed to fetch ${route}`));
  }
  if (!response.ok) {
    const payload = await response.text();
    if (response.status === 401) {
      return newRequestAuthFailure(new Error(payload));
    }
    return newRequestFailure(new Error(payload));
  }
  return newRequestSuccess(await response.json());
}

type GetParams = {
  route: string;
  params?: Record<string, string>;
};

export async function get({
  route,
  params,
}: GetParams): Promise<RequestResult<any>> {
  return await request({ route, method: "GET", params });
}

type PostParams = {
  route: string;
  body?: string;
};

export async function post({
  route,
  body,
}: PostParams): Promise<RequestResult<any>> {
  return await request({ route, method: "POST", body });
}

type PutParams = {
  route: string;
  params?: Record<string, string>;
  body?: string;
};

export async function put({
  route,
  params,
  body,
}: PutParams): Promise<RequestResult<any>> {
  return await request({ route, method: "PUT", params, body });
}

type PatchParams = {
  route: string;
  id: string;
  body?: string;
};

export async function patch({
  route,
  id,
  body,
}: PatchParams): Promise<RequestResult<any>> {
  return await request({ route, method: "PATCH", params: { id }, body });
}

type DeleteParams = {
  route: string;
  id: string;
};

export async function del({
  route,
  id,
}: DeleteParams): Promise<RequestResult<any>> {
  return await request({ route, params: { id }, method: "DELETE" });
}
