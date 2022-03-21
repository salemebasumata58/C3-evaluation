const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    //   lastName: String,
    age: { type: Number, required: true },
    email: { type: String, required: true },
   
    profilePic: [{ type: String, required: false }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);






userSchema.pre("save", function(next){
  const hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
})

userSchema.methods.checkPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}



module.exports = mongoose.model("user", userSchema);

