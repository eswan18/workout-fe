import styles from './loginForm.module.css';
import { useState, useEffect } from 'react';
import { setToken, getToken } from '../lib/auth';
import axios from 'axios';

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
  
  //check to see if the fields are not empty
  const login = (e) => {
    e.preventDefault()
    if ((username == "") & (password == "")) {
      console.log('blah')
      return;
    } else {
      // make api call to our backend. we'll leave this for later
      axios
        .post(AUTH_URL, {
          username: username,
          password: password,
        })
        .then(function (response) {
          console.log(response)
          console.log(response.data.token, "response.data.token");
          if (response.data.token) {
            setToken(response.data.token);
          }
        })
        .catch(function (error) {
          console.log('found an error')
          console.log(error, "error");
          console.debug(error)
          console.debug(error.config)
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
