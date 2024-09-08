import User from "@/models/user";
import DataBaseConnect from "@/db/dataBaseConnect";
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req) {
  try {
    await DataBaseConnect("blogsite");
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    // Assuming password is stored in plain text, you should hash it in production
    if (password !== user.password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '7d' });

    // Return a success response with the JWT token and user data
    return NextResponse.json({ message: 'Login successful', token, user }, { status: 200 });
  } catch (error) {
    console.error('Error logging in user:', error);
    return NextResponse.json({ error: 'Failed to log in' }, { status: 500 });
  }
}
