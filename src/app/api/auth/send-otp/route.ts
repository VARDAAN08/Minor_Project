export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const requestSchema = z.object({
  email: z.string().email(),
});

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Assuming gmail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = requestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    
    const email = validation.data.email.toLowerCase();
    
    // Check allowed domains
    if (!email.endsWith('@juitsolan.in')) {
      return NextResponse.json({ error: 'Only @juitsolan.in emails are allowed' }, { status: 403 });
    }
    
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    const db = await getDb();
    
    // Delete any existing OTPs for this email to prevent spam
    await db.collection('otps').deleteMany({ email });
    
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes expiration
    
    // Insert OTP into database
    await db.collection('otps').insertOne({
      email,
      otp,
      createdAt: now,
      expiresAt,
    });
    
    // Ensure TTL index exists on 'expiresAt' so it deletes expired OTPs automatically
    await db.collection('otps').createIndex({ "expiresAt": 1 }, { expireAfterSeconds: 0 });
    
    // Send Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'EduNav Authentication OTP',
      text: `Your EduNav login OTP is: ${otp}\n\nThis OTP is valid for 5 minutes. Do not share it with anyone.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #2563eb;">EduNav Authentication</h2>
          <p>Your one-time password (OTP) for login is:</p>
          <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; border-radius: 4px; margin: 20px 0;">
            ${otp}
          </div>
          <p style="color: #6b7280; font-size: 14px;">This OTP is valid for 5 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
