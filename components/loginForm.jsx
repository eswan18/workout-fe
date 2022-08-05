import styles from './loginForm.module.css';
import { useState, useEffect } from 'react';
import { setLocalToken, setLocalUsername } from '../lib/auth';
import axios from 'axios';
import Router from 'next/router';

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL

export async function getServerSideProps(context) {
  const authUrl = process.env.NEXT_PUBLIC_AUTH_URL
  console.debug(authUrl)
  return {
    props: {
      authUrl,
    },
  }
}

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const login = (e) => {
    e.preventDefault()
    if ((username == "") | (password == "")) {
      console.log('skipping')
      return;
    } else {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)
      axios
        .post(AUTH_URL, formData)
        .then(function (response) {
          if (response.status == 201) {
            setLocalToken(response.data.access_token)
            setLocalUsername(username)
            Router.push('/dashboard')
          }
        })
        .catch(function (error) {
          console.log('found an error')
          console.debug(error)
          if (error.response.status == 401) {
            alert('incorrect creds!')
          } else {
            alert('unknown error')
          }
        });
    }
  };

  return (
    <>
      <div style={{ minHeight: 800, marginTop: 30 }}>
        <h1>login page</h1>
        <div style={{ marginTop: 30 }}>
            <div>
              <form>
                <label style={{ marginRight: 10 }}>Input Username</label>
                <input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label style={{ marginRight: 10 }}>Input Password</label>
                <input
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={login}>Login</button>
              </form>
            </div>
        </div>
      </div>
    </>
  );
}
