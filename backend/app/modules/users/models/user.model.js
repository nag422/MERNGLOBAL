const mongoose = require("mongoose");
var crypto = require("crypto");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Username is required"],
    validate: {
      validator: function (email) {
        return String(email)
          .toLocaleLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      },
      message: (props) => `Email (${props.value}) is invalid!`,
    },
  },
  password: {
    type: String,
    required: "please provide password",
  },
  roles: [
    {
      type: String,
      default: "Jobseeker",
    },
  ],

  activeStatus: {
    type: String,
    default: "Active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: "",
  },
});

// signals
// userSchema.pre("save", async function(next) {
//   // Only run this txn if OTP is actually modified

//   if(!this.isModified("otp")) return next();

//   // Hash the OTP with the cost of 12
//   this.otp = await bcrypt.hash(this.otp, 12);

//   next();
// });

userSchema.methods.isValidpassword = async function (
  enteredpassword,
  savedpassword
) {
  return await bcrypt.compare(enteredpassword, savedpassword);
};

module.exports = mongoose.model("User", userSchema);
