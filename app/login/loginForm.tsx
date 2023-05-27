"use client"
import { useState, FormEvent } from 'react';

async function loginUser(email: string, password: string) {
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

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await loginUser(email, password);
    } catch (error) {
      alert(`Error from server: ${error}`);
    }
  }
  return (
    <div>
      <h2 className="text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
      <label htmlFor="email" className='text-white'>Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder='Email Address'
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password" className='text-white'>Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log in</button>
      </form>
    </div>
  )
}