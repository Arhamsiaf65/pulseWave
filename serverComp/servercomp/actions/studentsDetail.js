"use server";
import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: String,
    regNo: String,
});

const Student = mongoose.models.Students || mongoose.model('Students', StudentSchema);

export const studentsDetail = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect("mongodb://localhost:27017/students", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    try {
        let students = await Student.find();
        console.log(students);
        return students;  // Return students to be used in client-side rendering
    } catch (error) {
        console.error("Error fetching students:", error);
    }
};
