import { getAccessToken } from "@/lib/session";

const API_URL = process.env.WORKOUT_API_URL;
// The timeout in milliseconds for HTTP requests.
const HTTP_TIMEOUT = 3000;

export async function get(route: string): Promise<any> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), HTTP_TIMEOUT);

  if (!route.startsWith("/")) {
    route = `/${route}`
  }
  const token = await getAccessToken();
  const response = await fetch(`${API_URL}${route}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: controller.signal
  }).catch((e) => {
    console.log(e);
  }).finally(() => {
    clearTimeout(timeoutId);
  });
  if (!response) {
    throw new Error(`Failed to fetch ${route}`)
  }
  if (!response.ok) {
    try {
      const error = await response.json()
      throw new Error(error.detail)
    } catch (e) {
      throw new Error(`Failed to fetch ${route} and unable to decode json (${e})`)
    }
  }
  return await response.json()
}
