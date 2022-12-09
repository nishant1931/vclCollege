import bcryptjs from "bcryptjs";

const students = [
  {
    name: "Ram",
    email: "ram@123gmail.com",
    password: bcryptjs.hashSync("ram123", 10),
  },
  {
    name: "Mohit",
    email: "mohit@123gmail.com",
    password: bcryptjs.hashSync("moht123", 10),
  },
  {
    name: "Yogi",
    email: "yogi@123gmail.com",
    password: bcryptjs.hashSync("yogi123", 10),
  },
];

export default students;
