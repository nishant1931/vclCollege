import dotenv from "dotenv";
import connectDB from "./config/db.js";
import staffs from "./data/staffs.js";
import students from "./data/students.js";
import Staff from "./models/staffModel.js";
import Student from "./models/studentModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Student.deleteMany();
    await Staff.deleteMany();

    await Student.insertMany(students);
    await Staff.insertMany(staffs);

    console.log(`Data Imported!`);
    process.exit();
  } catch (error) {
    console.log(`ERROR DATA FAILED!`, error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Student.deleteMany();
    await Staff.deleteMany();

    console.log(`Data DESTROYED!`);
    process.exit();
  } catch (error) {
    console.log(`ERROR DATA FAILED!`, error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
