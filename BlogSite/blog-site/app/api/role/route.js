import User from "@/models/user";
import DataBaseConnect from "@/db/dataBaseConnect";
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await DataBaseConnect("blogsite");
    const url = new URL(req.url, `http://${req.headers.host}`);
    const role = url.searchParams.get('role');
    console.log(role);
    let users;
    if (role) {
        users = await User.find({ role });  
    } 
    else {
    return NextResponse.json({ message: 'No user with this role exists' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Users found', users }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await DataBaseConnect("blogsite");
    const { email, role } = await req.json();

    if (!email || !role) {
      return NextResponse.json({ error: 'Email and role are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({ error: 'User with this email does not exist' }, { status: 404 });
    }

    await User.updateOne({ email }, { $set: { role: role } });
    const updatedUser = await User.findOne({ email });
    
    return NextResponse.json({ message: 'User role has been updated', user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json({ error: 'Failed to update user role' }, { status: 500 });
  }
}
  