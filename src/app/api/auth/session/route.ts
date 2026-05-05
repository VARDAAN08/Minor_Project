export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);
    
    return NextResponse.json({ 
      authenticated: true, 
      user: {
        email: payload.email,
        role: payload.role
      } 
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
