import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const staffSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isStaffMember: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

staffSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
