import bcryptjs from "bcryptjs";

const staffs = [
  {
    name: "Nishant",
    email: "nishant@123gmail.com",
    password: bcryptjs.hashSync("nishant123", 10),
  },
];

export default staffs;
