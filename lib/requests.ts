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

export async function request({
  route,
  method,
  params,
  body,
}: RequestParams): Promise<any> {
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
    throw new Error(`Failed to fetch ${route}`);
  }
  if (!response.ok) {
    let error;
    try {
      const payload = await response.json();
      error = new Error(JSON.stringify(payload.detail));
    } catch (e) {
      error = new Error(`Failed to fetch ${url} and unable to decode json`);
    }
    throw error;
  }
  return await response.json();
}

type GetParams = {
  route: string;
  params?: Record<string, string>;
};

export async function get({ route, params }: GetParams): Promise<any> {
  return await request({ route, method: "GET", params });
}

type PostParams = {
  route: string;
  body?: string;
};

export async function post({ route, body }: PostParams): Promise<any> {
  return await request({ route, method: "POST", body });
}

type PutParams = {
  route: string;
  params?: Record<string, string>;
  body?: string;
};

export async function put({ route, params, body }: PutParams): Promise<any> {
  return await request({ route, method: "PUT", params, body });
}

type PatchParams = {
  route: string;
  id: string;
  body?: string;
};

export async function patch({ route, id, body }: PatchParams): Promise<any> {
  return await request({ route, method: "PATCH", params: { id }, body });
}

type DeleteParams = {
  route: string;
  id: string;
};

export async function del({ route, id }: DeleteParams): Promise<any> {
  return await request({ route, params: { id }, method: "DELETE" });
}
