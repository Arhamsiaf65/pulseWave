"use server";
import fs from "fs/promises";
import mongoose from "mongoose";
import { Students } from "@/models/students";

export const submitAction = async (e) => {
    // Check if the connection is already established to avoid multiple connections
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect("mongodb://localhost:27017/students");
    }   let student = new Students({
        name: e.get("name"),
        regNo: e.get("add")
    });

    try {
        await student.save();
        console.log("Student saved successfully");
    } catch (error) {
        console.error("Error saving student:", error);
    }
};
