import { NextResponse } from "next/server";
import { cookies} from 'next/headers';


const apiUrl = process.env.WORKOUT_API_URL;


class BadCredentialsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BadCredentialsError';
    }
}

class AccessToken {
    constructor(public token: string, public expiration: Date) {}
}

export async function POST(request: Request) {
    'use server';
    const body = await request.json();
    const { email, password } = body;

    let accessToken;
    try {
        accessToken = await loginUser(email, password); 
    } catch (error: any) {
        if (error instanceof BadCredentialsError) {
            return new NextResponse(
                error.message,
                { status: 401, headers: {} },
            )
        } else {
            return new NextResponse(error.message, { status: 400, headers: {} })
        }
    }

    // Redirect back to the home page using an absolute url.
    const host = request.headers.get('host');
    if (!host) {
        return new NextResponse(
            'Missing host in header',
            { status: 400 }
        )
    }
    const baseUrl = `http://${host}`;

    cookies().set({
        name: 'accessToken',
        value: accessToken.token,
        httpOnly: true,
        path: '/',
        expires: accessToken.expiration,
    });
    return NextResponse.redirect(baseUrl, {status: 302});
}

async function loginUser(email: string, password: string): Promise<AccessToken> {
  /* Log in a user and get a token from the server */
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  let formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);
  formData.append('grant_type', 'password');
  
  const response = await fetch(`${apiUrl}/token/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    credentials: 'include',
    body: formData.toString(),
  })
  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 401) {
        throw new BadCredentialsError('Invalid credentials');
    }
    throw new Error(errorData.detail);
  }
  const data = await response.json();
  const token = data.access_token;
  // decode the posix timestamp into a Date object
  const expiration = new Date(Date.parse(data.expiration_time));
  return new AccessToken(token, expiration);
}