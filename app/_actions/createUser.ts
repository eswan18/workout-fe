"use server";

const apiUrl = process.env.WORKOUT_API_URL;
const applicationKey = process.env.STATIC_APPLICATION_KEY;

export default async function createUser(
  email: string,
  password: string,
): Promise<string | null> {
  if (!email || !password) {
    throw "Email or password not provided.";
  }

  const payload = {
    secret: applicationKey,
    user: {
      email: email,
      password: password,
    },
  };

  const response = await fetch(`${apiUrl}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch((error) => {
    throw error;
  });

  if (!response) {
    throw "No response from server";
  }
  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 401) {
      throw "Invalid credentials";
    }
    throw errorData.detail;
  }
  return email;
}
