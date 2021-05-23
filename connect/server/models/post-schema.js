const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
let postSchema = new Schema({
  title:{ 
    type : String
  },
  categories:
  {
    type : [String]
  },
  content: {
      type: String
  },
  authorId: {
      type: String
  },
  authorName: {
      type: String
  },
  time: {
    type: Date,
  }
},{

    collection: 'posts',
    // timestamps:true
  })

module.exports = mongoose.model('posts',postSchema)