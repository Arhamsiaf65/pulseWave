import { NextResponse } from "next/server";


export async function POST(request) {
    let data = await request.json()
    console.log(data);
    return NextResponse.json({
        done: true,
        value: 4, 
        data
    }
    )
}
 
