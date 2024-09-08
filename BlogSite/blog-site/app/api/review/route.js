import Review from "@/models/review";
import DataBaseConnect from "@/db/dataBaseConnect";
import { NextResponse } from 'next/server';


await DataBaseConnect("blogsite");
export async function GET(req) {
  try {
    const reviews = await Review.find({});
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    await DataBaseConnect("blogsite");
    const { reviewer, rating, message } = await req.json();
    if (!reviewer || !rating || !message) {
      return NextResponse.json({ error: 'Reviewer name, rating, and message required' }, { status: 400 });
    }

    let newReview = new Review({reviewer, rating, message})
    await newReview.save(); 

    return NextResponse.json({ message: 'Review saved Successfully'}, { status: 200 });
  } catch (error) {
    console.error('Error Saving review:', error);
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
  }
}
