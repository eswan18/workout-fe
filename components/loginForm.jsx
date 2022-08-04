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
  const login = () => {
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

export function OldLoginForm() {
	// React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault();

    const username = event.currentTarget.elements.username.value
    const password = event.currentTarget.elements.password.value

    const token_data = await authUser(username, password)
		if (token_data === null) {
			setErrorMessages({ name: "uname", message: "terrible" });
    }
    alert(token_data)
    setIsSubmitted(true)
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="username" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
        {renderErrorMessage('abc')}
      </form>
    </div>
  );

  return (
    <div className="login-form">
      {renderForm}
    </div>
  );
}
