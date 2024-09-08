import User from "@/models/user";
import DataBaseConnect from "@/db/dataBaseConnect";
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await DataBaseConnect("users");
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await DataBaseConnect("blogsite");
    const { name, email, password } = await req.json();

    // Check if all required fields are provided
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Create and save the new user
    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();
    return NextResponse.json(savedUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
