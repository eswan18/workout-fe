'use server';


const apiUrl = process.env.WORKOUT_API_URL;
const applicationKey = process.env.API_STATIC_APPLICATION_KEY;

export default async function createUser(email: string, password: string): Promise<string> {
  /* Create a new user. */
  if (!email || !password) {
    console.log('Missing email or password');
    return '';
  }

  console.log("applicationKey", applicationKey);
  const payload = {
    "secret": applicationKey,
    "user": {
      "email": email,
      "password": password
    }
  }

  const response = await fetch(`${apiUrl}/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch((error) => { console.log(error) });

  if (!response) {
    return '';
  }
  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 401) {
      console.log('Invalid credentials');
      return ''
    }
    console.log(errorData.detail);
    return ''
  }
  // decode the posix timestamp into a Date object
  return email;
}