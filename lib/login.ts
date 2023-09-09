"use server";

const apiUrl = process.env.WORKOUT_API_URL;

type User = {
  id: string;
  email: string;
  token: string;
};

export default async function loginUser(
  email: string,
  password: string,
): Promise<User | null> {
  /* Log in a user and get a token from the server */
  if (!email || !password) {
    console.log("Missing email or password");
    return null;
  }

  let formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);
  formData.append("grant_type", "password");

  const response = await fetch(`${apiUrl}/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    credentials: "include",
    body: formData.toString(),
  }).catch((error) => {
    console.log(error);
  });

  if (!response) {
    return null;
  }
  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 401) {
      console.log("Invalid credentials");
      return null;
    }
    console.log(errorData.detail);
    return null;
  }
  const data = await response.json();
  const token = data.access_token;
  return { id: email, email, token };
}
