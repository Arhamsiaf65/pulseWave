import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: String,
    regNo: String,
});

const Students = mongoose.models.Students || mongoose.model('Students', StudentSchema);

export { Students };
