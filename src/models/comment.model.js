const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
    {
     body: {type: String, required: true},
     user_id : {type : mongoose.Schema.Types.ObjectId, ref:"user", required : true}
  
     
     //content: {type: String, required: false}
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  module.exports =  mongoose.model("comment",commentSchema);
  