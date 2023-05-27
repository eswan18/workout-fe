export default async function loginUser(email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  let formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);
  formData.append('grant_type', 'password');
  
  const response = await fetch('http://localhost:8000/v1/token/', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    credentials: 'include',
    body: formData.toString(),
  })
  console.debug(response)
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail);
  }
  return await response.json();
}