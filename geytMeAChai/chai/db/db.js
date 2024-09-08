import mongoose from "mongoose";

import React from 'react'

async function connectDatabase() {
  
    await mongoose.connect("mongodb://localhost:27017/chai");

}

export default connectDatabase
 