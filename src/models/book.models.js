const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema(
    {
     likes: {type: Number, required: true, default: 0},
     content: {type: String, required: true},
     publication_id : {type : mongoose.Schema.Types.ObjectId, ref:"publication", required : true}
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  module.exports= mongoose.model("book", bookSchema);
  
