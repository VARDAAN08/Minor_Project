export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { z } from 'zod';
import * as jose from 'jose';

const verifySchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = verifySchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    
    const email = validation.data.email.toLowerCase();
    const otp = validation.data.otp;
    
    const db = await getDb();
    
    // Find the OTP
    const otpRecord = await db.collection('otps').findOne({ email, otp });
    
    if (!otpRecord) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 401 });
    }
    
    // Check expiration (just in case TTL index hasn't run yet)
    if (new Date() > new Date(otpRecord.expiresAt)) {
      await db.collection('otps').deleteOne({ _id: otpRecord._id });
      return NextResponse.json({ error: 'OTP has expired' }, { status: 401 });
    }
    
    // OTP is valid, determine role
    const role = email === '231030271@juitsolan.in' ? 'admin' : 'user';
    
    // Create JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jose.SignJWT({ email, role })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);
      
    // Delete OTP so it cannot be reused
    await db.collection('otps').deleteOne({ _id: otpRecord._id });
    
    // Set cookie
    const response = NextResponse.json({ message: 'Login successful', role });
    
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60, // 24 hours
    });
    
    return response;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
