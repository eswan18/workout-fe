import { NextResponse } from "next/server";

class BadCredentialsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BadCredentialsError';
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;

    let accessToken: string;
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
    const baseUrl = `https://${host}`;
    return NextResponse.redirect(baseUrl, {
        status: 302,
        headers: {
            'Set-Cookie': `accessToken=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict`,
        },
    }); 
}

async function loginUser(email: string, password: string): Promise<string> {
  /* Log in a user and get a token from the server */
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
  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 401) {
        throw new BadCredentialsError('Invalid credentials');
    }
    throw new Error(errorData.detail);
  }
  const data = await response.json();
  const token = data.access_token;
  return token;
}