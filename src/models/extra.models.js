const mongoose = require("mongoose");
const authorSchema = new mongoose.Schema(
    {
      user_id : {type : mongoose.Schema.Types.ObjectId, ref:"user", required : true},
      book_id : {type : mongoose.Schema.Types.ObjectId, ref:"book", required : true}
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  const Author=mongoose.model("author",authorSchema);
  
   bookcommentSchema = new mongoose.Schema(
    {
      book_id : {type : mongoose.Schema.Types.ObjectId, ref:"book", required : true},
      comment_id : {type : mongoose.Schema.Types.ObjectId, ref:"comment", required : true} 
     
     //content: {type: String, required: false}
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  const Bookcomment=mongoose.model("bookcomment",bookcommentSchema);
  module.exports={Author,Bookcomment};