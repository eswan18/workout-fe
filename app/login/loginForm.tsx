"use client"
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';


export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (response.status === 401) {
      alert('Invalid credentials');
    } else if (response.status != 201) {
      console.log('Something went wrong');
      console.log(response.json());
    }
    router.refresh();
  }

  return (
    isLoggedIn
    ?
      <div>You&apos;re already logged in! </div>
    :
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
        <button type="submit" disabled={ !email || !password } >Log in</button>
        </form>
      </div>
  )
}